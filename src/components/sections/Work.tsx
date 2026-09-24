import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { VideoCard } from "@/components/ui/VideoCard";
import { videos } from "@/lib/content";
import { Stage } from "@/components/ui/Stage";

export function Work() {
  const featured = videos.filter((v) => v.featured).slice(0, 3);
  return (
    <Stage id="work" tone="white">
      <div>
        <SectionHeader
          num="04"
          eyebrow="Selected work"
          title={
            <>
              Products you can watch <span className="text-ink-3">before they ship.</span>
            </>
          }
          text="Photoreal 3D productions for launches, investor decks and e-commerce, modeled, lit and animated in-house."
          action={
            <Link href="/work" className="link-arrow">
              View all work <ArrowRight size={16} />
            </Link>
          }
        />

        {/* 3D films */}
        <Stagger className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:items-start">
          {featured.map((v, i) => (
            <StaggerItem
              key={v.id}
              className={i === 0 ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
            >
              <VideoCard video={v} size={i === 0 ? "lg" : "md"} />
            </StaggerItem>
          ))}
        </Stagger>

      </div>
    </Stage>
  );
}

export { Reveal };
