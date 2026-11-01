import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Sora, Source_Sans_3, DM_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";
import { site } from "@/lib/content";
import { dirOf, getDict, isLocale, languageAlternates, locales, type Locale } from "@/lib/i18n";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationGraph } from "@/lib/seo";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { VideoLightboxProvider } from "@/components/ui/VideoLightbox";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const source = Source_Sans_3({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-source", display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono", display: "swap" });
/* Arabic: IBM Plex Sans Arabic carries both display and body roles */
const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-arabic", display: "swap", preload: false });

type Params = { locale: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale);
  const home = locale === "en" ? site.url : `${site.url}/${locale}`;
  return {
    metadataBase: new URL(site.url),
    title: { default: d.meta.title, template: `%s · ${site.name}` },
    description: d.meta.description,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: d.meta.title,
      description: d.meta.description,
      url: home,
      locale: locale === "ar" ? "ar_KW" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_KW"],
      images: [{ url: "/og-default.png", width: 1200, height: 630, alt: d.meta.ogAlt }],
    },
    twitter: { card: "summary_large_image", title: d.meta.title, description: d.meta.description, images: ["/og-default.png"] },
    robots: { index: true, follow: true },
    keywords:
      locale === "ar"
        ? ["شريك Odoo", "تنفيذ Odoo", "تطبيق ERP", "تطوير برمجيات مخصصة", "الذكاء الاصطناعي", "رسوم ثلاثية الأبعاد للمنتجات", "تطوير تطبيقات Flutter", "Odoo الكويت", "MFY Innovatech"]
        : ["Odoo partner", "Odoo implementation", "ERP implementation", "custom software development", "AI development", "3D product animation", "Flutter app development", "MFY Innovatech"],
    alternates: { canonical: home, languages: languageAlternates(site.url, "/") },
    /* Chrome's "Translate this page?" bar produces a machine-translated copy of the
       Arabic pages. We have a real English site, so point people to the switch instead. */
    ...(locale === "ar" ? { other: { google: "notranslate" } } : {}),
  };
}

export const viewport: Viewport = { themeColor: "#0030E8", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<Params> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dir = dirOf(locale);

  return (
    <html lang={locale} dir={dir} className={`${sora.variable} ${source.variable} ${mono.variable} ${arabic.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={{ "@context": "https://schema.org", "@graph": organizationGraph(locale) }} />
        <LocaleProvider locale={locale}>
          <VideoLightboxProvider>
            <Nav />
            <main className="flex-1">{children}</main>
            <CtaBand locale={locale} />
            <Footer locale={locale} />
          </VideoLightboxProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
