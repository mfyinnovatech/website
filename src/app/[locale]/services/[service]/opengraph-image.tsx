import { isLocale } from "@/lib/i18n";
import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { getServicePage, slugForPath } from "@/lib/service-pages";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "MFY Innovatech service";

export default async function Image({ params }: { params: Promise<{ locale: string; service: string }> }) {
  const { locale: raw, service } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const slug = slugForPath(service);
  const page = slug ? getServicePage(locale, slug) : undefined;
  return ogCard({ eyebrow: "Services", title: page?.h1 ?? "MFY Innovatech", locale });
}
