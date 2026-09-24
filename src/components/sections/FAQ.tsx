"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqs } from "@/lib/content";
import { Stage } from "@/components/ui/Stage";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Stage id="faq" tone="white">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            align="left"
            num="10"
            eyebrow="Before we start"
            title="Questions we get on the first call."
            text="Answered here so the call can be about your project instead."
          />
        </div>
        <ul className="border-t border-line lg:col-span-7">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg font-medium text-ink">{f.q}</span>
                  <span
                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                      isOpen ? "rotate-45 border-blue bg-blue text-white" : "border-line-2 text-ink"
                    }`}
                  >
                    <Plus size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-ink-2">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </Stage>
  );
}
