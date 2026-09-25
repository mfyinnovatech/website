"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/content";
import { Stage } from "@/components/ui/Stage";

/* Written testimonials — one large quote at a time, crossfading to the next
   every few seconds. Arrows and a counter; pauses while hovered. */
export function Quotes({ num = "07" }: { num?: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const t = testimonials[i];

  useEffect(() => {
    if (n < 2 || paused || reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), 7000);
    return () => clearInterval(id);
  }, [n, paused, reduce]);

  return (
    <Stage id="quotes" tone="white">
      <div>
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-lg bg-cloud px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-blue ring-1 ring-navy/[0.06]">
            {num ? `${num} · ` : ""}What clients wrote
          </span>
        </Reveal>

        <div
          className="relative mx-auto mt-10 max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative min-h-[300px] sm:min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                {t.rating && (
                  <div className="mb-6 flex items-center justify-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} size={20} className={k < t.rating! ? "fill-blue text-blue" : "fill-line text-line"} />
                    ))}
                    <span className="ml-2 font-mono text-[12px] tracking-[0.12em] text-ink-3">{t.rating.toFixed(1)} / 5</span>
                  </div>
                )}
                <blockquote className="font-display text-[1.6rem] font-medium leading-[1.3] tracking-[-0.015em] text-navy sm:text-3xl lg:text-[2.4rem] lg:leading-[1.25]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex flex-col items-center gap-1.5">
                  <span className="font-display text-base font-semibold text-navy">{t.name}</span>
                  <span className="text-sm text-ink-3">{t.role}</span>
                  <span className="mt-2 rounded-full bg-cloud px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-blue ring-1 ring-navy/[0.05]">
                    {t.service}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {n > 1 && (
            <div className="mt-10 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => setI((v) => (v - 1 + n) % n)}
                aria-label="Previous testimonial"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-2 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="font-mono text-[12px] tracking-[0.16em] text-ink-3">
                {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => setI((v) => (v + 1) % n)}
                aria-label="Next testimonial"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-2 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </Stage>
  );
}
