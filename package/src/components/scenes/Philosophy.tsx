"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { philosophy } from "@/content/site";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Room 01 — the manifesto. Each belief is inked in word by word
 * as the reader scrolls through it: scrubbed, reversible, unhurried.
 */
export default function Philosophy() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;

      const lines = gsap.utils.toArray<HTMLElement>("[data-belief]");
      for (const line of lines) {
        const split = new SplitText(line, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.13 },
          {
            opacity: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 78%",
              end: "top 32%",
              scrub: 0.4,
            },
          }
        );
      }
    },
    { scope }
  );

  return (
    <section ref={scope} id="philosophy" className="px-5 py-28 md:px-10 md:py-44">
      <SectionHeading number="01" title="Philosophy" />

      <p className="label mb-20 text-ink-2 md:mb-28">{philosophy.intro}</p>

      <div className="space-y-24 md:space-y-36">
        {philosophy.lines.map((line, i) => (
          <div key={line.note} className="grid grid-cols-12 gap-4">
            <p className="label col-span-12 pt-2 text-oxide md:col-span-2">
              {line.note}
            </p>
            <blockquote
              data-belief
              className={`font-display col-span-12 text-3xl leading-[1.12] md:text-5xl lg:text-6xl ${
                i % 2 === 0
                  ? "md:col-span-9 md:col-start-3"
                  : "md:col-span-9 md:col-start-4"
              }`}
            >
              {line.text}
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}
