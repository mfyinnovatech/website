"use client";

import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { useLocale } from "@/components/i18n/LocaleProvider";

/* Compact, illustrative Odoo panel used in the Services stage. */
const bars = [38, 46, 42, 55, 60, 58, 70, 78, 84, 90];

export function OdooPanel() {
  const { d } = useLocale();
  const p = d.odooPanel;
  const apps = p.apps;
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-navy p-6 text-white ring-1 ring-navy/10 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-3">
          <Logo kind="mark" variant="white" width={40} />
          <span aria-hidden className="h-5 w-px bg-white/25" />
          <Image src="/partners/odoo_logo_inverted.svg" alt="Odoo" width={58} height={31} style={{ height: "auto" }} />
        </span>
        <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-blue-soft ring-1 ring-white/10">
          {p.officialPartner}
        </span>
      </div>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">{p.appsWeImplement}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {apps.map((a) => (
          <li key={a} className="rounded-full bg-white/[0.08] px-3 py-1.5 text-[13px] text-white/90 ring-1 ring-white/10">
            {a}
          </li>
        ))}
      </ul>

      <div className="mt-7 rounded-2xl bg-navy-2 p-4 ring-1 ring-white/10">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">{p.monthEnd}</span>
          <span className="font-display text-sm font-semibold text-blue-soft">{p.daysNotWeeks}</span>
        </div>
        <div className="mt-4 flex h-16 items-end gap-1.5">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-t-full ${i < 4 ? "bg-white/20" : "bg-blue-soft"}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
          <span>{p.before}</span>
          <span>{p.goLive}</span>
          <span>{p.after}</span>
        </div>
      </div>
    </div>
  );
}
