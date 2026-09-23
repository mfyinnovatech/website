"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialVideoCard } from "@/components/ui/TestimonialVideoCard";
import { videoTestimonials } from "@/lib/content";

/* Video stories — Navy stage, horizontal snap row of portrait video cards,
   arrow controls and a progress bar. Scales to any number of videos. */
export function VideoStories({ num = "06" }: { num?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 1);
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft < max - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("li");
    const w = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section id="video-stories" className="bg-cloud px-4 pt-24 lg:pt-32">
      <div
        data-surface="dark"
        className="relative mx-auto max-w-[1408px] overflow-hidden rounded-[40px] bg-navy py-16 text-white lg:py-24"
      >
        <div className="px-6 sm:px-10 lg:px-14">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center rounded-lg bg-navy-2 px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-blue-soft">
                {num ? `${num} · ` : ""}Client stories
              </span>
              <h2 className="mt-7 font-display text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl lg:text-[4rem]">
                Clients on camera,
                <br />
                in their own words.
              </h2>
            </div>
            <div className="flex items-end justify-between gap-6 lg:col-span-4 lg:flex-col lg:items-end">
              <p className="max-w-sm text-white/65 lg:text-right">
                Unscripted recordings from the people who run what we built. Tap a card to play.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={!canPrev}
                  aria-label="Previous"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-navy disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  disabled={!canNext}
                  aria-label="Next"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-navy disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <ul
          ref={ref}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:px-10 lg:px-14 [&::-webkit-scrollbar]:hidden"
        >
          {videoTestimonials.map((v, i) => (
            <li key={v.id} className="w-[72vw] shrink-0 snap-start sm:w-[300px] lg:w-[292px]">
              <div className="rounded-[32px] bg-navy-2 p-3">
                <TestimonialVideoCard item={v} index={i} />
              </div>
            </li>
          ))}
        </ul>

        {/* Progress */}
        <div className="mx-6 mt-6 h-px bg-white/15 sm:mx-10 lg:mx-14">
          <div
            className="h-px bg-blue-soft transition-[width] duration-300"
            style={{ width: `${Math.max(12, Math.round(progress * 100))}%` }}
          />
        </div>
      </div>
    </section>
  );
}
