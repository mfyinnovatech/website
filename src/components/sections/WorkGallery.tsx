import { Stage } from "@/components/ui/Stage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VideoCard } from "@/components/ui/VideoCard";
import { videos } from "@/lib/content";

export function WorkGallery() {
  return (
    <Stage id="gallery">
      <SectionHeader
        eyebrow="3D product animation"
        title={
          <>
            Every production, <span className="text-ink-3">start to finish.</span>
          </>
        }
        text={`${videos.length} productions released to date. Each one modelled, lit and animated in-house before the product existed.`}
      />
      <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => (
          <li key={v.id}>
            <VideoCard video={v} priority={i < 3} />
          </li>
        ))}
      </ul>
    </Stage>
  );
}
