"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { timeline } from "@/content/site";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Room 05 — provenance. A single inked line is drawn down the
 * page as the reader descends; entries hang off it like
 * catalogue records, alternating sides on desktop.
 */
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 75%"],
  });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section id="timeline" className="bg-paper-2/60 px-5 py-28 md:px-10 md:py-44">
      <SectionHeading number="05" title="Provenance" />

      <div ref={ref} className="relative mx-auto max-w-4xl">
        {/* the drawn line */}
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-0 h-full w-px bg-line md:left-1/2"
        />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: line }}
          className="absolute left-[7px] top-0 h-full w-px origin-top bg-oxide md:left-1/2"
        />

        <ol className="space-y-16 md:space-y-24">
          {timeline.map((entry, i) => {
            const left = i % 2 === 0;
            return (
              <motion.li
                key={entry.year}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid grid-cols-12 gap-4 pl-8 md:pl-0"
              >
                {/* node on the line */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 size-[15px] rounded-full border-2 border-oxide bg-paper md:left-1/2 md:-translate-x-1/2"
                />
                <div
                  className={`col-span-12 md:col-span-5 ${
                    left ? "md:text-right" : "md:col-start-8"
                  }`}
                >
                  <p className="font-display text-hollow text-5xl text-ink md:text-6xl">
                    {entry.year}
                  </p>
                  <h3 className="font-display mt-3 text-xl italic md:text-2xl">
                    {entry.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed text-ink-2 ${
                      left ? "md:ml-auto" : ""
                    } max-w-sm`}
                  >
                    {entry.body}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
