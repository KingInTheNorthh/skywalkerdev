# A Working Archive

Portfolio of Lawrence “Skywalker” Peterson — backend, systems, security, embedded.
Next.js 16 · TypeScript · Tailwind v4 · GSAP · Framer Motion · Lenis.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

All copy lives in `src/content/site.ts` — edit that file, not the components.

## Deploy (Vercel)

1. Import the `KingInTheNorthh/skywalkerdev` repo in Vercel.
2. **Set “Root Directory” to `package`** in the project settings — the app
   does not live at the repo root. Everything else (framework preset,
   build command) is auto-detected.
3. Optional: once a custom domain is attached, set the env var
   `NEXT_PUBLIC_SITE_URL=https://yourdomain.tld` so canonical URLs,
   the sitemap and the OG image all point at it. Without it, the
   Vercel production URL is used automatically.

The build is fully static — no server runtime, no env vars required.

## Anatomy

```
src/
  content/site.ts        ← every word on the site
  app/                   ← layout, fonts, SEO, robots/sitemap/OG image
  components/
    scenes/              ← the seven rooms (Opening … Contact)
    ui/                  ← cursor, preloader, top bar, marquee, easter egg
    art/                 ← generative SVG case-file artwork
    providers/           ← Lenis smooth scroll + ScrollTrigger sync
  lib/                   ← scroll handle, reveal sync, site URL
```

P.S. — try typing P-I-N-G.
