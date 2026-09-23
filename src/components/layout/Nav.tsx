"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/lib/content";

/* Header: the logo lockup sits on its own at the page's left edge; the floating
   pill in the centre carries the links and the CTA (68px, 8px padding, 100px
   radius, translucent white, 44px backdrop blur, soft inner glow). */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const pathname = usePathname();

  /* Swap the logo to white whenever the surface under it is dark: either an element
     marked data-surface="dark", or any ancestor with a dark computed background. */
  useEffect(() => {
    let raf = 0;
    const isDarkColor = (css: string) => {
      const m = css.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const [r, g, b, a = "1"] = m[1].split(",").map((v) => parseFloat(v));
      if ((a as number) < 0.5) return null; // transparent enough to see through
      const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      return lum < 0.45;
    };
    const check = () => {
      raf = 0;
      const logo = document.getElementById("site-logo");
      if (!logo) return;
      const r = logo.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const header = logo.closest("header");
      const stack = document.elementsFromPoint(cx, cy).filter((el) => !header?.contains(el));
      let dark = false;
      let decided = false;
      for (const el of stack) {
        let node: HTMLElement | null = el as HTMLElement;
        while (node && node !== document.documentElement) {
          if (node.dataset.surface === "dark") {
            dark = true;
            decided = true;
            break;
          }
          const d = isDarkColor(getComputedStyle(node).backgroundColor);
          if (d !== null) {
            // Only large surfaces count; buttons, chips and tiles passing under the logo are ignored
            const b = node.getBoundingClientRect();
            const large = b.width >= window.innerWidth * 0.6 && b.height >= 220;
            if (large || !d) {
              dark = d;
              decided = true;
              break;
            }
          }
          node = node.parentElement;
        }
        if (decided) break;
      }
      setOnDark(dark);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const t = setTimeout(check, 800);
    const iv = setInterval(check, 1500); // layout can shift after images and animations settle
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t);
      clearInterval(iv);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const pillClass =
    "flex items-center rounded-[100px] bg-white/55 shadow-[inset_0_0_36px_0_#ffffff,0_1px_0_0_rgba(6,16,48,0.04)] ring-1 ring-navy/[0.06] backdrop-blur-[44px]";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Small screens: a short fade behind the header so scrolling text dissolves under the logo */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[136px] transition-colors duration-300 lg:hidden"
        style={{
          background: onDark
            ? "linear-gradient(to bottom, rgba(6,16,48,0.96) 0%, rgba(6,16,48,0.85) 45%, rgba(6,16,48,0) 100%)"
            : "linear-gradient(to bottom, rgba(245,247,252,0.97) 0%, rgba(245,247,252,0.88) 45%, rgba(245,247,252,0) 100%)",
        }}
      />
      <div className="page-x relative grid grid-cols-[1fr_auto_1fr] items-center pt-4 sm:pt-6 lg:pt-8">
        {/* Logo — outside the pill */}
        <Link
          id="site-logo"
          href="/"
          aria-label="MFY Innovatech — home"
          className="pointer-events-auto relative block h-[60px] w-[104px] justify-self-start sm:h-[68px] sm:w-[124px] lg:w-[140px]"
        >
          <span
            className="absolute inset-0 flex items-center transition-opacity duration-300"
            style={{ opacity: onDark ? 0 : 1 }}
            aria-hidden={onDark}
          >
            <Logo variant="blue" width={140} priority className="w-full" />
          </span>
          <span
            className="absolute inset-0 flex items-center transition-opacity duration-300"
            style={{ opacity: onDark ? 1 : 0 }}
            aria-hidden={!onDark}
          >
            <Logo variant="white" width={140} className="w-full" />
          </span>
        </Link>

        {/* Centre pill: links + CTA (desktop) */}
        <div className={`pointer-events-auto hidden h-[68px] gap-7 p-2 pl-8 lg:flex ${pillClass}`}>
          <nav aria-label="Primary" className="flex items-center gap-[28px]">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-display text-[15px] font-semibold leading-6 transition-colors duration-150 ${
                  isActive(item.href) ? "text-blue" : "text-navy hover:text-blue"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="inline-flex h-[52px] shrink-0 items-center gap-2 whitespace-nowrap rounded-[100px] bg-navy px-6 font-display text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-blue"
          >
            Start a project <ArrowUpRight size={16} strokeWidth={2.2} />
          </Link>
        </div>

        {/* Right: compact pill with CTA + menu (mobile / tablet) */}
        <div className="relative col-start-3 justify-self-end lg:hidden">
          <div className={`pointer-events-auto h-[60px] gap-1.5 p-1.5 ${pillClass}`}>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-[100px] bg-navy px-5 font-display text-[15px] font-semibold text-white transition-colors hover:bg-blue"
            >
              Start <ArrowUpRight size={16} strokeWidth={2.2} />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy ring-1 ring-navy/10 transition-colors hover:bg-cloud"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto absolute right-0 top-[calc(100%+10px)] w-[calc(100vw-2*var(--page-x))] max-w-sm rounded-[28px] bg-white p-3 shadow-[0_24px_60px_-24px_rgba(6,16,48,0.35)] ring-1 ring-navy/[0.08]"
              >
                <ul className="divide-y divide-line">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between px-4 py-4 font-display text-xl font-semibold ${
                          isActive(item.href) ? "text-blue" : "text-navy"
                        }`}
                      >
                        {item.label}
                        <ArrowUpRight size={18} className="text-ink-3" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 block px-4 pb-2 pt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3"
                >
                  {site.email}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
