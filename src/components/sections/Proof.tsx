import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ArchField } from "@/components/brand/ArchField";
import { stats, testimonials } from "@/lib/content";

export function Proof() {
  const t = testimonials[0];
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container-page">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Stats */}
          <Stagger as="ul" className="grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-5">
            {stats.map((s) => (
              <StaggerItem as="li" key={s.label} className="border-t border-line pt-5">
                <p className="font-display text-5xl font-semibold tracking-[-0.03em] text-ink lg:text-6xl">
                  {s.value}
                </p>
                <p className="mono-label mt-3 text-ink-3">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Testimonial */}
          <Reveal className="relative overflow-hidden rounded-2xl bg-cloud p-8 lg:col-span-7 lg:p-12">
            <ArchField
              bars={9}
              height={140}
              color="var(--color-ice)"
              className="absolute -right-6 bottom-0 w-[55%] opacity-90"
            />
            <div className="relative">
              <p className="eyebrow text-blue">Client feedback</p>
              <blockquote className="mt-6 font-display text-2xl font-medium leading-[1.3] tracking-[-0.01em] text-ink lg:text-[1.9rem]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 text-sm">
                <span className="h-px w-8 bg-blue" />
                <span className="text-ink-2">{t.role}</span>
              </figcaption>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
