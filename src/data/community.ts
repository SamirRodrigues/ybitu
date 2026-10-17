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
    photo: '/images/pessoas/claudiane-soares.webp',
    role: {
      pt: 'Professora de Tupi da Escola Municipal Indígena Alfredo Lima - Catu / Goianinha - RN',
      es: 'Profesora de Tupí de la Escuela Municipal Indígena Alfredo Lima - Catu / Goianinha - RN',
    },
  },
  {
    name: 'Valda Maria Arcanjo da Silva',
    photo: '/images/pessoas/valda-arcanjo-da-silva.webp',
    role: {
      pt: 'Professora e Diretora da Escola Municipal Indígena João Lino da Silva - Catu / Canguaretama - RN',
      es: 'Profesora y Directora de la Escuela Municipal Indígena João Lino da Silva - Catu / Canguaretama - RN',
    },
  },
  {
    name: 'Luiz Katu',
    photo: '/images/pessoas/luiz-katu.webp',
    role: {
      pt: 'Professor de etno-história da Escola Municipal Indígena João Lino da Silva - Catu / Canguaretama - RN e Cacique da comunidade Catu',
      es: 'Profesor de etnohistoria de la Escuela Municipal Indígena João Lino da Silva - Catu / Canguaretama - RN y Cacique de la comunidad Catu',
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
