import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="That page isn't in the system."
        lead="The link may be old, or the page may have moved."
        aside={
          <Link href="/" className="link-arrow">
            Back to home <ArrowRight size={16} />
          </Link>
        }
      />
    </>
  );
}
