# Advanced Plasma & Space Propulsion Group — Website

Research group website built with Next.js (App Router), TypeScript, Tailwind CSS,
Framer Motion and React Three Fiber.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build — run before every deploy
npm run lint
```

## Structure

- `src/app/` — one folder per page: Home, About, People, Research, Publications,
  Gallery, Insights (news, announcements, hiring), Contact
- `src/components/` — shared UI (layout, motion, 3D models, research, news, theme)
- `src/data/` — all site content; edit these files to update the site

## Updating content

| To change…                             | Edit                       |
| -------------------------------------- | -------------------------- |
| Lab name, contact details, socials, hero 3D model, stats, collaborators | `src/data/site-settings.ts` |
| Team members                           | `src/data/people.ts`        |
| Research areas and topics              | `src/data/research-areas.ts` |
| Publications                           | `src/data/publications.ts`  |
| News and announcements                 | `src/data/news.ts`          |
| Open positions                         | `src/data/hirings.ts`       |

Images go in `public/` and are referenced from the root, e.g. `/news/grant.jpg`.

## Deployment

Deployed on Vercel, which auto-deploys on push.
