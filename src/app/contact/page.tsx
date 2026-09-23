import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  alternates: { canonical: "https://mfyinnova.tech/contact" },
  title: "Contact",
  description:
    "Start a project with MFY Innovatech. Email and a short project brief. Replies within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Tell us what you need to ship. <span className="text-ink-3">We&apos;ll reply with questions.</span>
          </>
        }
        lead="Free discovery call, written estimate within 48 hours for most scopes. You only move to paid work once scope and milestones are approved."
      />
      <ContactForm />
      <FAQ />
    </>
  );
}
