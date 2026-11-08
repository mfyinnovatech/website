"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useLightbox } from "@/components/ui/VideoLightbox";
import { useLocale } from "@/components/i18n/LocaleProvider";

const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/* MFY's 2-minute brand video: thumbnail that opens the lightbox, plus a chapter
   list (from the video's YouTube chapters) that opens it at each moment. The
   chapter text also gives search and answer engines a readable outline. */
export function BrandVideo({ className = "" }: { className?: string }) {
  const { open } = useLightbox();
  const { d, c } = useLocale();
  const v = c.brandVideo;
  const t = d.brandVideo;
  const play = (start = 0) =>
    open({ id: v.id, title: v.title, category: t.eyebrow, orientation: "landscape", start });

  return (
    <div className={`grid gap-8 lg:grid-cols-12 lg:items-center ${className}`}>
      <button
        type="button"
        onClick={() => play()}
        className="group relative block w-full overflow-hidden rounded-2xl bg-navy text-start lg:col-span-7"
      >
        <span className="sr-only">{t.play}: </span>
        <span className="relative block aspect-video">
          <Image
            src={v.thumbnail}
            alt={v.title}
            fill
            sizes="(min-width:1024px) 640px, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
          <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-blue group-hover:text-white sm:h-20 sm:w-20">
            <Play size={22} fill="currentColor" className="ms-1" />
          </span>
          <span className="absolute bottom-4 end-4 rounded-full bg-navy/70 px-3 py-1 font-mono text-[12px] text-white backdrop-blur" dir="ltr">
            {clock(v.seconds)}
          </span>
        </span>
      </button>

      <div className="lg:col-span-5">
        <p className="eyebrow text-blue">{t.eyebrow}</p>
        <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-navy">{t.heading}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{v.description}</p>
        {t.langNote && <p className="mono-label mt-3 text-ink-3">{t.langNote}</p>}
        <p className="mono-label mt-6 text-ink-3">{t.chapters}</p>
        <ol className="mt-3 divide-y divide-line border-y border-line">
          {v.chapters.map((ch) => (
            <li key={ch.t}>
              <button
                type="button"
                onClick={() => play(ch.t)}
                className="flex w-full items-baseline gap-4 py-2.5 text-start text-ink transition-colors hover:text-blue"
              >
                <span className="w-10 shrink-0 font-mono text-[12px] text-blue" dir="ltr">
                  {clock(ch.t)}
                </span>
                <span className="text-[0.95rem]">{ch.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
