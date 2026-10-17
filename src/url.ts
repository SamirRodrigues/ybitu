/**
 * Endereços internos do site. Em um domínio próprio o site fica na raiz ("/");
 * no GitHub Pages sem domínio próprio ele fica em um subcaminho (ex.: "/ybitu/").
 * O prefixo vem da variável BASE_PATH usada no build (veja astro.config.mjs).
 */
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefixa um caminho que começa com "/" (arquivos de public/) com a base do site. */
export function withBase(path: string): string {
  return /^(https?:)?\/\//.test(path) || !path.startsWith('/') ? path : `${base}${path}`;
}
