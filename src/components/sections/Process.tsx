import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { TechGrid } from "@/components/brand/TechGrid";
import { Stage } from "@/components/ui/Stage";
import { process } from "@/lib/content";

export function Process() {
  return (
    <Stage id="process" tone="navy">
      <TechGrid dark fade="radial" />
      <div className="relative">
        <SectionHeader
          dark
          eyebrow="How we work"
          title={
            <>
              Four steps, <span className="text-white/50">written down before we start.</span>
            </>
          }
          text="Scope, architecture and success metrics are written down before code. If the plan changes, the estimate changes with it, in the open."
        />

        <Stagger as="ol" className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {process.map((step) => (
            <StaggerItem
              as="li"
              key={step.num}
              className="group relative flex min-h-[300px] flex-col bg-navy p-7 transition-colors duration-500 hover:bg-navy-2"
            >
              <span className="section-num text-blue-soft">{step.num}</span>
              <h3 className="mt-16 font-display text-2xl font-semibold">{step.title}</h3>
              <p className="mt-4 text-[0.95rem] text-white/65">{step.text}</p>
              <span className="mt-auto block h-px w-8 bg-blue-soft transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Stage>
  );
}
