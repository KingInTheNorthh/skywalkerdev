"use client";

import { motion } from "framer-motion";
import { craft } from "@/content/site";
import SectionHeading from "@/components/ui/SectionHeading";

const rise = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
};

/**
 * Room 02 — the workbench. Principles pinned on the left like
 * shop rules; instruments racked on the right, each row flooding
 * with ink when handled.
 */
export default function Craft() {
  return (
    <section id="craft" className="bg-paper-2/60 px-5 py-28 md:px-10 md:py-44">
      <SectionHeading number="02" title="Craft" />

      <div className="grid grid-cols-12 gap-x-4 gap-y-16">
        <div className="col-span-12 md:col-span-5">
          <div className="md:sticky md:top-28">
            <motion.p
              {...rise}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display max-w-md text-2xl italic leading-snug md:text-3xl"
            >
              {craft.intro}
            </motion.p>

            <div className="mt-14 space-y-10">
              {craft.principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  {...rise}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex gap-5"
                >
                  <span className="label pt-1.5 text-oxide">
                    R.{String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-2">
                      {p.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <p className="label mb-6 text-ink-2">INSTRUMENTS — IN ORDER OF REACH</p>
          <ul className="border-t border-line">
            {craft.instruments.map((tool, i) => (
              <motion.li
                key={tool.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-line"
              >
                <div
                  data-cursor="✳"
                  className="flood-row group flex items-baseline gap-5 px-2 py-5 transition-colors duration-300 md:px-4"
                >
                  <span className="label text-ink-2 group-hover:text-oxide">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xl font-medium tracking-tight group-hover:text-paper md:text-2xl">
                    {tool.name}
                  </span>
                  <span className="font-display ml-auto italic text-ink-2 group-hover:text-paper/70">
                    {tool.role}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
