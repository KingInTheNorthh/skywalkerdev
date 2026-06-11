/**
 * The archive's mark: an eight-spoke press asterisk.
 * Scenes rotate it; on its own it just sits there looking inked.
 */
export default function Asterisk({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="8"
          x2="50"
          y2="38"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="5" fill="currentColor" />
    </svg>
  );
}
