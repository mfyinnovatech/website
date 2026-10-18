import { Stage } from "@/components/ui/Stage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VideoCard } from "@/components/ui/VideoCard";
import { getContent, getDict, type Locale } from "@/lib/i18n";

export function WorkGallery({ locale }: { locale: Locale }) {
  const d = getDict(locale).work.page;
  const { videos } = getContent(locale);
  return (
    <Stage id="gallery">
      <SectionHeader
        eyebrow={d.galleryLabel}
        title={
          <>
            {d.galleryH2a} <span className="text-ink-3">{d.galleryH2b}</span>
          </>
        }
        text={d.galleryText(videos.length)}
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
