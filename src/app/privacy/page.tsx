import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" lead="Last updated September 2026." />
      <Prose>
        <p>
          {site.legalName} (&ldquo;MFY&rdquo;, &ldquo;we&rdquo;) operates {site.url}. This policy
          explains what we collect when you use the site and how we use it.
        </p>
        <h2>What we collect</h2>
        <ul>
          <li>
            Information you send us directly, such as your name, email address, company and
            project details when you contact us by email.
          </li>
          <li>
            Basic technical information your browser sends, such as IP address, browser type and
            pages visited, used only to keep the site running and secure.
          </li>
        </ul>
        <h2>How we use it</h2>
        <p>
          To reply to your inquiry, prepare proposals, deliver contracted work and meet legal and
          accounting obligations. We do not sell personal information and we do not use it for
          advertising.
        </p>
        <h2>Third parties</h2>
        <p>
          Video previews on this site are embedded from YouTube in privacy-enhanced mode. YouTube
          may set cookies once you press play. Our contact form opens your own email client; no
          form data is stored on our servers.
        </p>
        <h2>Retention and your rights</h2>
        <p>
          We keep correspondence for as long as needed to serve you and satisfy legal
          requirements. You can ask us to access, correct or delete your personal information at
          any time by writing to {site.email}.
        </p>
      </Prose>
    </>
  );
}
