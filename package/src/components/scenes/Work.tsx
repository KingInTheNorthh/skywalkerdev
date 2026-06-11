"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, type Project } from "@/content/site";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectArt from "@/components/art/ProjectArt";
import Asterisk from "@/components/art/Asterisk";

function CaseFile({ project, flip }: { project: Project; flip: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const ghostX = useTransform(
    scrollYProgress,
    [0, 1],
    flip ? [-40, 40] : [40, -40]
  );

  return (
    <article ref={ref} className="relative py-20 md:py-28">
      {/* Ghosted case number drifting behind the file */}
      <motion.span
        aria-hidden="true"
        style={{ x: ghostX }}
        className={`text-hollow font-display pointer-events-none absolute top-4 z-0 text-[34vw] leading-none text-ink/25 md:text-[18vw] ${
          flip ? "left-0 md:-left-4" : "right-0 md:-right-4"
        }`}
      >
        {project.index}
      </motion.span>

      <div className="relative z-10 grid grid-cols-12 items-center gap-x-4 gap-y-10">
        <motion.div
          style={{ y: artY }}
          className={`col-span-12 md:col-span-5 ${
            flip ? "md:col-start-8 md:order-2" : ""
          }`}
        >
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            data-cursor="SOURCE ↗"
            aria-label={`${project.title} source on GitHub`}
            className="block border border-ink/80 bg-paper-2 shadow-[8px_8px_0_0_var(--color-ink)] transition-transform duration-500 ease-[var(--ease-exhibit)] hover:-translate-y-1"
          >
            <div className="flex items-center justify-between border-b border-ink/80 px-3 py-2">
              <span className="label">FIG. {project.index}</span>
              <span className="label text-oxide">{project.year}</span>
            </div>
            <div className="aspect-4/3">
              <ProjectArt variant={project.art} />
            </div>
          </a>
        </motion.div>

        <div
          className={`col-span-12 md:col-span-6 ${
            flip ? "md:col-start-1 md:order-1" : "md:col-start-7"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label text-ink-2">
              CASE {project.index} · {project.role.toUpperCase()}
            </p>
            <h3 className="font-display mt-3 text-5xl leading-[0.95] md:text-7xl">
              {project.title}
            </h3>
            <p className="font-display mt-6 max-w-xl text-xl italic leading-snug text-ink md:text-2xl">
              {project.summary}
            </p>
            <p className="label mt-6 text-ink-2">
              {project.stack.join(" · ")}
            </p>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-3"
          >
            {(
              [
                ["THE PROBLEM", project.challenge],
                ["THE APPROACH", project.approach],
                ["THE RESULT", project.result],
              ] as const
            ).map(([head, body]) => (
              <div key={head}>
                <dt className="label text-oxide">{head}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink-2">
                  {body}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </article>
  );
}

/**
 * Room 03 — selected work, filed as cases rather than stacked
 * as cards. Each file gets a figure plate, a drifting ghost
 * number, and its problem/approach/result on the record.
 */
export default function Work() {
  return (
    <section id="work" className="overflow-x-clip px-5 py-28 md:px-10 md:py-44">
      <SectionHeading number="03" title="Selected Work" />
      <div className="divide-y divide-line">
        {projects.map((p, i) => (
          <CaseFile key={p.slug} project={p} flip={i % 2 === 1} />
        ))}
      </div>
      <div className="mt-8 flex items-center gap-4 text-ink-2">
        <Asterisk className="w-4 text-oxide" />
        <p className="label">
          EVERY CASE FILE SHIPS WITH SOURCE — GITHUB.COM/KINGINTHENORTHH
        </p>
      </div>
    </section>
  );
}
