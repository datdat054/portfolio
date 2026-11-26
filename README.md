# Luu Duc Dat — Java Backend Developer Portfolio

Static portfolio and interactive CV built with HTML5, CSS3, Bootstrap 3, and jQuery, matching the layout and visual identity of `vndl3596/Portfolio` while tailored with Luu Duc Dat's CV, custom vector illustrations, automated QA tests, and CI/CD pipelines.

## Local Development & Verification

```bash
# Install dev tools (ESLint, HTML-Validate, Vitest, JSDOM)
npm install

# Run local static server on http://127.0.0.1:3000
npm run dev

# Run ESLint + HTML5 validation
npm run lint

# Run automated unit & DOM integration tests
npm test

# Build and verify static output in dist/
npm run build

# Run full verification (lint + test + build)
npm run verify
```

## Project Structure

- `index.html` — Single-page portfolio sections (Hero, Intro, Quote, About & Skills, Counters, Services Carousel, Highlights Carousel, Timeline History, Filterable Projects + Modals, Tech Ecosystem, Resume PDF Viewer/Download, Contact Form, Social Bar, Footer).
- `assets/css/style.css` — Custom styling, responsive layout rules, diamond motif, animations, and bug fixes.
- `assets/js/script.js` — Offline-safe typing effect, contact form validation & `mailto:` builder, project filtering, namespaced scroll/counter/progress triggers, and UMD exports for automated tests.
- `assets/resume/cv-of-LuuDucDat.pdf` — Resume PDF linked in the Resume section.
- `scripts/build.mjs` — Static bundler (`dist/` or `--out public` for GitLab Pages) with automated asset existence checks.
- `tests/portfolio.test.mjs` — Automated Vitest + JSDOM suite verifying CV data integrity, zero leftover template leaks, asset & link safety, and interactive JS behavior.

## Automated CI/CD & Auto-Deploy

### GitHub Actions (`.github/workflows/ci-cd.yml`)
Runs `npm ci`, `npm run lint`, `npm test`, and `npm run build` on pushes and PRs to `main`/`master`.
- **GitHub Pages**: Automatically deploys `dist/` on push to `main`/`master` once **Settings → Pages → Source: GitHub Actions** is enabled.
- **Vercel (optional)**: Automatically deploys if `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` secrets are added in repository settings.

### GitLab CI/CD (`.gitlab-ci.yml`)
Runs `test_and_lint` and `build_static` stages on every commit.
- **GitLab Pages**: Automatically publishes `dist/` to `public/` on the default branch.
- **Vercel (optional)**: Automatically deploys when `VERCEL_TOKEN` (plus `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`) CI/CD variables are set.
