import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Services } from "@/components/sections/Services";
import { OneSystem } from "@/components/sections/OneSystem";
import { Tools } from "@/components/sections/Tools";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { services } from "@/lib/content";
import { Stage } from "@/components/ui/Stage";

export const metadata: Metadata = {
  alternates: { canonical: "https://mfyinnova.tech/services" },
  title: "Services",
  description:
    "Web and SaaS, mobile, AI and data, Odoo ERP, 3D animation, automation and cloud, finance operations and digital growth. Eight disciplines, one accountable team.",
};

const groups = ["Engineering", "Intelligence", "Operations", "Growth"] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Everything it takes to ship, <span className="text-ink-3">under one roof.</span>
          </>
        }
        lead="Engineering, intelligence, operations and growth. Pick one discipline or hand us the whole system; either way you get one team that owns the outcome."
        aside={
          <Link href="/contact" className="btn btn-navy self-start">
            Scope a project <ArrowUpRight size={16} />
          </Link>
        }
      />

      {/* Group index */}
      <Stage id="disciplines" className="!py-6 lg:!py-8">
        <Stagger as="ul" className="grid md:grid-cols-4">
          {groups.map((g, i) => {
            const items = services.filter((s) => s.group === g);
            return (
              <StaggerItem
                as="li"
                key={g}
                className={`py-6 md:px-8 ${i > 0 ? "border-t border-line md:border-l md:border-t-0" : ""} ${i === 0 ? "md:pl-0" : ""}`}
              >
                <p className="eyebrow text-blue">{g}</p>
                <ul className="mt-4 space-y-1.5">
                  {items.map((s) => (
                    <li key={s.slug}>
                      <a href={`#${s.slug}`} className="font-display font-medium text-ink hover:text-blue">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Stage>

      <Services />
      <OneSystem num="" />
      <Tools num="" />
      <Process />
      <FAQ />
    </>
  );
}
