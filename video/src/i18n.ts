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
    story: { pill: 'Inédito', line1: 'Uma história potiguar', line2: 'sobre o povo potiguara do Catu' },
    creditsLine: 'Texto de Jucinara de Melo Silva · Ilustrações de Pingo',
    narratorsLine: 'Narradores: Claudiane Soares, Valda Maria Arcanjo da Silva e Luiz Katu',
    presaleOpen: 'Pré-venda aberta',
    tagLabel: 'Pré-venda',
    fewUnits: 'Poucas unidades',
    cta: 'Acorde essa memória',
  },
  es: {
    title: 'Ybitu',
    subtitle: 'e o poder de acordar memórias adormecidas',
    credits: [
      { label: 'Texto', names: ['Jucinara de Melo Silva'] },
      { label: 'Ilustraciones', names: ['Pingo'] },
      { label: 'Narradores', names: ['Claudiane Soares,', 'Valda Maria Arcanjo da Silva', 'y Luiz Katu'] },
    ],
    story: { pill: 'Inédito', line1: 'Una historia potiguar', line2: 'sobre el pueblo potiguara de Catu' },
    creditsLine: 'Texto de Jucinara de Melo Silva · Ilustraciones de Pingo',
    narratorsLine: 'Narradores: Claudiane Soares, Valda Maria Arcanjo da Silva y Luiz Katu',
    presaleOpen: 'Preventa abierta',
    tagLabel: 'Preventa',
    fewUnits: 'Pocas unidades',
    cta: 'Despierta esa memoria',
  },
} as const;
