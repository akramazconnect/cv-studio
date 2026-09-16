# CV Studio

Premium, minimal CV builder with live A4 preview and vector PDF export.
Four variants · three languages (FR / EN / AR with full RTL) · one profile.

## Run (one click)

Double-click **`CV Studio.cmd`** (or the *CV Studio* shortcut on the Desktop).
It installs dependencies the first time, starts the local server and opens the
browser. Close the window to stop.

Manual: `npm install` then `npm run start`. Deep links work: `?v=tech&l=ar`.

## Your data vs. the public site

- **Public site / GitHub** ships only the generic placeholder profile. Anyone
  can use it to build their own CV; their edits stay in their own browser.
- **Your PC**: edits are kept in the browser. *Publier → Garder mes infos sur
  ce PC* also writes them to `src/content/local.json`, which is git-ignored and
  becomes the default content on this machine only (survives a browser reset).
- **Backup**: *Apparence → Sauvegarde → Exporter / Importer* downloads or
  restores a JSON with all variants, languages, colors and photo.

## Publish (one click, local only)

*Publier → Publier sur GitHub* commits and pushes the **app code only**, then
the workflow in `.github/workflows/deploy.yml` builds and deploys to GitHub
Pages. Personal data never leaves the machine.

First-time setup: create a public repository on GitHub, paste its URL in the
panel, publish, then in the repo go to **Settings → Pages → Source: GitHub
Actions**. For a custom domain add it in the same Pages settings; the build
uses a relative base so nothing else changes.

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · Zustand · lucide-react
