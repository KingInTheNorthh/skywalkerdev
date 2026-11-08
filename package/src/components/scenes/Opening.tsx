"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { identity, opening } from "@/content/site";
import Marquee from "@/components/ui/Marquee";
import Asterisk from "@/components/art/Asterisk";
import { onArchiveReveal } from "@/lib/reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Room 00 — the cover of the catalogue. The surname is set like
 * wood type; characters rise out of the slug line once the
 * preloader curtain lifts, then the whole plate drifts on scroll.
 */
export default function Opening() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;

      gsap.set("[data-char]", { yPercent: 112 });
      gsap.set("[data-fade]", { autoAlpha: 0, y: 24 });

      const cleanup = onArchiveReveal(() => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to("[data-char]", {
            yPercent: 0,
            duration: 1.3,
            stagger: 0.055,
            delay: 0.15,
          })
          .to(
            "[data-fade]",
            { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 },
            "-=0.8"
          );
      });

      // The plate sinks slightly as you leave the room.
      gsap.to("[data-plate]", {
        yPercent: 14,
        autoAlpha: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // The press mark turns with the scroll, like a wheel being inked.
      gsap.to("[data-mark]", {
        rotation: 240,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      return cleanup;
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      id="opening"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-20"
    >
      <div data-plate>
        <div className="flex items-baseline justify-between border-b border-line px-5 pb-4 md:px-10">
          <p data-fade className="label">
            {opening.kicker}
          </p>
          <p data-fade className="label hidden text-ink-2 sm:block">
            {identity.established} · {identity.coordinates}
          </p>
        </div>

        <div className="relative px-5 md:px-10">
          <h1
            className="font-display select-none text-[15.5vw] leading-[0.86] tracking-[-0.02em] md:text-[14vw]"
            aria-label={identity.fullName}
          >
            {identity.surname.split("").map((char, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="inline-block overflow-hidden align-bottom"
              >
                <span data-char className="inline-block will-change-transform">
                  {char}
                </span>
              </span>
            ))}
          </h1>

          <div
            data-mark
            className="absolute right-6 top-2 w-12 text-oxide md:right-12 md:w-20"
          >
            <Asterisk className="size-full" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-12 gap-4 px-5 md:mt-12 md:px-10">
          <p
            data-fade
            className="font-display col-span-12 text-xl italic leading-snug text-ink md:col-span-5 md:col-start-7 md:text-2xl"
          >
            {opening.statement}
          </p>
          <p
            data-fade
            className="label col-span-12 mt-4 leading-loose text-ink-2 md:col-span-4 md:col-start-1 md:row-start-1 md:mt-1"
          >
            {identity.role}
            <br />
            {identity.location}
            <br />
            {identity.honors.map((honor) => (
              <span key={honor} className="block text-oxide">
                {honor}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div data-fade className="mt-12">
        <div className="flex items-center justify-between px-5 pb-3 md:px-10">
          <span className="label text-ink-2">FIELDS OF PRACTICE</span>
          <span className="label text-ink-2" aria-hidden="true">
            SCROLL ↓
          </span>
        </div>
        <div className="border-y border-line py-4">
          <Marquee items={opening.marquee} className="label text-sm" />
        </div>
      </div>
    </section>
  );
}
