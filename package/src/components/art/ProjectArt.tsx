/**
 * Deterministic generative artwork for each case file.
 * Pure SVG, seeded math, zero image bytes — the visuals are code,
 * which is rather the point of the portfolio.
 */

const INK = "#1b1813";
const OXIDE = "#b8431a";
const PAPER2 = "#e9e3d3";

// Small deterministic PRNG so the art never shifts between builds.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Sika Ledger — an abstracted day-book: columns, entries, one hot cell. */
function LedgerArt() {
  const rand = mulberry32(7);
  const cols = 6;
  const rows = 9;
  const cellW = 400 / cols;
  const cellH = 300 / rows;
  const cells: React.ReactNode[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = rand();
      const x = c * cellW;
      const y = r * cellH;
      if (v > 0.86) {
        cells.push(
          <rect
            key={`f${r}-${c}`}
            x={x + 3}
            y={y + 3}
            width={cellW - 6}
            height={cellH - 6}
            fill={v > 0.95 ? OXIDE : INK}
          />
        );
      } else if (v > 0.55) {
        const marks = Math.ceil(v * 5);
        for (let m = 0; m < marks; m++) {
          cells.push(
            <line
              key={`t${r}-${c}-${m}`}
              x1={x + 10 + m * 8}
              y1={y + 8}
              x2={x + 10 + m * 8}
              y2={y + cellH - 8}
              stroke={INK}
              strokeWidth="2"
            />
          );
        }
      }
    }
  }

  return (
    <svg viewBox="0 0 400 300" className="size-full" aria-hidden="true">
      <rect width="400" height="300" fill={PAPER2} />
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * cellW}
          y1="0"
          x2={i * cellW}
          y2="300"
          stroke={INK}
          strokeOpacity="0.25"
        />
      ))}
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * cellH}
          x2="400"
          y2={i * cellH}
          stroke={INK}
          strokeOpacity="0.25"
        />
      ))}
      {cells}
    </svg>
  );
}

/** Harmattan — contour lines that loosen where the data thins. */
function ContourArt() {
  const rand = mulberry32(21);
  const lines: React.ReactNode[] = [];

  for (let i = 0; i < 14; i++) {
    const y = 20 + i * 19;
    const amp = 6 + rand() * 16;
    const phase = rand() * Math.PI * 2;
    const freq = 0.012 + rand() * 0.01;
    let d = `M 0 ${y}`;
    for (let x = 0; x <= 400; x += 8) {
      const yy = y + Math.sin(x * freq + phase) * amp * Math.sin(x * 0.004);
      d += ` L ${x} ${yy.toFixed(1)}`;
    }
    const sparse = i > 9;
    lines.push(
      <path
        key={i}
        d={d}
        fill="none"
        stroke={i === 6 ? OXIDE : INK}
        strokeWidth={i === 6 ? 2 : 1.2}
        strokeOpacity={sparse ? 0.35 : 0.8}
        strokeDasharray={sparse ? "2 6" : undefined}
      />
    );
  }

  return (
    <svg viewBox="0 0 400 300" className="size-full" aria-hidden="true">
      <rect width="400" height="300" fill={PAPER2} />
      {lines}
      <circle cx="312" cy="84" r="3.5" fill={OXIDE} />
      <circle cx="96" cy="180" r="3.5" fill={INK} />
      <circle cx="210" cy="236" r="3.5" fill={INK} />
    </svg>
  );
}

/** Kente Grid — strip-weave logic as alternating warp and weft blocks. */
function WeaveArt() {
  const rand = mulberry32(3);
  const strips: React.ReactNode[] = [];
  const stripH = 300 / 6;

  for (let s = 0; s < 6; s++) {
    const blocks = 5 + Math.floor(rand() * 3);
    const blockW = 400 / blocks;
    for (let b = 0; b < blocks; b++) {
      const warp = (s + b) % 2 === 0;
      const hot = rand() > 0.78;
      const x = b * blockW;
      const y = s * stripH;
      if (warp) {
        // vertical threads
        for (let t = 0; t < blockW; t += 7) {
          strips.push(
            <line
              key={`w${s}-${b}-${t}`}
              x1={x + t + 3}
              y1={y + 2}
              x2={x + t + 3}
              y2={y + stripH - 2}
              stroke={hot ? OXIDE : INK}
              strokeWidth="3"
            />
          );
        }
      } else {
        // horizontal threads
        for (let t = 0; t < stripH; t += 7) {
          strips.push(
            <line
              key={`f${s}-${b}-${t}`}
              x1={x + 2}
              y1={y + t + 3}
              x2={x + blockW - 2}
              y2={y + t + 3}
              stroke={hot ? OXIDE : INK}
              strokeWidth="3"
              strokeOpacity={hot ? 1 : 0.85}
            />
          );
        }
      }
    }
  }

  return (
    <svg viewBox="0 0 400 300" className="size-full" aria-hidden="true">
      <rect width="400" height="300" fill={PAPER2} />
      {strips}
    </svg>
  );
}

/** Millenium DNS — a hex dump of a query, header fields inked hot. */
function PacketArt() {
  const rand = mulberry32(53);
  const rows = 10;
  const cols = 8;
  const cellW = 340 / cols;
  const rowH = 270 / rows;
  const bytes: React.ReactNode[] = [];

  for (let r = 0; r < rows; r++) {
    bytes.push(
      <text
        key={`off${r}`}
        x={10}
        y={32 + r * rowH}
        fontSize="11"
        fill={INK}
        fillOpacity="0.45"
        style={{ fontFamily: "var(--font-jetmono), monospace" }}
      >
        {`0x${(r * 8).toString(16).padStart(4, "0")}`}
      </text>
    );
    for (let c = 0; c < cols; c++) {
      const byte = Math.floor(rand() * 256);
      const isHeader = r < 2 || (r === 2 && c < 4);
      const hot = isHeader && rand() > 0.55;
      if (hot) {
        bytes.push(
          <rect
            key={`hl${r}-${c}`}
            x={66 + c * cellW - 4}
            y={32 + r * rowH - 14}
            width={cellW - 10}
            height={20}
            fill={OXIDE}
          />
        );
      }
      bytes.push(
        <text
          key={`b${r}-${c}`}
          x={66 + c * cellW}
          y={32 + r * rowH}
          fontSize="13"
          fill={hot ? PAPER2 : INK}
          fillOpacity={hot ? 1 : isHeader ? 0.95 : 0.45 + rand() * 0.35}
          style={{ fontFamily: "var(--font-jetmono), monospace" }}
        >
          {byte.toString(16).padStart(2, "0")}
        </text>
      );
    }
  }

  return (
    <svg viewBox="0 0 400 300" className="size-full" aria-hidden="true">
      <rect width="400" height="300" fill={PAPER2} />
      <line x1="56" y1="8" x2="56" y2="292" stroke={INK} strokeOpacity="0.25" />
      {bytes}
      <text
        x="394"
        y="292"
        fontSize="10"
        fill={INK}
        fillOpacity="0.5"
        textAnchor="end"
        style={{ fontFamily: "var(--font-jetmono), monospace" }}
      >
        QR=0 OPCODE=QUERY QDCOUNT=1
      </text>
    </svg>
  );
}

export default function ProjectArt({
  variant,
}: {
  variant: "ledger" | "contour" | "weave" | "packet";
}) {
  if (variant === "ledger") return <LedgerArt />;
  if (variant === "contour") return <ContourArt />;
  if (variant === "packet") return <PacketArt />;
  return <WeaveArt />;
}
