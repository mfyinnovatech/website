"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";


export type Playable = {
  id: string; // YouTube id
  title: string;
  category: string;
  orientation?: "landscape" | "portrait";
};

type Ctx = { open: (v: Playable) => void };
const LightboxCtx = createContext<Ctx>({ open: () => {} });

export function useLightbox() {
  return useContext(LightboxCtx);
}

export function VideoLightboxProvider({ children }: { children: ReactNode }) {
  const [video, setVideo] = useState<Playable | null>(null);
  const open = useCallback((v: Playable) => setVideo(v), []);
  const close = useCallback(() => setVideo(null), []);

  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [video, close]);

  return (
    <LightboxCtx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {video && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={video.title}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/92 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            <motion.div
              className={`relative w-full ${video.orientation === "portrait" ? "max-w-[min(92vw,calc((100dvh-160px)*9/16))]" : "max-w-5xl"}`}
              initial={{ scale: 0.96, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.97, y: 8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between text-white">
                <div>
                  <p className="eyebrow text-blue-soft">{video.category}</p>
                  <p className="mt-1 font-display text-lg font-medium">{video.title}</p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close video"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>
              <div className={`w-full overflow-hidden rounded-xl bg-black shadow-2xl ${video.orientation === "portrait" ? "aspect-[9/16]" : "aspect-video"}`}>
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxCtx.Provider>
  );
}
