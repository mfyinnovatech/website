import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Stage } from "@/components/ui/Stage";
import { Team } from "@/components/sections/Team";
import { Presence } from "@/components/sections/Presence";
import { VideoStories } from "@/components/sections/VideoStories";
import { Quotes } from "@/components/sections/Quotes";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ArchField } from "@/components/brand/ArchField";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/lib/content";
import { getDict, isLocale, languageAlternates, localeHref, type Locale } from "@/lib/i18n";

type Params = { locale: string };
const path = "/about";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale).about;
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: { canonical: `${site.url}${localeHref(locale, path)}`, languages: languageAlternates(site.url, path) },
  };
}

export default async function AboutPage({ params }: { params: Promise<Params> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale).about;

  return (
    <>
      <PageHeader
        eyebrow={d.eyebrow}
        title={
          <>
            {d.h1a} <span className="text-ink-3">{d.h1b}</span>
          </>
        }
        lead={d.lead}
        aside={
          <Link href={localeHref(locale, "/contact")} className="btn btn-navy">
            {d.cta} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
          </Link>
        }
      />

      {/* Story — Navy stage */}
      <Stage id="story" tone="navy">
        <ArchField bars={18} height={220} color="rgba(255,255,255,0.06)" animate={false} className="absolute inset-x-0 bottom-0 w-full" />
        <div className="relative grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="inline-flex items-center rounded-lg bg-navy-2 px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-blue-soft">
              {d.storyLabel}
            </span>
            <h2 className="mt-7 max-w-[14ch] font-display text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl lg:text-[4rem]">
              {d.storyH2}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-lg text-white/70 lg:col-span-6 lg:col-start-7">
            {d.story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Stage>

      {/* Principles — white stage */}
      <Stage id="principles">
        <SectionHeader eyebrow={d.principlesLabel} title={d.principlesTitle} text={d.principlesText} />
        <Stagger as="ul" className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {d.principles.map((p) => (
            <StaggerItem as="li" key={p.title} className="bg-white p-8">
              <h3 className="font-display text-3xl font-semibold text-ink">{p.title}</h3>
              <p className="mt-5 text-ink-2">{p.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Stage>

      {/* Alternating from here: Navy → white → Navy → white */}
      <Team locale={locale} num="" />
      <Quotes num="" />
      <VideoStories num="" />
      <Presence num="" />
    </>
  );
}
