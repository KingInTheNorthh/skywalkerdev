"use client";

import { useEffect, useState } from "react";
import { sections } from "@/content/site";

/**
 * Gallery-style room marker pinned bottom-left: `02 — CRAFT`.
 * Tracks whichever scene currently owns the viewport.
 */
export default function RoomIndicator() {
  const [active, setActive] = useState<(typeof sections)[number]>(sections[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const match = sections.find((s) => s.id === entry.target.id);
          if (match) setActive(match);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="label pointer-events-none fixed left-3 top-1/2 z-80 hidden -translate-y-1/2 rotate-180 text-paper mix-blend-difference md:block"
      style={{ writingMode: "vertical-rl" }}
    >
      <span>ROOM {active.number}</span>
      <span className="mx-0 my-2 inline-block opacity-50">—</span>
      <span className="uppercase">{active.title}</span>
    </div>
  );
}
