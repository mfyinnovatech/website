import { VideoCard } from "@/components/ui/VideoCard";
import { videos } from "@/lib/content";

export function WorkGallery() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <div className="flex items-baseline justify-between border-b border-line pb-6">
          <h2 className="eyebrow text-blue">3D product animation</h2>
          <span className="mono-label text-ink-3">{videos.length} productions</span>
        </div>
        <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => (
            <li key={v.id}>
              <VideoCard video={v} priority={i < 3} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
