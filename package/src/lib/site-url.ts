/**
 * Canonical site URL, resolved in order of authority:
 * 1. NEXT_PUBLIC_SITE_URL — set this once a custom domain exists
 * 2. Vercel's production URL — automatic on every Vercel deploy
 * 3. localhost — dev fallback
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
