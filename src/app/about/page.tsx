import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Team } from "@/components/sections/Team";
import { Presence } from "@/components/sections/Presence";
import { VideoStories } from "@/components/sections/VideoStories";
import { Quotes } from "@/components/sections/Quotes";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ArchField } from "@/components/brand/ArchField";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  alternates: { canonical: "https://mfyinnova.tech/about" },
  title: "About",
  description:
    "MFY Innovatech is a founder-led software studio: precise, bold and built to be trusted. Web, mobile, AI, Odoo ERP and 3D visualization from one accountable team.",
};

const principles = [
  {
    title: "Precise",
    text: "Technical accuracy in every claim, number and line of code. We say what we measured, not what sounds good.",
  },
  {
    title: "Bold",
    text: "Decisive architecture, confident interfaces, no timid half-measures. If a system should be replaced, we say so.",
  },
  {
    title: "Established",
    text: "Premium restraint. We show, we don't shout. Enterprise-ready processes, documented scope, predictable delivery.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the studio"
        title={
          <>
            Precise, bold and <span className="text-ink-3">built to be trusted.</span>
          </>
        }
        lead="MFYINNOVATECH LLC is a founder-led software studio. Three founders who still design, build and analyse the work themselves, with a team that shares the same standard."
        aside={
          <Link href="/contact" className="btn btn-navy self-start">
            Work with us <ArrowUpRight size={16} />
          </Link>
        }
      />

      {/* Principles */}
      <section className="relative overflow-hidden bg-white py-24 lg:py-32">
        <div className="container-page">
          <SectionHeader
            eyebrow="How we think"
            title="Three words we hold ourselves to."
            text="They come straight from the brand guidelines, and they are the test every deliverable has to pass."
          />
          <Stagger as="ul" className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {principles.map((p) => (
              <StaggerItem as="li" key={p.title} className="bg-white p-8">
                <h3 className="font-display text-3xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-5 text-ink-2">{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Story */}
      <section data-surface="dark" className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
        <ArchField
          bars={18}
          height={220}
          color="rgba(255,255,255,0.06)"
          animate={false}
          className="absolute inset-x-0 bottom-0 w-full"
        />
        <div className="container-page relative grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-blue-soft">The studio</p>
            <h2 className="text-h2 mt-5 text-white">One team, from the first diagram to the accounting close.</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-lg text-white/70 lg:col-span-6 lg:col-start-7">
            <p>
              MFY Innovatech started with a simple observation: most companies do not need five
              vendors, they need one team that understands the whole system. The software, the ERP
              it feeds, the accounting it produces, and the story that sells it.
            </p>
            <p>
              So we built a studio around that. Engineers who ship web, mobile and AI products.
              Odoo specialists who structure the chart of accounts before the first invoice.
              A 3D team that models, lights and animates the product before it exists.
            </p>
            <p>
              We are registered in the United States and work remote-first, with clients in the
              US, Canada, Germany, Greece, Romania, the Gulf, Africa and Australia.
            </p>
          </Reveal>
        </div>
      </section>

      <Presence num="" />
      <Team num="" />
      <VideoStories num="" />
      <Quotes num="" />
    </>
  );
}
