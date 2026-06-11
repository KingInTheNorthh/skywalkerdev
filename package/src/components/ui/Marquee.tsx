/**
 * Editorial ticker. Content is duplicated once for the seamless loop;
 * the copy is aria-hidden. CSS animation pauses under reduced motion.
 */
export default function Marquee({
  items,
  duration = 28,
  className = "",
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <span
      aria-hidden={hidden || undefined}
      className="inline-flex items-center"
    >
      {items.map((item) => (
        <span key={item} className="inline-flex items-center">
          <span className="px-6">{item}</span>
          <span className="text-oxide" aria-hidden="true">
            ✳
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="marquee-track inline-flex"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
