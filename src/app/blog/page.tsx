import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { formatDate, getAllPosts } from "@/lib/blog";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical writing on Odoo ERP, AI in operations, 3D product visualization and shipping software that holds up. From the MFY Innovatech team.",
  alternates: { canonical: `${site.url}/blog`, types: { "application/rss+xml": `${site.url}/feed.xml` } },
  openGraph: { images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "MFY Innovatech blog" }] },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={
          <>
            Notes from the studio. <span className="text-ink-3">Odoo, AI and shipping software.</span>
          </>
        }
        lead="Practical guides for the people who run the systems, written by the team that builds them."
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="container-page">
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid gap-6 rounded-2xl border border-line bg-cloud p-7 transition-colors hover:border-blue lg:grid-cols-12 lg:gap-10 lg:p-10"
            >
              <div className="lg:col-span-8">
                <p className="eyebrow text-blue">{featured.category} · Latest</p>
                <h2 className="text-h2 mt-4 max-w-[24ch] text-ink group-hover:text-blue">{featured.title}</h2>
                <p className="mt-4 max-w-2xl text-lg text-ink-2">{featured.description}</p>
              </div>
              <div className="flex flex-col justify-between gap-6 lg:col-span-4 lg:items-end lg:text-right">
                <p className="mono-label text-ink-3">
                  {formatDate(featured.date)} · {featured.readingMinutes} min read
                </p>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-2 text-ink transition-colors group-hover:border-blue group-hover:bg-blue group-hover:text-white">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          )}

          <Stagger as="ul" className="mt-6 border-t border-line">
            {rest.map((p) => (
              <StaggerItem as="li" key={p.slug} className="border-b border-line">
                <Link
                  href={`/blog/${p.slug}`}
                  className="group grid gap-3 py-7 md:grid-cols-12 md:items-baseline md:gap-8"
                >
                  <p className="mono-label text-ink-3 md:col-span-3">
                    {formatDate(p.date)}
                    <span className="block text-blue">{p.category}</span>
                  </p>
                  <div className="md:col-span-8">
                    <h3 className="font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-blue lg:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-ink-2">{p.description}</p>
                    <p className="mono-label mt-3 text-ink-4">{p.readingMinutes} min read</p>
                  </div>
                  <span className="hidden justify-self-end text-ink-3 transition-colors group-hover:text-blue md:col-span-1 md:block">
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
