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
   * PDF para baixar no próprio site: nome do arquivo em public/downloads/.
   * O build falha se o arquivo não existir, para não publicar um link quebrado.
   */
  download?: string;
  /**
   * Referência ABNT (NBR 6023). Use **dois asteriscos** para o negrito do título da obra.
   * A referência fica em português nos dois idiomas, porque é uma convenção brasileira.
   */
  citation?: string;
  /** Cor da capa provisória. */
  tone?: 'tijolo' | 'pedra' | 'amarelo';
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
    type: { pt: 'Dissertação de Mestrado', es: 'Tesis de Maestría' },
    title: {
      pt: 'R(existência) nas narrativas de professores do povo Potiguara Catu dos Eleotérios: Memórias da Escola Municipal Indígena João Lino da Silva (1970-2024)',
      es: 'R(existência) nas narrativas de professores do povo Potiguara Catu dos Eleotérios: Memórias da Escola Municipal Indígena João Lino da Silva (1970-2024)',
    },
    meta: {
      pt: 'Jucinara de Melo Silva. Programa de Pós-Graduação em Educação, UFRN',
      es: 'Jucinara de Melo Silva. Programa de Posgrado en Educación, UFRN',
    },
    summary: {
      pt: 'Investiga como a Escola Municipal Indígena João Lino da Silva, a primeira escola indígena do Rio Grande do Norte, vive na memória de seus professores e como essa memória fortalece as lutas e as resistências da comunidade Catu. A pesquisa parte de entrevistas públicas feitas no território e deu origem ao livro.',
      es: 'Investiga cómo la Escuela Municipal Indígena João Lino da Silva, la primera escuela indígena de Río Grande del Norte, vive en la memoria de sus profesores y cómo esa memoria fortalece las luchas y las resistencias de la comunidad Catu. La investigación parte de entrevistas públicas hechas en el territorio y dio origen al libro.',
    },
    url: 'https://repositorio.ufrn.br/items/aa4b9c1e-1c00-41d2-8ac6-4fa6eac07a8a',
    imageAlt: {
      pt: 'Capa da dissertação de Mestrado',
      es: 'Portada de la tesis de Maestría',
    },
  },
  {
    id: 'capitulo-todo-professor-indigena',
    status: 'published',
    tone: 'pedra',
    type: { pt: 'Capítulo de livro', es: 'Capítulo de libro' },
    title: {
      pt: '“Todo professor indígena é uma liderança”: narrativas de resistência na comunidade Catu dos Eleotérios/RN',
      es: '“Todo professor indígena é uma liderança”: narrativas de resistência na comunidade Catu dos Eleotérios/RN',
    },
    meta: {
      pt: 'Jucinara de Melo Silva, Aliny Dayany Pereira de Medeiros Pranto e José Luiz Soares',
      es: 'Jucinara de Melo Silva, Aliny Dayany Pereira de Medeiros Pranto y José Luiz Soares',
    },
    summary: {
      pt: 'A partir de entrevistas públicas feitas na comunidade, o capítulo mostra como os professores indígenas do Catu atuam também como lideranças: a docência se liga às lutas do território, e a educação escolar indígena no Rio Grande do Norte é construída pelas comunidades e por seus professores.',
      es: 'A partir de entrevistas públicas realizadas en la comunidad, el capítulo muestra cómo los profesores indígenas del Catu actúan también como liderazgos: la docencia se vincula con las luchas del territorio, y la educación escolar indígena en Río Grande del Norte es construida por las comunidades y por sus profesores.',
    },
    download: 'todo-professor-indigena-e-uma-lideranca.pdf',
    citation:
      'SILVA, Jucinara de Melo; PRANTO, Aliny Dayany Pereira de Medeiros; SOARES, José Luiz. “Todo professor indígena é uma liderança”: narrativas de resistência na comunidade Catu dos Eleotérios/RN. In: PRANTO, Aliny Dayany Pereira de Medeiros (org.). **Oralidades, educação e política**: desafios e perspectivas em um contexto de revisionismo histórico. João Pessoa: Ideia, 2026. p. 159-176.',
    imageAlt: { pt: 'Capa do capítulo', es: 'Portada del capítulo' },
  },
  {
    id: 'capitulo-narrativas-docentes',
    status: 'published',
    tone: 'amarelo',
    type: { pt: 'Capítulo de livro', es: 'Capítulo de libro' },
    title: {
      pt: 'Narrativas docentes do povo potiguara do Catu: a retomada de uma língua ancestral',
      es: 'Narrativas docentes do povo potiguara do Catu: a retomada de uma língua ancestral',
    },
    meta: {
      pt: 'Jucinara de Melo Silva, Aliny Dayany de Medeiros Pranto e Claudiane Soares',
      es: 'Jucinara de Melo Silva, Aliny Dayany de Medeiros Pranto y Claudiane Soares',
    },
    summary: {
      pt: 'O capítulo acompanha a retomada da língua tupi no Catu pela trajetória da professora Claudiane Soares, a primeira docente de tupi da comunidade. Discute os desafios de ensinar uma língua que já não era falada e o papel da escola indígena nesse processo.',
      es: 'El capítulo acompaña la recuperación de la lengua tupí en el Catu a través de la trayectoria de la profesora Claudiane Soares, la primera docente de tupí de la comunidad. Discute los desafíos de enseñar una lengua que ya no se hablaba y el papel de la escuela indígena en ese proceso.',
    },
    download: 'narrativas-docentes-do-povo-potiguara-do-catu.pdf',
    citation:
      'SILVA, Jucinara de Melo; PRANTO, Aliny Dayany de Medeiros; SOARES, Claudiane. Narrativas docentes do povo potiguara do Catu: a retomada de uma língua ancestral. In: CHADWICK, Geraldine; MANENTE, Mayra Ileana; BARZOTTO, Valdir Heitor (org.). **Justicia social en memorias culturales, prácticas lingüísticas y ambientales**. Buenos Aires: [s. n.], 2026. p. 42-58.',
    imageAlt: { pt: 'Capa do capítulo', es: 'Portada del capítulo' },
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
