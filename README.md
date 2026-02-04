# Moise Razvan — Portfolio (moiselabs.dev)

Vite + React + TypeScript + Tailwind CSS.

## Structure

```
src/
├── components/
│   ├── layout/     # Header, Footer (global)
│   └── ui/         # Card, Tags, FadeIn (reusable)
├── pages/          # Home, About, Work, Passions, Projects
├── pages/admin/    # Admin panel, Project form
├── lib/            # projects, auth
├── data/           # projects.json (fallback)
├── hooks/          # useCursorGlow, useLenis
├── App.tsx
├── main.tsx
└── index.css
```

## Admin Panel

- **URL:** `/admin` (login at `/admin/login`)
- **Default PIN:** 1234 (set `VITE_ADMIN_PIN` in `.env` to change)
- Add projects with title, company, dates, location, description, images (URLs), tags
- Projects are stored in localStorage as draft
- Click **Export JSON** to download — replace `src/data/projects.json` and push to publish
- For images: add files to `public/projects/` and use `/projects/filename.jpg` as URL

## Commands

- `npm run dev` — development server
- `npm run build` — production build (output in `dist/`)
- `npm run preview` — preview production build

## Deploy (GitHub Pages)

Build outputs to `dist/`. GitHub Actions deploys on push to `main`.
