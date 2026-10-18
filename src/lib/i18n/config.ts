/* ─────────────────────────────────────────────
   Locales. English lives at the root (/about), Arabic under /ar (/ar/about).
   Visitors from Kuwait are sent to Arabic by the proxy; a cookie remembers
   an explicit choice from the language switch.
   ───────────────────────────────────────────── */
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/* ISO country codes that default to Arabic (Vercel sets x-vercel-ip-country) */
export const arabicCountries = ["KW"];

export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(v: string | undefined | null): v is Locale {
  return !!v && (locales as readonly string[]).includes(v);
}

export function dirOf(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/* Prefix an internal path for the locale. English keeps bare paths. */
export function localeHref(locale: Locale, href: string): string {
  if (!href.startsWith("/")) return href; // external, mailto, hash
  if (locale === defaultLocale) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

/* Strip a locale prefix from a pathname → [locale, bare path] */
export function splitLocale(pathname: string): [Locale, string] {
  for (const l of locales) {
    if (l === defaultLocale) continue;
    if (pathname === `/${l}`) return [l, "/"];
    if (pathname.startsWith(`/${l}/`)) return [l, pathname.slice(l.length + 1)];
  }
  return [defaultLocale, pathname];
}

/* hreflang alternates for a bare path */
export function languageAlternates(siteUrl: string, path: string) {
  return {
    en: `${siteUrl}${path === "/" ? "" : path}`,
    ar: `${siteUrl}${localeHref("ar", path)}`,
    "x-default": `${siteUrl}${path === "/" ? "" : path}`,
  };
}
