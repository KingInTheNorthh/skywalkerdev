"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["POST", "KERNEL", "DAEMONS", "SOCKETS", "READY"];

export function announcePreloaderDone() {
  (window as unknown as { __archiveRevealed?: boolean }).__archiveRevealed =
    true;
  window.dispatchEvent(new CustomEvent("archive:reveal"));
}

/**
 * Opening sequence: a counter sets the type, then the curtain lifts.
 * Runs once per session; skipped instantly under reduced motion.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const seen = sessionStorage.getItem("archive-preloaded");

    if (reduced || seen) {
      setVisible(false);
      // Defer so scene listeners registered in later effects still hear it.
      requestAnimationFrame(() => announcePreloaderDone());
      return;
    }

    const start = performance.now();
    const duration = 1700;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      setWordIndex(Math.min(Math.floor(t * WORDS.length), WORDS.length - 1));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!done.current) {
        done.current = true;
        sessionStorage.setItem("archive-preloaded", "1");
        setVisible(false);
      }
    };
    raf = requestAnimationFrame(tick);
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        announcePreloaderDone();
      }}
    >
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-99 flex flex-col justify-between bg-ink p-6 text-paper md:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-start justify-between">
            <span className="label text-paper/70">A WORKING ARCHIVE</span>
            <span className="label text-oxide">{WORDS[wordIndex]}</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="label text-paper/50">
              COLD BOOT — MOUNTING /ARCHIVE …
            </span>
            <span className="font-display text-[18vw] leading-[0.85] tabular-nums md:text-[10rem]">
              {String(count).padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
