// Renderiza as 4 versões em out/ (h264 + aac) e extrai 1 quadro por cena em out/frames/.
// Uso: npm run render   (ou: node scripts/render-all.mjs Promo-pt-9x16)
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';

const ids = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['Promo-pt-9x16', 'Promo-es-9x16', 'Promo-pt-1x1', 'Promo-es-1x1'];
mkdirSync('out/frames', { recursive: true });

const ROTEIRO = [4, 7, 9, 8, 6];
const durations = existsSync('public/audio/durations.json')
  ? JSON.parse(readFileSync('public/audio/durations.json', 'utf8'))
  : null;

for (const id of ids) {
  const out = `out/${id}.mp4`;
  execFileSync('npx', ['remotion', 'render', 'src/index.ts', id, out, '--codec=h264', '--audio-codec=aac', '--crf=20'], {
    stdio: 'inherit',
  });
  // Um quadro perto do fim de cada cena (animações concluídas).
  const lang = id.split('-')[1];
  let acc = 0;
  ROTEIRO.forEach((r, i) => {
    const speech = durations?.[lang]?.[`cena${i + 1}`];
    const secs = speech ? Math.max(r, speech + 0.6) : r;
    const at = acc + secs * (i === 4 ? 0.8 : 0.75);
    acc += secs;
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-ss', at.toFixed(2), '-i', out, '-frames:v', '1',
      `out/frames/${id}-cena${i + 1}.png`]);
  });
}
