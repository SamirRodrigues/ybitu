import type { Bilingual } from '../i18n';

export interface ResearchItem {
  id: string;
  status: 'published' | 'soon';
  type: Bilingual;
  title: Bilingual;
  /** Autoria e instituição, na linha abaixo do título. */
  meta?: Bilingual;
  /** Resumo escrito para o site, com as palavras do projeto (não copie o resumo do artigo). */
  summary: Bilingual;
  /** Link para a página oficial onde a obra foi publicada. */
  url?: string;
  /**
   * Imagem do material: coloque o arquivo em public/images/pesquisa/<id>.webp (ou .jpg/.png).
   * Sem arquivo, o site mostra uma capa provisória.
   */
  imageAlt?: Bilingual;
}

/**
 * Para adicionar uma produção, copie um bloco abaixo, troque o `id` e preencha os campos.
 * A ordem aqui é a ordem na página.
 */
export const research: ResearchItem[] = [
  {
    id: 'dissertacao',
    status: 'published',
    type: { pt: 'Dissertação de mestrado', es: 'Tesis de maestría' },
    title: {
      pt: 'R(existência) nas narrativas de professores do povo Potiguara Catu dos Eleotérios: Memórias da Escola Municipal Indígena João Lino da Silva (1970-2024)',
      es: 'R(existência) nas narrativas de professores do povo Potiguara Catu dos Eleotérios: Memórias da Escola Municipal Indígena João Lino da Silva (1970-2024)',
    },
    meta: {
      pt: 'Jucinara de Melo Silva. Programa de Pós-Graduação em Educação, UFRN',
      es: 'Jucinara de Melo Silva. Programa de Posgrado en Educación, UFRN',
    },
    summary: {
      pt: 'Investiga como a Escola Municipal Indígena João Lino da Silva, a primeira escola indígena do Rio Grande do Norte, vive na memória de seus professores, e de que modo essa memória fortalece as lutas e as resistências da comunidade Catu. A pesquisa parte de entrevistas públicas feitas no território e deu origem ao livro.',
      es: 'Investiga cómo la Escuela Municipal Indígena João Lino da Silva, la primera escuela indígena de Río Grande del Norte, vive en la memoria de sus profesores, y de qué modo esa memoria fortalece las luchas y las resistencias de la comunidad Catu. La investigación parte de entrevistas públicas hechas en el territorio y dio origen al libro.',
    },
    url: 'https://repositorio.ufrn.br/items/aa4b9c1e-1c00-41d2-8ac6-4fa6eac07a8a',
    imageAlt: {
      pt: 'Capa da dissertação de mestrado',
      es: 'Portada de la tesis de maestría',
    },
  },
  {
    id: 'novas-publicacoes',
    status: 'soon',
    type: { pt: 'Artigos e outras produções', es: 'Artículos y otras producciones' },
    title: { pt: 'Novas publicações', es: 'Nuevas publicaciones' },
    summary: {
      pt: 'Artigos e outras produções científicas ligados ao projeto serão listados aqui assim que forem publicados.',
      es: 'Los artículos y otras producciones científicas ligados al proyecto se listarán aquí apenas se publiquen.',
    },
  },
];
