/** Configurações do site. Edite aqui o que muda com o tempo. */
export const site = {
  /** Origem do site (sem caminho). Vem de SITE_URL no build; veja astro.config.mjs. */
  url: import.meta.env.SITE.replace(/\/$/, ''),
  name: 'Ybitu e o poder de acordar memórias adormecidas',
  shortName: 'Ybitu',
  author: 'Jucinara de Melo Silva',
  illustrator: 'Pingo',
  authorLattes: 'http://lattes.cnpq.br/9001409872153739',

  /**
   * E-mail para pedidos de acesso, correção ou exclusão de dados (LGPD).
   * Preencha antes de publicar: a página de privacidade só mostra o contato quando houver valor.
   */
  contactEmail: '',

  /** Quando o livro estiver à venda: troque `status` para 'available' e preencha `buyUrl`. */
  book: {
    status: 'soon' as 'soon' | 'available',
    buyUrl: '',
  },

  /** Aplicativo web do Google Apps Script que grava os cadastros (veja docs/google-sheets). */
  leadsEndpoint: (import.meta.env.PUBLIC_LEADS_ENDPOINT as string | undefined) ?? '',
};

if (!site.leadsEndpoint && import.meta.env.PROD) {
  console.warn(
    '[ybitu] PUBLIC_LEADS_ENDPOINT não está definido: o formulário de interessados não vai gravar nada. ' +
      'Veja docs/google-sheets/README.md.',
  );
}
