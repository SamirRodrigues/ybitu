export const languages = ['pt', 'es'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'pt';

export type RouteKey = 'home' | 'book' | 'research' | 'interviews' | 'community' | 'privacy';

const slugs: Record<Lang, Record<RouteKey, string>> = {
  pt: {
    home: '',
    book: 'o-livro',
    research: 'pesquisa',
    interviews: 'entrevistas',
    community: 'comunidade',
    privacy: 'privacidade',
  },
  es: {
    home: '',
    book: 'el-libro',
    research: 'investigacion',
    interviews: 'entrevistas',
    community: 'comunidad',
    privacy: 'privacidad',
  },
};

export function path(lang: Lang, key: RouteKey, hash = ''): string {
  const base = lang === defaultLang ? '/' : `/${lang}/`;
  const slug = slugs[lang][key];
  return `${base}${slug ? `${slug}/` : ''}${hash}`;
}

export function otherLang(lang: Lang): Lang {
  return lang === 'pt' ? 'es' : 'pt';
}

/** Campo com texto nos dois idiomas. */
export type Bilingual = Record<Lang, string>;

export function pick(value: Bilingual, lang: Lang): string {
  return value[lang];
}
