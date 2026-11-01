"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { TechGrid } from "@/components/brand/TechGrid";
import { GridTiles } from "@/components/brand/GridTiles";
import { DotLandmarks } from "@/components/brand/DotLandmarks";
import { useLightbox } from "@/components/ui/VideoLightbox";
import { useLocale } from "@/components/i18n/LocaleProvider";


/* Headline words rise out of a clip. Pure CSS, so the animation starts on first
   paint instead of waiting for JavaScript (keeps the headline fast on phones). */
function Words({ text, accent, delay = 0 }: { text: string; accent?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="clip-reveal">
            <span className="word-rise" style={{ animationDelay: `${delay + i * 0.06}s` }}>
              {w}
            </span>
          </span>{" "}
        </span>
      ))}
      {accent && (
        <span className="clip-reveal">
          <span className="word-rise text-blue" style={{ animationDelay: `${delay + words.length * 0.06}s` }}>
            {accent}
          </span>
        </span>
      )}
    </>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const { open } = useLightbox();
  const { d, c, href } = useLocale();
  const h = d.hero;
  const videos = c.videos;
  const reel = videos.find((v) => v.featured) ?? videos[0];

  return (
    <section className="relative overflow-hidden bg-cloud pt-[var(--nav-offset)]">
      {/* Brand tech grid, anchored top-left and fading out — no frame, no border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px]">
        <TechGrid fade="radial" className="[mask-position:20%_0%]" />
        <GridTiles />
      </div>

      <div className="container-page relative">
        <div className="grid gap-10 pt-6 sm:pt-10 lg:grid-cols-12 lg:pt-12">
          {/* Copy */}
          <div className="lg:col-span-9">
            <p
              className="rise inline-flex items-center rounded-lg bg-white px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-blue ring-1 ring-navy/[0.06]"
              style={{ animationDelay: "0.1s" }}
            >
              {h.pill}
            </p>

            <h1 className="text-display mt-8 max-w-[13ch] text-ink">
              <span className="block">
                <Words text={h.line1} delay={0.2} />
              </span>
              <span className="block">
                <Words text={h.line2} accent={h.accent} delay={0.35} />
              </span>
            </h1>

            {/* Visible from the first paint (only a short rise), so it can be the
                Largest Contentful Paint without waiting for JavaScript */}
            <p className="rise text-lead mt-8 max-w-[50ch]" style={{ animationDelay: "0.3s" }}>
              {h.lead}
            </p>

            <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "0.4s" }}>
              <Link href={href("/contact")} className="btn btn-navy">
                {h.primary} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
              </Link>
              <Link href={href("/work")} className="btn btn-ghost">
                {h.secondary} <ArrowRight size={16} className="rtl:-scale-x-100" />
              </Link>
            </div>
          </div>

          {/* Dot landmarks (Kuwait Towers, Faisal Mosque, Statue of Liberty) with the
              discipline index. Phones and tablets: one row under the buttons, list at
              the start and landmarks at the end. Desktop: landmarks stand over the
              list in the right-hand column. */}
          <motion.aside
            className="relative flex flex-row-reverse items-end justify-between gap-6 lg:col-span-3 lg:flex-col lg:items-stretch lg:justify-end lg:gap-0"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            aria-label={h.disciplinesAria}
          >
            <DotLandmarks caption={h.landmarksCaption} className="w-[132px] shrink-0 sm:w-[172px] lg:mb-6 lg:w-full lg:max-w-[260px] lg:self-end" />
            <ol className="relative space-y-3 pb-2 text-start lg:text-end">
              {h.disciplines.map((item, i) => (
                <li key={item} className="mono-label flex items-center justify-start gap-3 text-ink-2 lg:justify-end">
                  {item}
                  <span className="font-mono text-[11px] text-blue">0{i + 1}</span>
                </li>
              ))}
            </ol>
          </motion.aside>
        </div>

        {/* Reel panel — the first proof: a real MFY 3D production */}
        <div className="rise mt-14 sm:mt-16 lg:mt-20" style={{ animationDelay: "0.5s", ["--rise" as string]: "32px" }}>
          <button
            type="button"
            onClick={() => open({ id: reel.id, title: reel.title, category: reel.category, orientation: "landscape" })}
            className="group relative block w-full overflow-hidden rounded-2xl bg-navy text-start"
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
              <Image
                src={`/work/${reel.id}.jpg`}
                alt=""
                fill
                priority
                sizes="(min-width:1280px) 1180px, 100vw"
                className="object-cover opacity-90 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-navy/10" />
              <TechGrid dark diagonal={false} fade="none" className="opacity-50 mix-blend-screen" />

              <Cross className="left-5 top-5" />
              <Cross className="right-5 top-5" />
              <Cross className="bottom-5 left-5 hidden sm:block" />
              <Cross className="bottom-5 right-5 hidden sm:block" />

              <span className="sr-only">{h.playReel}: </span>
              <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:bg-blue group-hover:text-white sm:h-20 sm:w-20">
                <Play size={22} fill="currentColor" className="ms-1" />
              </span>

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 text-white sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:p-8">
                <div>
                  <p className="eyebrow text-blue-soft">{h.reelLabel}</p>
                  <p className="mt-2 font-display text-lg font-medium sm:text-xl">{reel.title}</p>
                </div>
                <p className="mono-label hidden text-white/60 sm:block">{h.reelNote}</p>
              </div>
            </div>
          </button>
        </div>

        {/* Proof cells */}
        <motion.ul
          className="mt-10 grid divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.25 }}
        >
          {h.proof.map(([v, l], i) => (
            <li
              key={l}
              className={`flex items-baseline gap-3 py-5 ${i === 1 ? "sm:px-8" : i === 2 ? "sm:ps-8" : "sm:pe-8"}`}
            >
              <span className="font-display text-2xl font-semibold text-ink">{v}</span>
              <span className="mono-label text-ink-3">{l}</span>
            </li>
          ))}
        </motion.ul>
      </div>
      <div className="h-8 sm:h-12" />
    </section>
  );
}

function Cross({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`absolute h-3 w-3 ${className}`}>
      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-white/60" />
      <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-white/60" />
    </span>
  );
}
