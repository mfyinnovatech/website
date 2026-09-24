import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/content";

/* Closing call to action — sits above the footer on every page. */
export function CtaBand() {
  return (
    <section className="px-4 pt-4">
      <div data-surface="dark" className="relative mx-auto max-w-[1408px] overflow-hidden rounded-[40px] bg-navy text-white">
        <div className="relative grid gap-10 px-8 py-16 sm:px-12 lg:grid-cols-12 lg:px-16 lg:py-24">
          <div className="lg:col-span-7">
            <p className="eyebrow text-blue-soft">Start a project</p>
            <h2 className="mt-5 max-w-[14ch] font-display text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl lg:text-[4rem]">Let&apos;s build something precise.</h2>
          </div>
          <div className="flex flex-col justify-end gap-6 lg:col-span-5">
            <p className="max-w-md text-lg text-white/70">
              Tell us what you need to ship. You&apos;ll hear back within one business day, with
              questions rather than a sales pitch.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-white">
                Start a project <ArrowUpRight size={16} />
              </Link>
              <a href={`mailto:${site.email}`} className="btn btn-ghost-dark">
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
