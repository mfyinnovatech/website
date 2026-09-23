"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import type { VideoTestimonial } from "@/lib/content";
import { useLightbox } from "./VideoLightbox";

type Props = { item: VideoTestimonial; index: number; className?: string };

export function TestimonialVideoCard({ item, index, className = "" }: Props) {
  const { open } = useLightbox();
  const label = `Client story ${String(index + 1).padStart(2, "0")}`;
  return (
    <button
      type="button"
      onClick={() =>
        open({ id: item.id, title: `${item.name} — ${item.topic}`, category: label, orientation: "portrait" })
      }
      aria-label={`Play video testimonial: ${item.name}, ${item.topic}`}
      className={`group relative block w-full overflow-hidden rounded-2xl border border-line bg-navy text-left transition-colors duration-300 hover:border-blue focus-visible:border-blue ${className}`}
    >
      <div className="relative aspect-[9/16]">
        <Image
          src={`/testimonials/${item.id}-portrait.jpg`}
          alt=""
          fill
          sizes="(min-width:1024px) 22vw, (min-width:640px) 40vw, 70vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-navy/25" />

        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-navy/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/85 backdrop-blur">
          {label}
        </span>

        <span className="absolute bottom-[7.25rem] left-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy shadow-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:bg-blue group-hover:text-white">
          <Play size={20} fill="currentColor" className="ml-0.5" />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="font-display text-lg font-semibold leading-tight">{item.name}</p>
          <p className="mt-1.5 text-sm text-white/70">
            {item.role}
            {item.company ? ` · ${item.company}` : ""}
          </p>
          <p className="mono-label mt-3 text-blue-soft">{item.topic}</p>
        </div>
      </div>
    </button>
  );
}
