import type { ReactNode } from "react";
import { TechGrid } from "@/components/brand/TechGrid";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
};

export function PageHeader({ eyebrow, title, lead, aside }: Props) {
  return (
    <section className="relative overflow-hidden bg-cloud pt-[var(--nav-offset)]">
      <div className="container-page">
        <div className="relative border-x border-line">
          <TechGrid fade="b" />
          <span aria-hidden className="absolute left-0 top-0 h-4 w-4 border-l border-t border-blue" />
          <span aria-hidden className="absolute right-0 top-0 h-4 w-4 border-r border-t border-blue" />
          <div className="relative grid gap-10 px-5 pb-14 pt-16 sm:px-10 sm:pt-24 lg:grid-cols-12 lg:px-14 lg:pb-20">
            <Reveal className="lg:col-span-8">
              <span className="inline-flex items-center rounded-lg bg-white px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-blue ring-1 ring-navy/[0.06]">{eyebrow}</span>
              <h1 className="text-h1 mt-7 max-w-[16ch] text-ink">{title}</h1>
            </Reveal>
            {(lead || aside) && (
              <Reveal delay={0.15} className="flex flex-col justify-end gap-6 lg:col-span-4">
                {lead && <p className="text-lead max-w-[40ch]">{lead}</p>}
                {aside}
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
