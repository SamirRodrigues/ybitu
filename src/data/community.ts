import type { Bilingual } from '../i18n';

export interface Person {
  name: string;
  role: Bilingual;
  /** Foto: coloque em public/images/pessoas/<arquivo> e informe o caminho aqui. */
  photo?: string;
}

/** Professores que narraram as histórias nas entrevistas públicas. */
export const narrators: Person[] = [
  {
    name: 'Claudiane Soares',
    role: { pt: 'Professora', es: 'Profesora' },
  },
  {
    name: 'Valda Maria Arcanjo da Silva',
    role: { pt: 'Professora e diretora da escola', es: 'Profesora y directora de la escuela' },
  },
  {
    name: 'Luiz Katu',
    role: {
      pt: 'Professor de etno-história e cacique da comunidade',
      es: 'Profesor de etnohistoria y cacique de la comunidad',
    },
  },
];

/** Pessoas e instituições que fizeram parte do projeto. Acrescente novas linhas aqui. */
export const team: Person[] = [
  {
    name: 'Jucinara de Melo Silva',
    role: { pt: 'Autora e pesquisadora', es: 'Autora e investigadora' },
  },
  {
    name: 'Pingo',
    role: { pt: 'Ilustrador', es: 'Ilustrador' },
  },
];
