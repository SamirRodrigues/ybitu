export type Lang = 'pt' | 'es';

/** Texto na tela (docs/video/roteiro.md). Só dados confirmados. */
export const strings = {
  pt: {
    title: 'Ybitu',
    subtitle: 'e o poder de acordar memórias adormecidas',
    credits: [
      { label: 'Texto de', names: ['Jucinara de Melo Silva'] },
      { label: 'Ilustrações de', names: ['Pingo'] },
      { label: 'Narradores', names: ['Claudiane Soares,', 'Valda Maria Arcanjo da Silva', 'e Luiz Katu'] },
    ],
    presaleOpen: 'Pré-venda aberta',
    tagLabel: 'Pré-venda',
    fewUnits: 'Poucas unidades',
    cta: 'Reserve o seu',
  },
  es: {
    title: 'Ybitu',
    subtitle: 'e o poder de acordar memórias adormecidas',
    credits: [
      { label: 'Texto', names: ['Jucinara de Melo Silva'] },
      { label: 'Ilustraciones', names: ['Pingo'] },
      { label: 'Narradores', names: ['Claudiane Soares,', 'Valda Maria Arcanjo da Silva', 'y Luiz Katu'] },
    ],
    presaleOpen: 'Preventa abierta',
    tagLabel: 'Preventa',
    fewUnits: 'Pocas unidades',
    cta: 'Reserva el tuyo',
  },
} as const;
