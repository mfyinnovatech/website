import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function textOf(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(textOf).join("");
  if (children && typeof children === "object" && "props" in children) {
    return textOf((children as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => {
          const id = slugify(textOf(children));
          return (
            <h2 id={id} className="scroll-mt-28 mt-14 font-display text-2xl font-semibold tracking-[-0.02em] text-ink lg:text-[1.75rem]">
              {children}
            </h2>
          );
        },
        h3: ({ children }) => (
          <h3 className="mt-9 font-display text-xl font-semibold tracking-[-0.01em] text-ink">{children}</h3>
        ),
        p: ({ children }) => <p className="mt-5 text-[1.0625rem] leading-[1.7] text-ink-2">{children}</p>,
        ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-[1.0625rem] leading-[1.7] text-ink-2 marker:text-blue">{children}</ul>,
        ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-[1.0625rem] leading-[1.7] text-ink-2 marker:font-mono marker:text-blue">{children}</ol>,
        li: ({ children }) => <li className="pl-1">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
        a: ({ href = "", children }) => {
          const internal = href.startsWith("/") || href.startsWith("#");
          return internal ? (
            <Link href={href} className="font-semibold text-blue underline decoration-blue/30 underline-offset-4 hover:decoration-blue">
              {children}
            </Link>
          ) : (
            <a href={href} target="_blank" rel="noreferrer" className="font-semibold text-blue underline decoration-blue/30 underline-offset-4 hover:decoration-blue">
              {children}
            </a>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="mt-7 border-l-2 border-blue pl-6 font-display text-xl font-medium leading-snug text-ink [&_p]:mt-0 [&_p]:text-ink [&_p]:text-xl">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-12 border-line" />,
        table: ({ children }) => (
          <div className="mt-7 overflow-x-auto rounded-xl border border-line">
            <table className="w-full border-collapse text-[0.95rem]">{children}</table>
          </div>
        ),
        th: ({ children }) => <th className="border-b border-line bg-cloud px-4 py-3 text-left font-display text-sm font-semibold text-ink">{children}</th>,
        td: ({ children }) => <td className="border-b border-line px-4 py-3 align-top text-ink-2">{children}</td>,
        code: ({ children }) => <code className="rounded bg-cloud px-1.5 py-0.5 font-mono text-[0.9em] text-ink">{children}</code>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
