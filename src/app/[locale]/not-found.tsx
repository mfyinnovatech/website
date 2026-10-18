"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLocale } from "@/components/i18n/LocaleProvider";

export default function NotFound() {
  const { d, href } = useLocale();
  return (
    <PageHeader
      eyebrow={d.notFound.eyebrow}
      title={d.notFound.title}
      lead={d.notFound.lead}
      aside={
        <Link href={href("/")} className="link-arrow">
          {d.notFound.back} <ArrowRight size={16} className="rtl:-scale-x-100" />
        </Link>
      }
    />
  );
}
