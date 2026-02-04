# Moise Razvan — Portfolio (moiselabs.dev)

Vite + React + TypeScript + Tailwind CSS.

## Structure

```
src/
├── components/
│   ├── layout/     # Header, Footer (global)
│   └── ui/         # Card, Tags, FadeIn (reusable)
├── pages/          # Home, About, Work, Passions
├── hooks/          # useCursorGlow, useLenis
├── App.tsx
├── main.tsx
└── index.css
```

## Commands

- `npm run dev` — development server
- `npm run build` — production build (output in `dist/`)
- `npm run preview` — preview production build

## Deploy (GitHub Pages)

Build outputs to `dist/`. For GitHub Pages with custom domain (www.moiselabs.dev), deploy the `dist` contents to the `gh-pages` branch or configure GitHub Actions.
