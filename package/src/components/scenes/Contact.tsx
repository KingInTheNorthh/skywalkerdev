"use client";

import { motion } from "framer-motion";
import { contact, identity } from "@/content/site";
import SectionHeading from "@/components/ui/SectionHeading";
import Asterisk from "@/components/art/Asterisk";

/**
 * Room 06 — lights off, archive closed. The page's one inversion:
 * the catalogue ends in ink, with the surname's initials doing
 * what they always threatened to do.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      className="flex min-h-svh flex-col bg-ink px-5 pb-8 pt-28 text-paper md:px-10 md:pt-44"
    >
      <SectionHeading number="06" title="Contact" dark />

      <div className="flex flex-1 flex-col items-start justify-center py-10">
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display-wonk text-[26vw] italic leading-[0.85] md:text-[18vw]"
        >
          {contact.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-xl text-base leading-relaxed text-paper/70 md:text-lg"
        >
          {contact.body}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          href={`mailto:${identity.email}`}
          data-cursor="WRITE"
          className="link-draw mt-10 break-all font-mono text-lg text-paper md:text-3xl"
        >
          {identity.email}
        </motion.a>

        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
          <a
            href={identity.github}
            target="_blank"
            rel="noreferrer"
            data-cursor="VISIT ↗"
            className="label link-draw"
          >
            GITHUB ↗
          </a>
          <a
            href={`mailto:${identity.email}?subject=CV%20request`}
            data-cursor="ASK"
            className="label link-draw"
          >
            CV — ON REQUEST
          </a>
        </div>
      </div>

      <footer className="border-t border-line-paper pt-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-md">
            <p className="label leading-relaxed text-paper/50">
              {contact.colophon}
            </p>
            <p className="label mt-3 text-oxide">{contact.hint}</p>
          </div>
          <div className="flex items-center gap-4">
            <Asterisk className="w-5 text-oxide" />
            <p className="label text-paper/50">
              © {new Date().getFullYear()} {identity.fullName} ·{" "}
              {identity.location}
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
