import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { formatDate, getAllPosts } from "@/lib/blog";

export function Insights({ num = "08" }: { num?: string }) {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <section id="insights" className="bg-cloud py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          num={num}
          eyebrow="From the blog"
          title={
            <>
              Written for the people <span className="text-ink-3">who run the systems.</span>
            </>
          }
          text="Practical guides on Odoo, AI in operations and shipping software that holds up."
          action={
            <Link href="/blog" className="link-arrow">
              All posts <ArrowRight size={16} />
            </Link>
          }
        />
        <Stagger as="ul" className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {posts.map((p) => (
            <StaggerItem as="li" key={p.slug} className="bg-white">
              <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col p-7">
                <p className="mono-label text-blue">{p.category}</p>
                <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-blue">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] text-ink-2">{p.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                  <span className="mono-label text-ink-3">
                    {formatDate(p.date)} · {p.readingMinutes} min
                  </span>
                  <ArrowUpRight size={16} className="text-ink-3 transition-colors group-hover:text-blue" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
