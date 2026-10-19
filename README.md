# Secure Visa — 2026 redesign

**Live:** https://arsiesh.github.io/secure_visa_v2/

A React redesign of [securevisa.com](https://www.securevisa.com/), built with the client's real copy and photography. The design direction, tokens and rules are in [DESIGN.md](./DESIGN.md). Read it before changing any UI.

## Run it

```sh
npm install
npm run dev      # http://localhost:5180
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
npx oxlint       # lint
```

## Stack

Vite 8, React 19, TypeScript, Tailwind CSS v4 (tokens in `src/index.css`), Motion (loaded lazily through `LazyMotion`), React Router 7 (every page is its own chunk), lucide-react and Archivo Variable (self-hosted).

## Where things live

| Path | What |
|---|---|
| `src/pages/` | One component per route. Routes keep the original site's URLs (`/new-zealand-services/`, `/process/`, …). |
| `src/components/` | Shared pieces (header, footer, `CtaBand`, `TestimonialRail`, `Img`, `ButtonLink`, …). |
| `src/components/<area>/` | Page-specific components (`home`, `destination`, `process`, `about`, `team`, `stories`, `connect`, `podcast`). |
| `src/content/` | Typed site copy, taken verbatim from the live site (`../content/` has the raw scrape). |
| `src/content/imageMeta.ts` | Intrinsic sizes for every file in `public/images/`. Regenerate it when you add an image. |
| `public/images/` | WebP versions of the original site's images. The originals are in `../public/images/`. |

## Notes

- The contact form has no backend. It validates, then opens the visitor's email app with the message pre-filled to info@securevisa.com.
- The home hero's first photo is preloaded from `index.html`. Update that filename if the first entry in `boardArrivals` changes.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds with `BASE_PATH=/<repo name>/` and publishes to GitHub Pages. To deploy to a host that serves from the root (Vercel, Netlify), build without `BASE_PATH` and add a rewrite of all paths to `/index.html`.
