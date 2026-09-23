import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { MonogramTile } from "@/components/brand/MonogramTile";
import { team, type TeamMember } from "@/lib/content";
import Image from "next/image";

/* Team — dark rounded stage with a spotlight from the top, centred label and
   headline, one large featured card beside stacked compact cards. */
export function Team({ num = "07" }: { num?: string }) {
  const featured = team.find((m) => m.featured) ?? team[0];
  const rest = team.filter((m) => m !== featured);

  return (
    <section id="team" className="bg-cloud px-4 pb-4 pt-24 lg:pt-32">
      <div data-surface="dark" className="relative mx-auto max-w-[1408px] overflow-hidden rounded-[40px] bg-navy px-6 py-20 text-white sm:px-10 lg:px-14 lg:py-[120px]">
        {/* Spotlight */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px]">
          <div className="absolute left-1/2 top-0 h-2 w-[44%] -translate-x-1/2 rounded-b-[24px] bg-white/70 shadow-[0_0_60px_10px_rgba(255,255,255,0.35)]" />
          <div
            className="absolute left-1/2 top-0 h-full w-[92%] -translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0) 100%)",
              clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)",
            }}
          />
        </div>

        {/* Header */}
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-lg bg-navy-2 px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-blue-soft">
            {num ? `${num} · ` : ""}Team
          </span>
          <h2 className="mt-8 font-display text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl lg:text-[4.5rem]">
            The people behind
            <br />
            the precision.
          </h2>
        </Reveal>

        {/* Cards */}
        <Stagger className="relative mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2">
          <StaggerItem>
            <FeaturedCard m={featured} />
          </StaggerItem>
          <div className="grid gap-6">
            {rest.map((m) => (
              <StaggerItem key={m.name}>
                {/* Below lg every member gets the same full card, so the photos match in size */}
                <div className="lg:hidden">
                  <FeaturedCard m={m} />
                </div>
                <div className="hidden h-full lg:block">
                  <CompactCard m={m} />
                </div>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  );
}

function Portrait({ m, size }: { m: TeamMember; size: "lg" | "sm" }) {
  const cls = size === "lg" ? "aspect-square w-full rounded-[20px] lg:max-w-[336px]" : "h-[126px] w-[126px] rounded-[24px]";
  if (m.photo) {
    return (
      <div className={`relative overflow-hidden bg-navy-2 ${cls}`}>
        <Image src={m.photo} alt={m.name} fill sizes={size === "lg" ? "336px" : "126px"} className="object-cover" />
      </div>
    );
  }
  /* Placeholder until portraits arrive: Electric Blue tile with the monogram pattern and initials */
  return (
    <div className={`relative overflow-hidden bg-blue ${cls}`} aria-hidden>
      <MonogramTile ink="white" opacity={0.12} tile={size === "lg" ? 220 : 120} />
      <span
        className={`absolute inset-0 flex items-end p-5 font-display font-light tracking-[-0.04em] text-white ${
          size === "lg" ? "text-6xl" : "text-2xl"
        }`}
      >
        {m.initials}
      </span>
    </div>
  );
}

function Socials({ m, size = "md" }: { m: TeamMember; size?: "md" }) {
  const btn =
    "inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-blue";
  const pending = (href: string) => href === "#";
  return (
    <div className="flex gap-3" data-size={size}>
      <a
        href={m.linkedin}
        target={pending(m.linkedin) ? undefined : "_blank"}
        rel="noreferrer"
        aria-label={`${m.name} on LinkedIn`}
        className={`${btn} ${pending(m.linkedin) ? "opacity-50" : ""}`}
      >
        <LinkedInIcon />
      </a>
      <a
        href={m.instagram}
        target={pending(m.instagram) ? undefined : "_blank"}
        rel="noreferrer"
        aria-label={`${m.name} on Instagram`}
        className={`${btn} ${pending(m.instagram) ? "opacity-50" : ""}`}
      >
        <InstagramIcon />
      </a>
    </div>
  );
}

function FeaturedCard({ m }: { m: TeamMember }) {
  return (
    <article className="flex h-full flex-col rounded-[40px] bg-navy-2 p-8 sm:p-10">
      <Portrait m={m} size="lg" />
      <div className="mt-8 flex flex-1 flex-col justify-between gap-8">
        <div>
          <p className="font-display text-2xl font-semibold text-white">{m.name}</p>
          <p className="mt-1.5 text-lg text-white/60">
            {m.role} · {m.title}
          </p>
          <p className="mt-4 max-w-md text-[0.95rem] text-white/70">{m.bio}</p>
        </div>
        <Socials m={m} />
      </div>
    </article>
  );
}

function CompactCard({ m }: { m: TeamMember }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-[40px] bg-navy-2 p-8 sm:p-10">
      <div className="flex items-start justify-between gap-6">
        <Portrait m={m} size="sm" />
        <Socials m={m} />
      </div>
      <div className="mt-8">
        <p className="font-display text-lg font-semibold text-white">{m.name}</p>
        <p className="mt-1 text-white/60">
          {m.role} · {m.title}. <span className="text-white/45">{m.bio}</span>
        </p>
      </div>
    </article>
  );
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
