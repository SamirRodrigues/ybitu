import { continueRender, delayRender, staticFile } from 'remotion';

/**
 * Fontes do site, copiadas de @fontsource/caveat-brush e @fontsource-variable/nunito
 * para public/fonts. O render espera as fontes carregarem (delayRender).
 */
const faces = [
  { family: 'Caveat Brush', file: 'fonts/caveat-brush-latin-400-normal.woff2', weight: '400' },
  { family: 'Nunito Variable', file: 'fonts/nunito-latin-wght-normal.woff2', weight: '200 1000' },
  {
    family: 'Nunito Variable',
    file: 'fonts/nunito-latin-ext-wght-normal.woff2',
    weight: '200 1000',
    unicodeRange: 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+1E00-1E9F, U+20A0-20C0',
  },
];

let started = false;
export const loadFonts = () => {
  if (started || typeof document === 'undefined') return;
  started = true;
  const handle = delayRender('Carregando fontes');
  Promise.all(
    faces.map(async (f) => {
      const face = new FontFace(f.family, `url(${staticFile(f.file)}) format('woff2')`, {
        weight: f.weight,
        ...(f.unicodeRange ? { unicodeRange: f.unicodeRange } : {}),
      });
      (document.fonts as unknown as { add: (f: FontFace) => void }).add(await face.load());
    }),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
};
