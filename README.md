# CV Studio

Premium, minimal CV builder with live A4 preview and vector PDF export.
Four variants · three languages (FR / EN / AR with full RTL) · one profile.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173. Deep links work: `?v=tech&l=ar`.

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
