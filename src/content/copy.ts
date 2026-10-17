import type { Lang } from '../i18n';

/**
 * Textos do site nos dois idiomas. O espanhol segue exatamente a mesma estrutura do português:
 * se faltar uma chave em um dos lados, o TypeScript avisa na hora do build.
 */
const pt = {
  locale: 'pt-BR',
  ogLocale: 'pt_BR',
  a11y: {
    skip: 'Ir para o conteúdo',
    home: 'Ybitu, página inicial',
    menu: 'Menu',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    mainNav: 'Navegação principal',
    footerNav: 'Navegação do rodapé',
    language: 'Idioma',
    switchTo: 'Ler em espanhol',
    opensNewTab: '(abre em nova aba)',
  },
  nav: {
    book: 'O livro',
    research: 'Pesquisa',
    interviews: 'Entrevistas',
    community: 'Comunidade',
    cta: 'Avise-me',
  },
  langName: { pt: 'Português', es: 'Español' },
  status: { soon: 'Em breve', editing: 'Em edição', soonLaunch: 'Lançamento em breve' },
  cover: {
    alt: 'Capa do livro Ybitu e o poder de acordar memórias adormecidas',
    provisionalTitle: 'Ybitu',
    provisionalSubtitle: 'e o poder de acordar memórias adormecidas',
  },
  home: {
    title: 'Ybitu e o poder de acordar memórias adormecidas',
    description:
      'Livro infantil de Jucinara de Melo Silva, ilustrado por Pingo, nascido das histórias de professores potiguara da comunidade Catu (RN). Cadastre-se para saber do lançamento.',
    heroTitleLead: 'Ybitu',
    heroTitleRest: 'e o poder de acordar memórias adormecidas',
    heroIntro:
      'Um livro infantil que nasceu das histórias contadas por professores potiguara da comunidade Catu, no Rio Grande do Norte, sobre a sua língua, a sua escola e o seu povo.',
    by: 'Texto de Jucinara de Melo Silva',
    illustratedBy: 'Ilustrações de Pingo',
    ctaPrimary: 'Avise-me do lançamento',
    ctaSecondary: 'Conhecer o livro',
    ideasTitle: 'Uma história para crianças, feita com quem vive essa história',
    ideas: [
      {
        title: 'Uma língua que volta a ser falada',
        text: 'Aprender tupi é ouvir o que a comunidade guardou por gerações. No livro, essa descoberta começa com uma pergunta de criança.',
      },
      {
        title: 'Memórias que acordam',
        text: 'Lembranças contadas em voz alta pelos mais velhos viram descoberta para quem está começando a ler.',
      },
      {
        title: 'Uma escola que resiste',
        text: 'A Escola Municipal Indígena João Lino da Silva, a primeira escola indígena do Rio Grande do Norte, inspira a história.',
      },
    ],
    audiencesTitle: 'Para ler em casa e para levar à escola',
    families: {
      title: 'Famílias e leitores',
      text: 'Para ler junto, em voz alta, e conversar depois sobre as perguntas que cada criança fez.',
    },
    schools: {
      title: 'Escolas e instituições',
      text: 'Para bibliotecas, salas de aula e projetos que querem aproximar das crianças as vozes indígenas do Nordeste. Cadastre-se como escola ou instituição para saber das formas de compra.',
    },
    projectTitle: 'Conheça o projeto por trás do livro',
    tiles: {
      research: 'Dissertação e artigos que deram origem ao livro.',
      interviews: 'Vídeos e áudios com os professores do Catu.',
      community: 'Quem conta a história: narradores, escola e parceiros.',
    },
  },
  lead: {
    title: 'Avise-me quando o livro chegar',
    intro:
      'Deixe seu contato para saber a data de lançamento e onde comprar. Usamos seus dados só para falar do livro e do projeto.',
    name: 'Nome',
    email: 'E-mail',
    role: 'Você é',
    rolePlaceholder: 'Escolha uma opção',
    roles: {
      reader: 'Leitor(a) ou família',
      teacher: 'Professor(a)',
      institution: 'Escola ou instituição',
      researcher: 'Pesquisador(a)',
      other: 'Outro',
    },
    city: 'Cidade e estado (opcional)',
    consentBefore: 'Concordo em receber avisos sobre o livro e o projeto. Li a',
    consentLink: 'Política de Privacidade',
    consentAfter: '.',
    submit: 'Avise-me',
    sending: 'Enviando…',
    successTitle: 'Pronto, você está na lista.',
    successText: 'Vamos avisar por e-mail quando o livro for lançado.',
    errors: {
      required: 'Preencha este campo.',
      email: 'Digite um e-mail válido, como nome@exemplo.com.',
      role: 'Escolha uma opção.',
      consent: 'Marque a caixa para continuar.',
      network: 'Não foi possível enviar agora. Confira sua conexão e tente de novo.',
      unconfigured: 'O cadastro ainda não está disponível. Tente de novo mais tarde.',
    },
  },
  book: {
    title: 'O livro',
    description:
      'Sobre Ybitu e o poder de acordar memórias adormecidas, a autora Jucinara de Melo Silva e o ilustrador Pingo.',
    aboutTitle: 'Sobre a obra',
    about: [
      'Ybitu e o poder de acordar memórias adormecidas é o primeiro livro infantil de Jucinara de Melo Silva. Ele transforma narrativas orais e memórias compartilhadas por professores potiguara em uma história sensível para crianças.',
      'Pela imaginação, pela oralidade e pelo afeto, o livro convida as crianças a descobrir que a língua, a memória e a identidade são heranças vivas: passam de geração em geração e fortalecem o sentimento de pertencimento.',
    ],
    narratorsLabel: 'Narradores',
    factsTitle: 'Ficha do livro',
    facts: [
      { label: 'Texto', value: 'Jucinara de Melo Silva' },
      { label: 'Ilustrações', value: 'Pingo' },
      { label: 'Gênero', value: 'Livro infantil' },
      { label: 'Origem', value: 'Pesquisa de Mestrado em Educação, PPGED/UFRN' },
      { label: 'Lançamento', value: 'Em breve' },
    ],
    authorTitle: 'A autora',
    authorBio:
      'Jucinara de Melo Silva é historiadora, mestre e doutoranda em Educação pela Universidade Federal do Rio Grande do Norte (UFRN). Pesquisa história oral, história pública e educação, e dedica seus estudos às memórias, às narrativas e à educação escolar indígena como elemento central para fortalecer a identidade do povo Potiguara da comunidade Catu, no Rio Grande do Norte.',
    authorPhotoAlt: 'Retrato de Jucinara de Melo Silva',
    illustratorTitle: 'O ilustrador',
    illustratorBio: 'As ilustrações do livro são de Pingo.',
    buyTitle: 'Onde comprar',
    buySoon: 'O livro ainda não está à venda. Deixe seu contato e avisamos assim que as vendas abrirem.',
    buyNow: 'Comprar o livro',
  },
  research: {
    title: 'Pesquisa',
    description:
      'Produções científicas ligadas ao livro Ybitu: dissertação de Mestrado e publicações, com links para as páginas oficiais.',
    intro:
      'O livro nasceu de uma pesquisa feita junto com a comunidade Catu. Aqui ficam as produções científicas ligadas a ele, com links para as páginas oficiais onde foram publicadas.',
    visit: 'Ver na página oficial',
  },
  interviews: {
    title: 'Entrevistas',
    description:
      'Vídeos e áudios das entrevistas públicas feitas com professores potiguara na comunidade Catu.',
    intro:
      'Conversas públicas gravadas na comunidade Catu, com os professores que guardam a história da escola. As gravações aparecem aqui assim que a edição terminar.',
    video: 'Vídeo',
    audio: 'Áudio',
    transcript: 'Ler a transcrição',
    loadVideo: 'Carregar vídeo',
    loadVideoNote: 'Ao carregar, o YouTube pode registrar sua visita.',
  },
  community: {
    title: 'Comunidade Catu',
    description:
      'A comunidade potiguara do Catu dos Eleotérios, a Escola Municipal Indígena João Lino da Silva, seus narradores e as pessoas que fizeram parte do projeto.',
    intro:
      'O Catu dos Eleotérios fica entre os municípios de Canguaretama e Goianinha, no Rio Grande do Norte. É o território do povo Potiguara que inspira o livro.',
    schoolTitle: 'A escola',
    schoolText:
      'A Escola Municipal Indígena João Lino da Silva é a primeira escola indígena do Rio Grande do Norte. As histórias que deram origem ao livro foram contadas por professores da comunidade.',
    narratorsTitle: 'Os narradores',
    narratorsIntro: 'Professores da comunidade que compartilharam suas memórias em entrevistas públicas.',
    teamTitle: 'Quem fez o livro',
    photoSoon: 'Foto em breve',
  },
  privacy: {
    title: 'Política de Privacidade',
    description: 'Como o site Ybitu coleta, usa e protege os dados de quem se cadastra para saber do lançamento.',
    updated: 'Atualizada em outubro de 2026',
    sections: [
      {
        title: 'Quais dados coletamos',
        body: [
          'Quando você se cadastra para saber do lançamento, pedimos nome, e-mail e o seu perfil (por exemplo, família, professor(a) ou escola). A cidade e o estado são opcionais.',
          'Também guardamos a data e a hora do cadastro e o idioma da página em que ele foi feito.',
        ],
      },
      {
        title: 'Para que usamos',
        body: [
          'Usamos esses dados apenas para avisar sobre o lançamento do livro, as formas de compra e as novidades do projeto. Não vendemos nem compartilhamos sua lista de contatos.',
        ],
      },
      {
        title: 'Base legal e armazenamento',
        body: [
          'A base legal é o seu consentimento (art. 7º, I, da Lei Geral de Proteção de Dados, Lei 13.709/2018), dado ao marcar a caixa do formulário.',
          'Os cadastros ficam em uma planilha do Google Sheets, serviço operado pelo Google, que pode armazenar dados em servidores fora do Brasil. Guardamos os dados até você pedir a exclusão.',
        ],
      },
      {
        title: 'Cookies e rastreamento',
        body: [
          'O site não usa cookies de publicidade nem ferramentas de análise de acesso. Os vídeos só são carregados do YouTube depois que você clica para assistir.',
        ],
      },
      {
        title: 'Seus direitos',
        body: [
          'Você pode pedir a confirmação do tratamento, o acesso, a correção ou a exclusão dos seus dados, e retirar o consentimento a qualquer momento (art. 18 da LGPD).',
        ],
      },
    ],
    contactTitle: 'Como falar com a gente',
    contactWithEmail: 'Para exercer seus direitos, escreva para',
    contactNoEmail: 'Para exercer seus direitos, use o canal de contato indicado no site.',
  },
  footer: {
    rights: 'Todos os direitos reservados.',
    privacy: 'Política de Privacidade',
    madeWith: 'Ilustrações de Pingo. Texto de Jucinara de Melo Silva.',
  },
  notFound: {
    title: 'Página não encontrada',
    text: 'O endereço que você abriu não existe ou mudou de lugar.',
    back: 'Voltar ao início',
  },
};

