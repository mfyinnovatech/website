import type { ReactNode } from "react";
import { TechGrid } from "@/components/brand/TechGrid";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
};

/* Inner-page opener. Same anatomy as the home hero: mono pill, big Sora headline,
   lead and action stacked underneath on the left, tech grid fading out top-left. */
export function PageHeader({ eyebrow, title, lead, aside }: Props) {
  return (
    <section className="relative overflow-hidden bg-cloud pt-[var(--nav-offset)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px]">
        <TechGrid fade="radial" className="[mask-position:20%_0%]" />
      </div>
      <div className="container-page relative">
        <div className="pb-4 pt-6 sm:pt-10 lg:pt-12">
          <Reveal>
            <span className="inline-flex items-center rounded-lg bg-white px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-blue ring-1 ring-navy/[0.06]">
              {eyebrow}
            </span>
            <h1 className="text-h1 mt-8 max-w-[15ch] text-ink">{title}</h1>
          </Reveal>
          {(lead || aside) && (
            <Reveal delay={0.15} className="mt-8 flex flex-col gap-8">
              {lead && <p className="text-lead max-w-[52ch]">{lead}</p>}
              {aside && <div className="flex flex-wrap gap-3">{aside}</div>}
            </Reveal>
          )}
        </div>
      </div>
      <div className="h-8 sm:h-12" />
    </section>
  );
}
