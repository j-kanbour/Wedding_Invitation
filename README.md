# Jayden &amp; Jamelle — Wedding RSVP

A Next.js 14 (App Router, TypeScript) site for the wedding of Jayden &amp; Jamelle on 17 January 2026.

## Getting started

```bash
cd nextjs
npm install
npm run dev
```

Then open <http://localhost:3000>.

Other scripts:

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the dev server with HMR         |
| `npm run build` | Production build                      |
| `npm run start` | Run the production build              |
| `npm run lint`  | Lint with `eslint-config-next`        |

## Project structure

```
nextjs/
├── app/
│   ├── layout.tsx        # Root layout + next/font setup (Italiana, Cormorant, Inter)
│   ├── page.tsx          # Page composition
│   └── globals.css       # All design tokens + component styles
├── components/
│   ├── Topbar.tsx
│   ├── Hero.tsx          # Names, date strip, RSVP / Add-to-Calendar CTAs
│   ├── Photo.tsx         # Full-bleed editorial photo band (uses next/image)
│   ├── Ornament.tsx
│   ├── Footer.tsx
│   ├── sections/
│   │   ├── Church.tsx
│   │   ├── Reception.tsx
│   │   ├── Parking.tsx
│   │   └── Contact.tsx
│   └── rsvp/
│       ├── RSVP.tsx      # ★ Client component — the multi-step RSVP flow
│       ├── MemberRow.tsx # One row per invited person
│       └── types.ts
├── lib/
│   └── invites.ts        # Mock invitation list + search index
└── public/
    ├── couple-01.png
    ├── couple-02.png
    └── couple-03.png
```

## Things you'll want to wire up

1. **Real invitee list.** `lib/invites.ts` currently holds a mock array of `InviteGroup`s. Replace it with a fetch from your database, a CMS, or just edit the file directly with your final guest list. Each member's `named: true` flag controls whether they appear in the main list or under "also invited".

2. **RSVP submission.** `components/rsvp/RSVP.tsx` &rarr; the `submit()` function currently logs to the console and shows the success state. Wire it to a backend by adding an API route:

   ```ts
   // app/api/rsvp/route.ts
   export async function POST(req: Request) {
     const data = await req.json();
     // …persist to your DB, send an email, etc.
     return Response.json({ ok: true });
   }
   ```

   …then `fetch('/api/rsvp', { method: 'POST', body: JSON.stringify(payload) })` from `submit()`.

3. **Map pins.** `components/sections/Parking.tsx` has placeholder URLs for Google Maps, Apple Maps and Waze. Drop in your real shared pins.

4. **Add-to-Calendar.** `components/Hero.tsx` builds a Google Calendar quick-add URL. Update the `dates`, `location`, and `details` once everything is finalised. (Times are in UTC — current value covers 5pm–1am Sydney for a Sat 17 Jan 2026 event in AEDT.)

5. **Domain &amp; deploy.** Push to a Git host and deploy on Vercel — it'll detect Next.js automatically. Set `next start` if self-hosting.

## Design notes

- **Fonts.** Italiana (display, the couple's names), Cormorant Garamond (serif body, italics), Inter (small-caps UI labels). All three are loaded via `next/font/google` so they're self-hosted at build time — no FOUT, no extra DNS lookups.
- **Color tokens.** Defined as `oklch()` custom properties in `globals.css`. A single warm "ink" greyscale plus one dusty terracotta accent.
- **Paper texture.** A fixed-position SVG noise overlay on `body::before` with `mix-blend-mode: multiply`. Remove it by deleting that rule.
- **Photos.** All three engagement photos are served from `/public` and rendered through `next/image` with `fill` for automatic responsive sizing.
