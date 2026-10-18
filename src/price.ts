import { site } from './config';
import type { Lang } from './i18n';

/** Preço sempre em reais, no formato brasileiro ("R$ 55,00"), também no site em espanhol. */
export function formatPrice(): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(site.book.price)
    .replace(/\s/g, '\u00a0');
}

export const hasPrice = (): boolean => site.book.status === 'presale' && site.book.price > 0;

export const priceNote = (text: string): string => text.replace('{price}', formatPrice());
export type { Lang };
