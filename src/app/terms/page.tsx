import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Terms of service" };

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of service" lead="Last updated September 2026." />
      <Prose>
        <p>
          These terms govern your use of {site.url}, operated by {site.legalName}. By using the
          site you agree to them.
        </p>
        <h2>Use of the site</h2>
        <p>
          The content on this site is provided for general information about our services. You
          may not copy, redistribute or use our logos, brand assets or portfolio material without
          written permission.
        </p>
        <h2>Portfolio and client work</h2>
        <p>
          3D productions and case studies shown here are the work of MFY Innovatech. Client names
          and confidential details are shared only with permission; representative engagements
          are described in anonymized form.
        </p>
        <h2>Engagements</h2>
        <p>
          Proposals, estimates and project work are governed by a separate written agreement.
          Nothing on this site constitutes an offer or a guarantee of results.
        </p>
        <h2>Liability</h2>
        <p>
          The site is provided as is. To the extent permitted by law, MFY is not liable for any
          loss arising from use of the site or reliance on its content.
        </p>
        <h2>Contact</h2>
        <p>Questions about these terms: {site.email}.</p>
      </Prose>
    </>
  );
}
