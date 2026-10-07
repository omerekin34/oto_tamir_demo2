export const locales = ["tr", "en"] as const;

export type Locale = (typeof locales)[number];

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function routes(lang: string) {
  return {
    home: `/${lang}`,
    services: `/${lang}/hizmetlerimiz`,
    about: `/${lang}/hakkimizda`,
    blog: `/${lang}/blog`,
    contact: `/${lang}/iletisim`,
    appointment: `/${lang}/randevu`,
    vehicleStatus: `/${lang}/arac-sorgulama`,
  };
}
