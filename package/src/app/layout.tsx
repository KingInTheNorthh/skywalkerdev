import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { identity } from "@/content/site";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Grain from "@/components/ui/Grain";
import TopBar from "@/components/ui/TopBar";
import RoomIndicator from "@/components/ui/RoomIndicator";
import Preloader from "@/components/ui/Preloader";
import EasterEgg from "@/components/ui/EasterEgg";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const jetMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetmono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lspeterson.dev"),
  title: `${identity.fullName} — ${identity.role}`,
  description:
    "A working archive. Lawrence “Skywalker” Peterson — backend, systems, cybersecurity and embedded engineering from Ghana. DNS servers, debuggers and transaction plumbing.",
  keywords: [
    "backend engineer",
    "systems programming",
    "cybersecurity",
    "embedded systems",
    "Rust",
    "Ghana",
    "portfolio",
  ],
  openGraph: {
    title: `${identity.fullName} — ${identity.role}`,
    description:
      "A working archive of systems-level software, experiments and working beliefs.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${identity.fullName} — ${identity.role}`,
    description:
      "A working archive of systems-level software, experiments and working beliefs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${grotesk.variable} ${jetMono.variable}`}
    >
      <body>
        <a
          href="#work"
          className="label fixed left-4 top-4 z-100 -translate-y-20 bg-ink px-4 py-3 text-paper transition-transform focus:translate-y-0"
        >
          Skip to work
        </a>
        <SmoothScroll>
          <Preloader />
          <TopBar />
          {children}
          <RoomIndicator />
          <Cursor />
          <Grain />
          <EasterEgg />
        </SmoothScroll>
      </body>
    </html>
  );
}
