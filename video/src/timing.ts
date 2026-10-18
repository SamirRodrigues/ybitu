import { staticFile } from 'remotion';
import { FPS } from './theme';
import type { Lang } from './i18n';

/** Tempo de cada cena no roteiro (s). Total 34 s. */
export const ROTEIRO = [4, 7, 9, 8, 6];
/** Folga depois da fala (s). A mesma regra está em scripts/make_captions.py. */
export const TAIL = 0.6;

export type Durations = Record<Lang, Record<string, number>>;

/** Cena = max(roteiro, fala + 0,6 s). Sem durations.json, usa o roteiro. */
export const sceneSeconds = (lang: Lang, durations: Durations | null): number[] =>
  ROTEIRO.map((r, i) => {
    const speech = durations?.[lang]?.[`cena${i + 1}`];
    return speech ? Math.max(r, speech + TAIL) : r;
  });

/** Frames de início de cada cena, a partir dos segundos acumulados (sem acumular arredondamento). */
export const sceneFrames = (secs: number[]): { from: number; duration: number }[] => {
  let acc = 0;
  return secs.map((s) => {
    const from = Math.round(acc * FPS);
    acc += s;
    return { from, duration: Math.round(acc * FPS) - from };
  });
};

export const loadDurations = async (): Promise<Durations | null> => {
  try {
    const res = await fetch(staticFile('audio/durations.json'));
    return res.ok ? ((await res.json()) as Durations) : null;
  } catch {
    return null;
  }
};

export type Cue = { startMs: number; endMs: number; text: string };

export const loadCaptions = async (lang: Lang): Promise<Cue[]> => {
  try {
    const res = await fetch(staticFile(`captions/captions.${lang}.json`));
    return res.ok ? ((await res.json()) as Cue[]) : [];
  } catch {
    return [];
  }
};
