import fs from 'node:fs';
import nodePath from 'node:path';
import { withBase } from './url';

/**
 * Capa real do livro: public/images/capa.webp (frente, quadrada, 1000x1000).
 * Opcional: public/images/capa-640.webp, versão menor para celulares.
 * Sem o arquivo, o site mostra uma capa tipográfica provisória.
 */
const dir = nodePath.join(process.cwd(), 'public', 'images');

function find(base: string): string | undefined {
  return ['webp', 'jpg', 'jpeg', 'png', 'avif'].map((ext) => `${base}.${ext}`).find((name) => fs.existsSync(nodePath.join(dir, name)));
}

const full = find('capa');
const small = find('capa-640');

export const cover = full
  ? {
      src: withBase(`/images/${full}`),
      srcset: small ? `${withBase(`/images/${small}`)} 640w, ${withBase(`/images/${full}`)} 1000w` : undefined,
    }
  : undefined;
