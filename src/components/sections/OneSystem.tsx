"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BarChart3, Boxes, Factory, Landmark, ShoppingCart, Users } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Logo } from "@/components/ui/Logo";
import { useLocale } from "@/components/i18n/LocaleProvider";

/* One system — hub-and-spoke: six operating areas connected to a single
   MFY × Odoo database at the centre (AgencyAI "all features in one" pattern). */

const leftIcons = [ShoppingCart, Boxes, Landmark];
const rightIcons = [Factory, Users, BarChart3];

export function OneSystem({ num = "03" }: { num?: string }) {
  const { d, href } = useLocale();
  const o = d.oneSystem;
  const left = o.left.map((c, i) => ({ ...c, icon: leftIcons[i] }));
  const right = o.right.map((c, i) => ({ ...c, icon: rightIcons[i] }));
  return (
    <section id="one-system" className="px-4 pt-4">
      <div className="mx-auto max-w-[1408px] rounded-[40px] bg-white px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-lg bg-cloud px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-blue ring-1 ring-navy/[0.06]">
            {num ? `${num} · ` : ""}{o.label}
          </span>
          <h2 className="mt-8 font-display text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.03em] text-navy sm:text-5xl lg:text-[4rem]">
            {o.h2}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-2">
            {o.lead}
          </p>
        </Reveal>

        {/* Diagram */}
        <div className="relative mt-14 lg:mt-20">
          {/* Mobile hub */}
          <div className="mb-6 flex justify-center lg:hidden">
            <Hub />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_260px_1fr] lg:gap-8">
            <div className="grid gap-6">
              {left.map((c, i) => (
                <Card key={c.title} {...c} index={i} />
              ))}
            </div>

            {/* Desktop hub + connectors */}
            <div className="relative hidden lg:block">
              <Connectors />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Hub />
              </div>
            </div>

            <div className="grid gap-6">
              {right.map((c, i) => (
                <Card key={c.title} {...c} index={i + 3} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <p className="text-ink-2">{o.footer}</p>
          <Link href={href("/services#erp-odoo")} className="link-arrow">
            {o.link} <ArrowRight size={16} className="rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Hub() {
  const { d } = useLocale();
  return (
    <div className="flex h-[160px] w-[220px] flex-col items-center justify-center gap-3 rounded-[32px] bg-blue text-white shadow-[0_30px_60px_-24px_rgba(0,48,232,0.55)]">
      <span className="flex items-center gap-3">
        <Logo kind="mark" variant="white" width={52} />
        <span aria-hidden className="h-6 w-px bg-white/30" />
        <Image src="/partners/odoo_logo_inverted.svg" alt="Odoo" width={64} height={34} style={{ height: "auto" }} />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/80">{d.oneSystem.hub}</span>
    </div>
  );
}

function Card({ icon: Icon, title, text, index }: { icon: typeof Users; title: string; text: string; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      className="rounded-[32px] bg-cloud p-8 ring-1 ring-navy/[0.04]"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white shadow-[0_10px_24px_-12px_rgba(6,16,48,0.6)]">
        <Icon size={22} strokeWidth={2} />
      </span>
      <h3 className="mt-7 font-display text-2xl font-semibold text-navy">{title}</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{text}</p>
    </motion.article>
  );
}

/* Connectors: a faint base line per branch, drawn on view, plus a bright pulse
   that flows along each branch toward the hub (loops while in view). */
function Connectors() {
  const reduce = useReducedMotion();
  // Paths run from the card edge toward the hub so the pulse flows inward.
  const branches = [
    "M0 167 H40 V500 H80", // left top → hub
    "M0 500 H80", // left middle → hub
    "M0 833 H40 V500 H80", // left bottom → hub
    "M260 167 H220 V500 H180", // right top → hub
    "M260 500 H180",
    "M260 833 H220 V500 H180",
  ];
  return (
    <svg
      aria-hidden
      viewBox="0 0 260 1000"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      fill="none"
      strokeWidth="1.5"
    >
      {branches.map((d, i) => (
        <motion.path
          key={`base-${i}`}
          d={d}
          stroke="var(--color-blue)"
          strokeOpacity="0.28"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 + i * 0.1 }}
        />
      ))}
      {!reduce &&
        branches.map((d, i) => (
          <path
            key={`pulse-${i}`}
            d={d}
            pathLength={1}
            stroke="var(--color-blue)"
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="connector-pulse"
          />
        ))}
    </svg>
  );
}
