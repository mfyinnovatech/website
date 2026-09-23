import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Tools } from "@/components/sections/Tools";
import { Work } from "@/components/sections/Work";
import { VideoStories } from "@/components/sections/VideoStories";
import { Quotes } from "@/components/sections/Quotes";
import { Presence } from "@/components/sections/Presence";
import { Team } from "@/components/sections/Team";
import { FAQ } from "@/components/sections/FAQ";
import { Insights } from "@/components/sections/Insights";
import { PartnerStrip } from "@/components/sections/PartnerStrip";
import { OneSystem } from "@/components/sections/OneSystem";
import { faqs } from "@/lib/content";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Hero />
      <PartnerStrip />
      <Services limit={6} />
      <OneSystem num="02" />
      <Tools num="03" />
      <Work />
      <VideoStories num="05" />
      <Quotes num="06" />
      <Presence />
      <Team num="08" />
      <Insights num="09" />
      <FAQ />
    </>
  );
}
