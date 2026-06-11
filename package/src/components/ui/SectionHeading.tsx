"use client";

import { motion } from "framer-motion";

/**
 * Archival room heading: `01 / PHILOSOPHY` over a rule
 * that draws itself as the section enters.
 */
export default function SectionHeading({
  number,
  title,
  dark = false,
}: {
  number: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-12 md:mb-20">
      <div className="flex items-baseline justify-between">
        <h2 className="label">
          <span className="text-oxide">{number}</span>
          <span className="mx-2 opacity-50">/</span>
          {title}
        </h2>
        <span
          className={`label ${dark ? "text-paper/40" : "text-ink-2/70"}`}
          aria-hidden="true"
        >
          ROOM {number}
        </span>
      </div>
      <motion.div
        aria-hidden="true"
        className={`mt-4 h-px origin-left ${dark ? "bg-line-paper" : "bg-line"}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
