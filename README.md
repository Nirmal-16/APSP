# Advanced Plasma & Space Propulsion Lab — Website

Research lab website built with Next.js (App Router), TypeScript, and
Tailwind CSS. Content (publications, projects, team, achievements) will be
managed through Sanity CMS.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app/` — pages, one folder per route (Home, About, Research, Projects,
  Publications, Team, Achievements, Contact)
- `src/components/` — shared UI (Navbar, Footer, sections)
- `src/lib/` — Sanity client and data-fetching helpers (added when CMS is
  wired up)

## Deployment

Deployed on Vercel, connected to this repo for auto-deploy on push.
