import type Lenis from "lenis";

/**
 * Module-level handle to the Lenis instance so any component
 * (index overlay, scroll cues) can drive smooth scrolling without context.
 */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function pauseLenis(paused: boolean) {
  if (!lenis) return;
  if (paused) lenis.stop();
  else lenis.start();
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
