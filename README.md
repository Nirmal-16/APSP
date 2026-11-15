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

- `src/app/` — one folder per page: Home, About, Lab Members, Research,
  Publications, Gallery, Insights (news, announcements, hiring), Contact
- `src/components/` — shared UI (layout, motion, 3D models, research, people, theme)
- `src/data/` — all site content; edit these files to update the site

## Updating content

| To change…                                                    | Edit                                      |
| ------------------------------------------------------------- | ----------------------------------------- |
| Lab name, contact details, socials, mission & vision, hero 3D model, stats, collaborators | `src/data/site-settings.ts` |
| Contact page text, visual, FAQ, help cards                    | `contact` in `src/data/site-settings.ts`  |
| About page and Principal Investigator profile (bio, teaching, invited talks) | `src/data/about.ts` |
| Lab members (photos in `public/people/`, 4:5 portrait)        | `src/data/people.ts`                      |
| Research areas, focus areas and their images (`public/research/`) | `src/data/research-areas.ts`          |
| Publications (also shown on each author's profile)            | `src/data/publications.ts`                |
| News and announcements                                        | `src/data/news.ts`                        |
| Open positions                                                | `src/data/hirings.ts`                     |
| Text sizes across the whole site                              | type scale in `src/app/globals.css`       |

Images and videos go in `public/` and are referenced from the root, e.g.
`/people/gyandeep.jpg` or `/media/electrospray-satellite.mp4`. A media slot
can show a 3D model, an image or a video — see `src/data/media.ts`.

## Deployment

Deployed on Vercel, which auto-deploys on push.
