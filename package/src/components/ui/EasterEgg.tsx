"use client";

import { useEffect, useState } from "react";

/**
 * Type P-I-N-G anywhere on the page and the archive answers.
 * Mentioned only as a P.S. in the footer.
 */
export default function EasterEgg() {
  const [ponged, setPonged] = useState(false);

  useEffect(() => {
    console.log(
      "%cA WORKING ARCHIVE %c— you read consoles. Good sign. Try typing: P I N G",
      "font-weight:bold;background:#1b1813;color:#f2eee3;padding:2px 6px;",
      "color:#b8431a;"
    );

    let buffer = "";
    let timer: ReturnType<typeof setTimeout>;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-4);
      if (buffer === "ping") {
        setPonged(true);
        timer = setTimeout(() => setPonged(false), 2600);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, []);

  if (!ponged) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-0 z-99 flex items-center justify-center"
    >
      <div className="stamp border-4 border-oxide bg-paper/90 px-8 py-5 text-center">
        <p className="label text-oxide" style={{ fontSize: "0.85rem" }}>
          ★ PONG ★
        </p>
        <p className="label mt-2 text-ink-2">
          0% PACKET LOSS · TTL=64 · TIME&lt;1MS
        </p>
      </div>
    </div>
  );
}
