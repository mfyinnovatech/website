import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { VideoStories } from "@/components/sections/VideoStories";
import { Quotes } from "@/components/sections/Quotes";

export const metadata: Metadata = {
  alternates: { canonical: "https://mfyinnova.tech/work" },
  title: "Work",
  description:
    "Photoreal 3D product animations for medical equipment, consumer products and packaging. Selected work by MFY Innovatech.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title={
          <>
            Products you can watch <span className="text-ink-3">before they ship.</span>
          </>
        }
        lead="Nine 3D productions released to date, from hyperbaric medical equipment to consumer packaging. Software and ERP engagements are shared on request."
      />
      <WorkGallery />
      <VideoStories num="" />
      <Quotes num="" />
    </>
  );
}
