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

  // Explicit non-default locale prefix (/ar): serve it, remember it
  if (isLocale(first) && first !== defaultLocale) {
    const res = NextResponse.next();
    if (req.cookies.get(LOCALE_COOKIE)?.value !== first) res.cookies.set(LOCALE_COOKIE, first, cookieOpts);
    return res;
  }

  // /en/... → canonical bare path
  if (first === defaultLocale) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    const res = NextResponse.redirect(url, 308);
    res.cookies.set(LOCALE_COOKIE, defaultLocale, cookieOpts);
    return res;
  }

  // Bare path: decide between English (rewrite) and Arabic (redirect)
  const cookie = req.cookies.get(LOCALE_COOKIE)?.value;
  let locale: Locale = defaultLocale;
  if (isLocale(cookie)) {
    locale = cookie;
  } else if (prefersArabic(req.headers.get("accept-language"))) {
    locale = "ar";
  }

  if (locale !== defaultLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    url.search = search;
    const res = NextResponse.redirect(url, 307);
    res.cookies.set(LOCALE_COOKIE, locale, cookieOpts);
    return res;
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

const cookieOpts = { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" as const };

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