export type Copy = typeof pt;

const es: Copy = {
  locale: 'es',
  ogLocale: 'es_ES',
  a11y: {
    skip: 'Ir al contenido',
    home: 'Ybitu, página de inicio',
    menu: 'Menú',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    mainNav: 'Navegación principal',
    footerNav: 'Navegación del pie de página',
    language: 'Idioma',
    switchTo: 'Leer en portugués',
    opensNewTab: '(se abre en una pestaña nueva)',
  },
  nav: {
    book: 'El libro',
    research: 'Investigación',
    interviews: 'Entrevistas',
    community: 'Comunidad',
    cta: 'Avísame',
  },
  langName: { pt: 'Português', es: 'Español' },
  status: { soon: 'Próximamente', editing: 'En edición', soonLaunch: 'Lanzamiento próximo' },
  cover: {
    alt: 'Portada del libro Ybitu y el poder de despertar recuerdos dormidos',
    provisionalTitle: 'Ybitu',
    provisionalSubtitle: 'y el poder de despertar recuerdos dormidos',
  },
  home: {
    title: 'Ybitu y el poder de despertar recuerdos dormidos',
    description:
      'Libro infantil de Jucinara de Melo Silva, ilustrado por Pingo, nacido de las historias de profesores potiguara de la comunidad Catu (RN, Brasil). Regístrate para saber del lanzamiento.',
    heroTitleLead: 'Ybitu',
    heroTitleRest: 'y el poder de despertar recuerdos dormidos',
    heroIntro:
      'Un libro infantil que nació de las historias contadas por profesores potiguara de la comunidad Catu, en Río Grande del Norte (Brasil), sobre su lengua, su escuela y su pueblo.',
    by: 'Texto de Jucinara de Melo Silva',
    illustratedBy: 'Ilustraciones de Pingo',
    ctaPrimary: 'Avísame del lanzamiento',
    ctaSecondary: 'Conocer el libro',
    ideasTitle: 'Una historia para niñas y niños, hecha con quienes viven esa historia',
    ideas: [
      {
        title: 'Una lengua que vuelve a hablarse',
        text: 'Aprender tupí es escuchar lo que la comunidad guardó durante generaciones. En el libro, ese descubrimiento empieza con una pregunta de niña.',
      },
      {
        title: 'Recuerdos que despiertan',
        text: 'Memorias contadas en voz alta por los mayores se vuelven descubrimiento para quien empieza a leer.',
      },
      {
        title: 'Una escuela que resiste',
        text: 'La Escuela Municipal Indígena João Lino da Silva, la primera escuela indígena de Río Grande del Norte, inspira la historia.',
      },
    ],
    audiencesTitle: 'Para leer en casa y para llevar a la escuela',
    families: {
      title: 'Familias y lectores',
      text: 'Para leer juntos, en voz alta, y conversar después sobre las preguntas que hizo cada niña o niño.',
    },
    schools: {
      title: 'Escuelas e instituciones',
      text: 'Para bibliotecas, aulas y proyectos que quieren acercar a los niños las voces indígenas del Nordeste de Brasil. Regístrate como escuela o institución para conocer las formas de compra.',
    },
    projectTitle: 'Conoce el proyecto detrás del libro',
    tiles: {
      research: 'Tesis y artículos que dieron origen al libro.',
      interviews: 'Videos y audios con los profesores del Catu.',
      community: 'Quiénes cuentan la historia: narradores, escuela y aliados.',
    },
  },
  lead: {
    title: 'Avísame cuando llegue el libro',
    intro:
      'Deja tu contacto para saber la fecha de lanzamiento y dónde comprar. Usamos tus datos solo para hablarte del libro y del proyecto.',
    name: 'Nombre',
    email: 'Correo electrónico',
    role: 'Eres',
    rolePlaceholder: 'Elige una opción',
    roles: {
      reader: 'Lector(a) o familia',
      teacher: 'Profesor(a)',
      institution: 'Escuela o institución',
      researcher: 'Investigador(a)',
      other: 'Otro',
    },
    city: 'Ciudad y país (opcional)',
    consentBefore: 'Acepto recibir avisos sobre el libro y el proyecto. Leí la',
    consentLink: 'Política de Privacidad',
    consentAfter: '.',
    submit: 'Avísame',
    sending: 'Enviando…',
    successTitle: 'Listo, ya estás en la lista.',
    successText: 'Te avisaremos por correo cuando se lance el libro.',
    errors: {
      required: 'Completa este campo.',
      email: 'Escribe un correo válido, como nombre@ejemplo.com.',
      role: 'Elige una opción.',
      consent: 'Marca la casilla para continuar.',
      network: 'No se pudo enviar ahora. Revisa tu conexión e inténtalo de nuevo.',
      unconfigured: 'El registro todavía no está disponible. Inténtalo de nuevo más tarde.',
    },
  },
  book: {
    title: 'El libro',
    description:
      'Sobre Ybitu y el poder de despertar recuerdos dormidos, la autora Jucinara de Melo Silva y el ilustrador Pingo.',
    aboutTitle: 'Sobre la obra',
    about: [
      'Ybitu y el poder de despertar recuerdos dormidos es el primer libro infantil de Jucinara de Melo Silva. Transforma narraciones orales y memorias compartidas por profesores potiguara en una historia sensible para niñas y niños.',
      'Por medio de la imaginación, la oralidad y el afecto, el libro invita a descubrir que la lengua, la memoria y la identidad son herencias vivas: pasan de generación en generación y fortalecen el sentimiento de pertenencia.',
    ],
    narratorsLabel: 'Narradores',
    factsTitle: 'Ficha del libro',
    facts: [
      { label: 'Texto', value: 'Jucinara de Melo Silva' },
      { label: 'Ilustraciones', value: 'Pingo' },
      { label: 'Género', value: 'Libro infantil' },
      { label: 'Origen', value: 'Investigación de Maestría en Educación, PPGED/UFRN' },
      { label: 'Lanzamiento', value: 'Próximamente' },
    ],
    authorTitle: 'La autora',
    authorBio:
      'Jucinara de Melo Silva es historiadora, magíster y doctoranda en Educación por la Universidad Federal de Río Grande del Norte (UFRN). Investiga historia oral, historia pública y educación, y dedica sus estudios a las memorias, las narraciones y la educación escolar indígena como elemento central para fortalecer la identidad del pueblo Potiguara de la comunidad Catu, en Río Grande del Norte.',
    authorPhotoAlt: 'Retrato de Jucinara de Melo Silva',
    illustratorTitle: 'El ilustrador',
    illustratorBio: 'Las ilustraciones del libro son de Pingo.',
    buyTitle: 'Dónde comprar',
    buySoon: 'El libro todavía no está a la venta. Deja tu contacto y te avisamos apenas se abran las ventas.',
    buyNow: 'Comprar el libro',
  },
  research: {
    title: 'Investigación',
    description:
      'Producciones científicas ligadas al libro Ybitu: tesis de Maestría y publicaciones, con enlaces a las páginas oficiales.',
    intro:
      'El libro nació de una investigación hecha junto con la comunidad Catu. Aquí están las producciones científicas ligadas a él, con enlaces a las páginas oficiales donde fueron publicadas.',
    visit: 'Ver en la página oficial',
  },
  interviews: {
    title: 'Entrevistas',
    description:
      'Videos y audios de las entrevistas públicas hechas a profesores potiguara en la comunidad Catu.',
    intro:
      'Conversaciones públicas grabadas en la comunidad Catu, con los profesores que guardan la historia de la escuela. Las grabaciones aparecerán aquí apenas termine la edición.',
    video: 'Video',
    audio: 'Audio',
    transcript: 'Leer la transcripción',
    loadVideo: 'Cargar video',
    loadVideoNote: 'Al cargarlo, YouTube puede registrar tu visita.',
  },
  community: {
    title: 'Comunidad Catu',
    description:
      'La comunidad potiguara del Catu dos Eleotérios, la Escuela Municipal Indígena João Lino da Silva, sus narradores y las personas que formaron parte del proyecto.',
    intro:
      'El Catu dos Eleotérios queda entre los municipios de Canguaretama y Goianinha, en Río Grande del Norte (Brasil). Es el territorio del pueblo Potiguara que inspira el libro.',
    schoolTitle: 'La escuela',
    schoolText:
      'La Escuela Municipal Indígena João Lino da Silva es la primera escuela indígena de Río Grande del Norte. Las historias que dieron origen al libro fueron contadas por profesores de la comunidad.',
    narratorsTitle: 'Los narradores',
    narratorsIntro: 'Profesores de la comunidad que compartieron sus memorias en entrevistas públicas.',
    teamTitle: 'Quiénes hicieron el libro',
    photoSoon: 'Foto próximamente',
  },
  privacy: {
    title: 'Política de Privacidad',
    description: 'Cómo el sitio Ybitu recoge, usa y protege los datos de quienes se registran para saber del lanzamiento.',
    updated: 'Actualizada en octubre de 2026',
    sections: [
      {
        title: 'Qué datos recogemos',
        body: [
          'Cuando te registras para saber del lanzamiento, pedimos nombre, correo electrónico y tu perfil (por ejemplo, familia, profesor(a) o escuela). La ciudad y el país son opcionales.',
          'También guardamos la fecha y la hora del registro y el idioma de la página en la que se hizo.',
        ],
      },
      {
        title: 'Para qué los usamos',
        body: [
          'Usamos estos datos solo para avisarte del lanzamiento del libro, las formas de compra y las novedades del proyecto. No vendemos ni compartimos tu lista de contactos.',
        ],
      },
      {
        title: 'Base legal y almacenamiento',
        body: [
          'La base legal es tu consentimiento (art. 7, I, de la Ley General de Protección de Datos de Brasil, Ley 13.709/2018), dado al marcar la casilla del formulario.',
          'Los registros se guardan en una hoja de cálculo de Google Sheets, servicio operado por Google, que puede almacenar datos en servidores fuera de Brasil. Conservamos los datos hasta que pidas su eliminación.',
        ],
      },
      {
        title: 'Cookies y rastreo',
        body: [
          'El sitio no usa cookies de publicidad ni herramientas de análisis de visitas. Los videos solo se cargan desde YouTube después de que haces clic para verlos.',
        ],
      },
      {
        title: 'Tus derechos',
        body: [
          'Puedes pedir la confirmación del tratamiento, el acceso, la corrección o la eliminación de tus datos, y retirar tu consentimiento en cualquier momento (art. 18 de la LGPD).',
        ],
      },
    ],
    contactTitle: 'Cómo contactarnos',
    contactWithEmail: 'Para ejercer tus derechos, escribe a',
    contactNoEmail: 'Para ejercer tus derechos, usa el canal de contacto indicado en el sitio.',
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    privacy: 'Política de Privacidad',
    madeWith: 'Ilustraciones de Pingo. Texto de Jucinara de Melo Silva.',
  },
  notFound: {
    title: 'Página no encontrada',
    text: 'La dirección que abriste no existe o cambió de lugar.',
    back: 'Volver al inicio',
  },
};

export const copy: Record<Lang, Copy> = { pt, es };
