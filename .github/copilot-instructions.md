# Copilot instructions — olifurz/site

This repo is a small Eleventy (11ty) static site. Use the notes below to be productive quickly.

- **Project type:** Eleventy static site. Input: `pages/`. Layouts: `layouts/`. Output: `dist/` (see `eleventy.config.js`).
- **Key commands:** `npm run build` → runs `eleventy` (produces `dist/`). `npm start` → `eleventy --serve` (dev server with live reload).
- **Where content lives:** Add page content under `pages/`. Blog posts live in `pages/blog/entries/` and use frontmatter tags to join collections.

- **Blog collection rule:** Posts are included if frontmatter contains `tags: blog-post`. Eleventy collection is defined in `eleventy.config.js`.

- **Layouts & templating:** Liquid templates in `layouts/`. `layouts/default.liquid` nests `base.liquid` via frontmatter (`layout: base.liquid`). Use `{{ content }}` to inject page content.

- **Static assets:** `assets/` and `scripts/` are passthrough-copied (served at `/assets/...` and `/scripts/...`). Example: `layouts/default.liquid` references `/scripts/site.js` and `/assets/images/banner.png`.

- **Client JS conventions:** `scripts/site.js` exposes a small `site` object on `window` (e.g., `site.getCookieByName`) and implements UI behaviors (dragging, cookie-based warning). Keep global usage minimal and consistent with existing code.

- **Styling:** Global stylesheet is `assets/styles.css`. Page-level inline styles are used in layouts — prefer adjusting `assets/styles.css` for site-wide changes.

- **Common edits and patterns:**
  - Add a new layout: place it in `layouts/` and reference it from page frontmatter. Remember `eleventyConfig.setLayoutsDirectory("../layouts")` — layouts are looked up relative to `pages/`.
  - Add passthrough assets by editing `eleventy.config.js` and calling `eleventyConfig.addPassthroughCopy("path")`.
  - To add a new collection, follow the `eleventyConfig.addCollection` example already used for `blog`.

- **Small but important quirks to preserve:**
  - `eleventy.config.js` sets layouts directory to `../layouts` (relative path). Moving the `pages` or `layouts` folder requires updating that setting.
  - Assets are assumed to be referenced from site root (`/assets/...`, `/scripts/...`).
  - The repo currently has no tests or CI; rely on `npm start` for local verification.
  - There is a duplicated `eleventyConfig.addPassthroughCopy("scripts")` call — it's harmless but avoid further duplication.
  - `package.json` lists some unusual packages (e.g., a dependency named `package.json`) — do not remove or change deps without verifying build impact.

- **Examples:**
  - Blog post frontmatter minimal example:

```
---
title: "My Post"
layout: default.liquid
tags: blog-post
---
```

  - Reference an asset in templates: `<img src="/assets/images/banner.png">` or `<script src="/scripts/site.js"></script>`.

- **Where to look for changes that affect the whole site:** `layouts/base.liquid`, `layouts/default.liquid`, `assets/styles.css`, `eleventy.config.js` and `scripts/site.js`.

- **When in doubt:** Run `npm start` and inspect the generated `dist/` output, or check the `pages/` file that corresponds to the rendered page. Use the GitHub repo link in the footer for upstream history.

If you want, I can also:
- add a short CONTRIBUTING note mentioning the Eleventy dev commands and where to add passthrough copies,
- or open a PR that removes the duplicate passthrough copy in `eleventy.config.js`.

Please review these instructions and tell me which sections need more detail or examples.
