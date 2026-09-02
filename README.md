# Portfolio — Yasser Haoues

Single-page portfolio. No build step, no dependencies: three files.

```
index.html   markup + all content
styles.css   design tokens, layout, dark/light themes
script.js    theme toggle, sticky nav, scrollspy, reveals, copy-email
```

## Run locally

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321

## What to fill in before publishing

- `index.html` → `.contact__links` — the **GitHub** and **LinkedIn** hrefs are
  placeholders (`https://github.com/`). Replace with your real profiles.
- Project cards have no live links yet. When a project is deployed, add a
  `<a href="…" target="_blank" rel="noopener noreferrer">Visit ↗</a>` inside
  `.card__top`.
- Statuses (`In development` / `MVP` / `Shipped`) are in the `.pill` spans.

## Theme

Follows the system `prefers-color-scheme` on first visit (set inline in `<head>`
before paint, so no flash). The toggle choice is saved in `localStorage` under
`theme`. Light = warm paper, dark = charcoal; accent is vermilion in both.

## Deploy

Drag the folder into Netlify / Cloudflare Pages, or push to GitHub and enable
Pages. Nothing to build.
