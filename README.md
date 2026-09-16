# CV Studio

Premium, minimal CV builder with live A4 preview and vector PDF export.
Four variants · three languages (FR / EN / AR with full RTL) · one profile.

## Run (one click)

Double-click **`CV Studio.cmd`** (or the *CV Studio* shortcut on the Desktop).
It installs dependencies the first time, starts the local server and opens the
browser. Close the window to stop.

Manual: `npm install` then `npm run start`. Deep links work: `?v=tech&l=ar`.

## Publish (one click, local only)

The **Publier** button in the top bar (only visible when running locally):

1. *Enregistrer localement* — writes your current edits (all variants and
   languages, photo included) to `src/content/saved.json`, so the built site
   ships with them.
2. *Publier sur GitHub* — same, then `git add / commit / push`. The GitHub
   Actions workflow in `.github/workflows/deploy.yml` builds and publishes to
   GitHub Pages (`https://<user>.github.io/<repo>/`).

First-time setup: create a public repository on GitHub, paste its URL in the
panel, publish, then in the repo go to **Settings → Pages → Source: GitHub
Actions**. For a custom domain (e.g. `cv.akramaz.com`) add it in the same Pages
settings; the build uses a relative base so nothing else changes.

## Variants

| Variant        | Aimed at                          | Layout                                   |
| -------------- | --------------------------------- | ---------------------------------------- |
| Polyvalent     | ECM, E-Transit, mailing/logistics | Single column, sage accent               |
| Infrastructure | Munisys, ATM/GAB, payments        | Tinted sidebar with skill matrix, mono   |
| Créatif        | Panneau Design, agencies          | Editorial serif, blush accent            |
| Builder        | Startups, product, AI             | Chips + cards, lilac accent              |

Each variant × language has its own editable content, saved in the browser
(`localStorage`). "Reset this variant" restores the defaults for the current
variant + language only.

## PDF export

"Download PDF" opens the browser print dialog with the page already sized to A4
(no margins, colours preserved). Choose **Save as PDF**. The output is vector
text — selectable, searchable, ATS-friendly — and Arabic is shaped correctly.

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · Zustand · lucide-react
