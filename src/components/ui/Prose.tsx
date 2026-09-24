import type { ReactNode } from "react";
import { Stage } from "./Stage";

export function Prose({ children }: { children: ReactNode }) {
  return (
    <Stage>
      <div className="mx-auto max-w-3xl space-y-6 text-[1.0625rem] leading-relaxed text-ink-2 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>
    </Stage>
  );
}
