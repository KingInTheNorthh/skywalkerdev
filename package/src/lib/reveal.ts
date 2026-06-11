/**
 * Lets scenes wait for the preloader curtain before playing
 * their entrance — and not wait at all if it already lifted.
 */
export function onArchiveReveal(cb: () => void): () => void {
  if ((window as unknown as { __archiveRevealed?: boolean }).__archiveRevealed) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener("archive:reveal", handler, { once: true });
  return () => window.removeEventListener("archive:reveal", handler);
}
