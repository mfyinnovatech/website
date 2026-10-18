"use client";

import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { LOCALE_COOKIE, localeHref, splitLocale, type Locale } from "@/lib/i18n";

/* Switches between English and Arabic for the current page. Sets the locale
   cookie so the proxy honours the choice on later visits, then does a full
   navigation (the two locales have separate root layouts). */
export function LanguageSwitch({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const { locale, d } = useLocale();
  const pathname = usePathname() || "/";
  const target: Locale = locale === "ar" ? "en" : "ar";
  const [, bare] = splitLocale(pathname);
  const href = localeHref(target, bare);

  const choose = () => {
    try {
      document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      /* cookies disabled — the link still works for this visit */
    }
  };

  return (
    <a
      href={href}
      onClick={choose}
      lang={target}
      hrefLang={target}
      aria-label={d.nav.switchAria}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap font-display text-[15px] font-semibold transition-colors ${className}`}
    >
      <Globe size={15} strokeWidth={2.2} />
      {compact ? (target === "ar" ? "ع" : "EN") : d.nav.switchTo}
    </a>
  );
}
