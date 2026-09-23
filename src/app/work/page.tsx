import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { VideoStories } from "@/components/sections/VideoStories";
import { Quotes } from "@/components/sections/Quotes";

export const metadata: Metadata = {
  alternates: { canonical: "https://mfyinnova.tech/work" },
  title: "Work",
  description:
    "Photoreal 3D product animations and the software, AI and Odoo ERP engagements behind them. Selected work by MFY Innovatech.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title={
          <>
            Products you can watch. <span className="text-ink-3">Systems you can run.</span>
          </>
        }
        lead="Nine 3D productions released to date, from hyperbaric medical equipment to consumer packaging, alongside representative software and ERP engagements."
      />
      <WorkGallery />
      <VideoStories num="" />
      <Quotes num="" />
    </>
  );
}
