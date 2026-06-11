"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Custom cursor: an oxide dot with a lagging ring.
 * The ring swells over interactive targets; [data-cursor="LABEL"]
 * elements grow it into a small ink badge with text.
 * Fine pointers only; never rendered for reduced-motion users.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!fine || reduced || !dot || !ring || !label) return;

    document.documentElement.classList.add("has-custom-cursor");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2, overwrite: "auto" });
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, [data-cursor]"
      );
      const text = target?.dataset.cursor ?? "";
      label.textContent = text;
      if (text) {
        gsap.to(ring, {
          width: 88,
          height: 88,
          backgroundColor: "#1b1813",
          borderColor: "#1b1813",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(label, { opacity: 1, duration: 0.25 });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
      } else if (target) {
        gsap.to(ring, {
          width: 44,
          height: 44,
          backgroundColor: "transparent",
          borderColor: "#b8431a",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(label, { opacity: 0, duration: 0.15 });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
      } else {
        gsap.to(ring, {
          width: 28,
          height: 28,
          backgroundColor: "transparent",
          borderColor: "rgba(27,24,19,0.45)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(label, { opacity: 0, duration: 0.15 });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
      }
    };

    const onLeave = () =>
      gsap.to([dot, ring], { opacity: 0, duration: 0.25, overwrite: "auto" });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="hidden md:block">
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-95 size-1.5 rounded-full bg-oxide"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-95 flex size-7 items-center justify-center rounded-full border border-ink/45"
      >
        <span
          ref={labelRef}
          className="label text-paper opacity-0"
          style={{ letterSpacing: "0.14em" }}
        />
      </div>
    </div>
  );
}
