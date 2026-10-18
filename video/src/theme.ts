/** Cores e fontes do site (src/styles/global.css). */
export const color = {
  papel: '#f1f1ee',
  papelEscuro: '#e4e3de',
  tinta: '#2b2420',
  tintaSuave: '#5a4f48',
  amarelo: '#f2bd30',
  tijolo: '#b8432a',
  laranja: '#f38902',
  azul: '#34509a',
  branco: '#ffffff',
} as const;

export const font = {
  pincel: "'Caveat Brush', 'Segoe Print', cursive",
  texto: "'Nunito Variable', 'Nunito', system-ui, sans-serif",
} as const;

export const FPS = 30;

/** Preço confirmado (src/config.ts) no formato de src/price.ts: "R$ 55,00", também em espanhol. */
export const PRICE = 55;
export const formatPrice = (): string =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(PRICE)
    .replace(/\s/g, ' ');

export const SITE = 'ybituolivro.com.br';
export const shadow = 'drop-shadow(0 18px 28px rgba(74, 40, 20, 0.35))';
