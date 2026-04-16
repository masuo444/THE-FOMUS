const BASE = 'https://thefomus.com';

export function pageAlternates(locale: string, path: string) {
  return {
    canonical: `${BASE}${locale === 'en' ? '/en' : ''}${path}`,
    languages: {
      ja: `${BASE}${path}`,
      en: `${BASE}/en${path}`,
    },
  };
}
