"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { identity, sections } from "@/content/site";
import { pauseLenis, scrollToSection } from "@/lib/scroll";

function AccraClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Africa/Accra",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="label tabular-nums" suppressHydrationWarning>
      ACCRA {time ?? "--:--:--"} GMT
    </span>
  );
}

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    pauseLenis(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      pauseLenis(false);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Let the overlay start leaving before the page moves.
    setTimeout(() => scrollToSection(id), 350);
  };

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-85 h-px origin-left bg-oxide"
        style={{ scaleX: progress }}
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-80 mix-blend-difference">
        <div className="flex items-center justify-between px-5 py-5 md:px-10">
          <button
            type="button"
            onClick={() => go("opening")}
            className="label pointer-events-auto text-paper"
          >
            {identity.surname} — {identity.alias}
          </button>
          <div className="flex items-center gap-8 text-paper">
            <span className="hidden md:inline">
              <AccraClock />
            </span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="label pointer-events-auto text-paper"
              aria-haspopup="dialog"
              aria-expanded={open}
            >
              Index +
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site index"
            className="fixed inset-0 z-90 flex flex-col bg-ink text-paper"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-5 md:px-10">
              <span className="label text-paper/60">Index of rooms</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="label"
              >
                Close ×
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-5 md:px-10">
              {sections.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ y: 48, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.18 + i * 0.05,
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-b border-line-paper"
                >
                  <button
                    type="button"
                    onClick={() => go(s.id)}
                    data-cursor="ENTER"
                    className="group flex w-full items-baseline gap-6 py-3 text-left md:py-4"
                  >
                    <span className="label w-8 text-oxide">{s.number}</span>
                    <span className="font-display text-4xl leading-none transition-transform duration-500 ease-[var(--ease-exhibit)] group-hover:translate-x-4 group-hover:italic md:text-6xl">
                      {s.title}
                    </span>
                  </button>
                </motion.div>
              ))}
            </nav>

            <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-6 md:px-10">
              <a href={`mailto:${identity.email}`} className="label link-draw">
                {identity.email}
              </a>
              <span className="label text-paper/60">
                {identity.location} · {identity.coordinates}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
