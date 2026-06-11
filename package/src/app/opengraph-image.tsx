import { ImageResponse } from "next/og";
import { identity, opening } from "@/content/site";

export const alt = `${identity.fullName} — ${identity.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1b1813";
const PAPER = "#f2eee3";
const OXIDE = "#b8431a";

/**
 * Social share card, generated at build time.
 * Same plate as the site's opening: kicker, surname, callsign.
 */
export default function OgImage() {
  const callsign = `CALLSIGN — “${identity.alias}” · ${identity.role.toUpperCase()}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: PAPER,
          padding: "56px 64px",
        }}
      >
        <div style={{ height: 6, background: OXIDE, margin: "-56px -64px 0" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: "0.18em",
            marginTop: 48,
          }}
        >
          <span>{opening.kicker}</span>
          <span style={{ color: OXIDE }}>{identity.established}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 168,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {identity.surname}
          </div>
          <div
            style={{
              fontSize: 30,
              marginTop: 28,
              color: "rgba(242,238,227,0.75)",
              letterSpacing: "0.08em",
            }}
          >
            {callsign}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(242,238,227,0.25)",
            paddingTop: 28,
            fontSize: 24,
            letterSpacing: "0.12em",
          }}
        >
          <span>{identity.location.toUpperCase()}</span>
          <svg width="40" height="40" viewBox="0 0 100 100">
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="10"
                x2="50"
                y2="38"
                stroke={OXIDE}
                strokeWidth="9"
                strokeLinecap="round"
                transform={`rotate(${i * 45} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="6" fill={OXIDE} />
          </svg>
          <span>GITHUB.COM/KINGINTHENORTHH</span>
        </div>
      </div>
    ),
    size
  );
}
