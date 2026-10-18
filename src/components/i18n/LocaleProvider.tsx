"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getContent, getDict, getNav, localeHref, dirOf, type Locale } from "@/lib/i18n";

type Ctx = {
  locale: Locale;
  dir: "ltr" | "rtl";
  d: ReturnType<typeof getDict>;
  c: ReturnType<typeof getContent>;
  nav: ReturnType<typeof getNav>;
  href: (path: string) => string;
};

const LocaleCtx = createContext<Ctx | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value: Ctx = {
    locale,
    dir: dirOf(locale),
    d: getDict(locale),
    c: getContent(locale),
    nav: getNav(locale),
    href: (p) => localeHref(locale, p),
  };
  return <LocaleCtx.Provider value={value}>{children}</LocaleCtx.Provider>;
}

/* Client components read the locale, dictionary and content from here */
export function useLocale() {
  const ctx = useContext(LocaleCtx);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
