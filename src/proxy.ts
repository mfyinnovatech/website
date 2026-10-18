import { NextResponse, type NextRequest } from "next/server";
import { arabicCountries, defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";

/* Locale routing.
   - /ar/...  → Arabic (served as-is)
   - /en/...  → redirected to the bare path (English is canonical at the root)
   - /...     → English, rewritten internally to /en/..., unless the visitor
                should see Arabic: a saved cookie, or a first visit from Kuwait
                (Vercel's x-vercel-ip-country), in which case we redirect to /ar. */

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
  } else {
    const country = (req.headers.get("x-vercel-ip-country") ?? "").toUpperCase();
    if (arabicCountries.includes(country)) locale = "ar";
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

const cookieOpts = { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" as const };

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

