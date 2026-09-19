# Hideout Studios — landing site

Next.js (App Router) + Tailwind CSS v4 + TypeScript. Direct-booking landing page for Hideout Studios,
ported from the original single-file HTML prototype.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Configuration

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, no trailing slash. Drives canonical, Open Graph, sitemap, robots and JSON-LD URLs. Falls back to `VERCEL_PROJECT_PRODUCTION_URL`, then `http://localhost:3000`. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Search Console verification token. |

## Layout

```
src/
  app/
    layout.tsx           fonts, metadata (title, OG, Twitter, robots, canonical), viewport, JSON-LD
    page.tsx             page composition
    globals.css          Tailwind entry + base styles
    opengraph-image.tsx  1200×630 social image (also used by twitter-image.tsx)
    manifest.ts  robots.ts  sitemap.ts
    favicon.ico  icon.svg  apple-icon.png   (generated, see below)
  components/            Hero, ScrollReveal, Gallery, WhatsBuilt, Footer, JsonLd, shared UI
    booking/             BookingDemo, MonthGrid, StaySummary
  lib/                   site config, pricing/availability logic, photo list, social image
  styles/                theme.css (design tokens), reveal.css, calendar.css
public/images/           studio photos
scripts/generate-icons.mjs
```

Design tokens live in `src/styles/theme.css` and are exposed to Tailwind (`bg-brand`, `text-ink-2`,
`border-line`, `font-display` …). Light/dark follows the OS.

## Icons

`npm run icons` redraws `src/app/{favicon.ico,icon.svg,apple-icon.png}` and
`public/icon-{192,512,maskable-512}.png` from the drawing in `scripts/generate-icons.mjs`.

## Before going live

- Set `NEXT_PUBLIC_SITE_URL`.
- The booking calculator uses sample blocked dates and a fixed "today" (`src/lib/booking.ts`);
  the "What's actually running" section is prototype copy for the host, not guest-facing.
- Add `address`, `telephone` and `sameAs` to the JSON-LD in `src/components/JsonLd.tsx` once final.
