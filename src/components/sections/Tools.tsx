"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { featuredTools, tools, type Tool } from "@/lib/content";

/* Tools — centred label, headline, paragraph and CTA, with white logo tiles
   floating around the copy on desktop (AgencyAI pattern) and a grid on mobile. */

/* [left %, top %, rotation deg, float duration s] for the 14 desktop tiles */
const spots: [number, number, number, number][] = [
  [4, 6, -12, 6.5], [15, 22, 8, 7.5], [6, 40, 14, 6], [16, 58, -6, 8], [5, 76, -18, 7], [15, 94, 10, 6.8], [26, 94, -9, 7.3],
  [90, 6, 12, 7.2], [79, 22, -9, 6.4], [88, 40, -15, 7.8], [78, 58, 7, 6.2], [89, 76, 16, 7.6], [79, 94, -8, 6.6], [68, 94, 11, 6.9],
];

export function Tools({ num = "03" }: { num?: string }) {
  const featured = featuredTools.map((s) => tools.find((t) => t.slug === s)).filter(Boolean) as Tool[];

  return (
    <section id="tools" className="relative overflow-hidden bg-cloud py-24 lg:py-32">
      {/* Desktop: floating tiles around the copy */}
      <div className="pointer-events-none absolute inset-x-0 top-24 hidden h-[560px] lg:block">
        <div className="container-page relative h-full">
          {featured.map((t, i) => {
            const [left, top, rot, dur] = spots[i];
            return <FloatingTile key={t.slug} tool={t} left={left} top={top} rot={rot} dur={dur} delay={i * 0.35} />;
          })}
        </div>
      </div>

      <div className="container-page relative">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center rounded-lg bg-white px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-blue shadow-[0_3px_3px_rgba(6,16,48,0.08)] ring-1 ring-navy/[0.06]">
            {num ? `${num} · ` : ""}Tools
          </span>
          <h2 className="mt-8 font-display text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.03em] text-navy sm:text-5xl lg:text-[3.5rem]">
            The tools behind
            <br />
            the work.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-ink-2">
            One stack across ERP, web, mobile, AI and 3D: Odoo for the business core, Next.js and
            Flutter for products, Python for models and data, Blender for the films, n8n for the
            automations that tie it together.
          </p>
          <Link href="/contact" className="btn btn-navy mt-10">
            Start a project <ArrowUpRight size={16} />
          </Link>
        </Reveal>

        {/* Mobile / tablet: the featured tiles as a grid */}
        <ul className="mx-auto mt-14 grid max-w-md grid-cols-4 gap-4 sm:max-w-lg sm:grid-cols-7 lg:hidden">
          {featured.map((t) => (
            <li key={t.slug} className="flex justify-center">
              <Tile tool={t} />
            </li>
          ))}
        </ul>

        {/* Full stack as named chips */}
        <Reveal delay={0.1} className="mt-16 lg:mt-[420px]">
          <p className="mono-label text-center text-ink-3">Full stack</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {tools.map((t) => (
              <li
                key={t.slug}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink"
              >
                <Image src={`/tools/${t.slug}.svg`} alt="" width={14} height={14} />
                {t.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Tile({ tool, size = 64 }: { tool: Tool; size?: number }) {
  return (
    <span
      title={tool.name}
      className="inline-flex items-center justify-center rounded-2xl bg-white shadow-[4px_18px_28px_rgba(6,16,48,0.10)] ring-1 ring-navy/[0.04]"
      style={{ width: size, height: size }}
    >
      <Image src={`/tools/${tool.slug}.svg`} alt={tool.name} width={Math.round(size * 0.46)} height={Math.round(size * 0.46)} />
    </span>
  );
}

function FloatingTile({
  tool,
  left,
  top,
  rot,
  dur,
  delay,
}: {
  tool: Tool;
  left: number;
  top: number;
  rot: number;
  dur: number;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="absolute"
      style={{ left: `${left}%`, top: `${top}%`, rotate: rot }}
      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay * 0.25 }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <Tile tool={tool} size={72} />
      </motion.div>
    </motion.div>
  );
}
