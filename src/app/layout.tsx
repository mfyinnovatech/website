import type { Metadata, Viewport } from "next";
import { Sora, Source_Sans_3, DM_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { VideoLightboxProvider } from "@/components/ui/VideoLightbox";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const source = Source_Sans_3({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-source",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Odoo Partner, Custom Software, AI & 3D Studio`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Odoo Partner, Custom Software, AI & 3D Studio`,
    description: site.description,
    url: site.url,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "MFY Innovatech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Odoo Partner, Custom Software, AI & 3D Studio`,
    description: site.description,
    images: ["/og-default.png"],
  },
  robots: { index: true, follow: true },
  keywords: [
    "Odoo partner",
    "Odoo implementation",
    "ERP implementation",
    "custom software development",
    "AI development",
    "3D product animation",
    "Flutter app development",
    "MFY Innovatech",
  ],
  alternates: { canonical: site.url },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#org`,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      logo: `${site.url}/brand/logo-blue.png`,
      email: site.email,
      sameAs: [site.linkedin],
      description: site.description,
      knowsAbout: ["Odoo ERP", "Custom software", "AI and data", "3D product animation", "Mobile apps"],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#org` },
      inLanguage: "en",
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#0030E8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${source.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <VideoLightboxProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <CtaBand />
          <Footer />
        </VideoLightboxProvider>
      </body>
    </html>
  );
}
