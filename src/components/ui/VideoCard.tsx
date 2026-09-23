"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import type { Video } from "@/lib/content";
import { useLightbox } from "./VideoLightbox";

type Props = { video: Video; size?: "lg" | "md"; priority?: boolean };

export function VideoCard({ video, size = "md", priority }: Props) {
  const { open } = useLightbox();
  return (
    <button
      type="button"
      onClick={() => open({ id: video.id, title: video.title, category: video.category, orientation: "landscape" })}
      className="group block w-full text-left"
      aria-label={`Play ${video.title}`}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-navy">
        <Image
          src={`/work/${video.id}.jpg`}
          alt={video.title}
          fill
          priority={priority}
          sizes={size === "lg" ? "(min-width:1024px) 60vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-navy backdrop-blur">
          {video.category}
        </span>
        <span className="absolute bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:bg-blue group-hover:text-white">
          <Play size={18} fill="currentColor" className="ml-0.5" />
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className={`font-display font-semibold text-ink ${size === "lg" ? "text-xl" : "text-base"}`}>
            {video.title}
          </h3>
          <p className="mt-1 text-sm text-ink-3">{video.client}</p>
        </div>
        <span className="mono-label pt-1 text-ink-4">{video.year}</span>
      </div>
    </button>
  );
}
