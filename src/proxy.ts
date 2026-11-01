import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";

/* Locale routing.
   - /ar/...  → Arabic (served as-is)
   - /en/...  → redirected to the bare path (English is canonical at the root)
   - /...     → English by default, rewritten internally to /en/.... A visitor
                is sent to /ar only when they chose Arabic before (cookie) or,
                on a first visit, when their browser's preferred language is
                Arabic (Accept-Language). Location is never used. */

const PUBLIC_FILE = /\.[^/]+$/;

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/feed.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const first = pathname.split("/")[1];

  // Explicit non-default locale prefix (/ar): serve it. Visiting a URL is not
  // a language choice, so no cookie is written here; only the switch does that.
  if (isLocale(first) && first !== defaultLocale) {
    return NextResponse.next();
  }

  // /en/... → canonical bare path
  if (first === defaultLocale) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Bare path: English unless the browser's own top language is Arabic.
  // A saved "en" choice keeps Arabic-language browsers on English. A saved "ar"
  // choice does NOT redirect: the site's default stays English for everyone else.
  const cookie = req.cookies.get(LOCALE_COOKIE)?.value;
  let locale: Locale = defaultLocale;
  if (cookie !== "en" && prefersArabic(req.headers.get("accept-language"))) {
    locale = "ar";
  }

  if (locale !== defaultLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    url.search = search;
    return NextResponse.redirect(url, 307);
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

/* True when Arabic is the browser's top-ranked language. English anywhere
   above Arabic in the list keeps the site in English. */
function prefersArabic(header: string | null): boolean {
  if (!header) return false;
  const ranked = header
    .split(",")
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { lang: tag.toLowerCase().split("-")[0], q: q ? parseFloat(q.slice(2)) : 1, i };
    })
    .filter((e) => e.lang && !Number.isNaN(e.q) && e.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);
  return ranked[0]?.lang === "ar";
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

