"use client";

import { motion } from "framer-motion";
import { experiments } from "@/content/site";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Room 04 — the flat files. Sketches and tools kept in an index;
 * rows ink themselves when pulled.
 */
export default function Experiments() {
  return (
    <section id="experiments" className="px-5 py-28 md:px-10 md:py-44">
      <SectionHeading number="04" title="Experiments" />

      <div className="grid grid-cols-12 gap-4">
        <p className="font-display col-span-12 mb-14 max-w-md text-2xl italic leading-snug md:col-span-4">
          {experiments.intro}
        </p>

        <ul className="col-span-12 border-t border-line md:col-span-7 md:col-start-6">
          {experiments.items.map((item, i) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.55,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-b border-line"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN ↗"
                className="flood-row group grid grid-cols-12 items-baseline gap-2 px-2 py-6 md:px-4"
              >
                <span className="label col-span-3 text-ink-2 group-hover:text-oxide sm:col-span-2">
                  {item.year}
                </span>
                <span className="col-span-9 font-mono text-lg tracking-tight transition-transform duration-500 ease-[var(--ease-exhibit)] group-hover:translate-x-3 group-hover:text-paper sm:col-span-4 md:text-xl">
                  {item.name}
                </span>
                <span className="col-span-12 mt-2 text-sm text-ink-2 group-hover:text-paper/70 sm:col-span-6 sm:mt-0">
                  {item.note}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
