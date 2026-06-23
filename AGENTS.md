# Lawnchair Website — Agent Instructions

> Official website for [Lawnchair Launcher](https://lawnchair.app), a customizable Pixel Launcher for Android.

## Project Overview

**Type**: Pure static website (no build tools, frameworks, or transpilers)  
**Deployment**: Direct FTP deploy via GitHub Actions on push to `master`  
**Tech Stack**: Vanilla HTML/CSS/JS + Material Design 3 + Google Fonts/Material Symbols  
**Source**: [LawnchairLauncher/lawnchair-website](https://github.com/LawnchairLauncher/lawnchair-website)

## Architecture at a Glance

```
Root level:     index.html, privacy-policy.html, styles.css, script.js
Multi-page:     /blog/, /downloads/, /faq/, /support/, /lawnicons/, etc.
Blog posts:     /blog/{slug}/index.html (nested per-post structure)
Shared assets:  /assets/common.{css,js}, /assets/m3/{colors,shapes}.css
Dynamic data:   /live-information.json (announcements), /changelog/log.json
Images:         /images/ (WebP primary, PNG fallback via <picture>)
```

## Design System & Styling

**Material Design 3 (M3) Color System**
- **Source file**: `/assets/m3/colors.css`  
- **Light/dark mode**: Auto-detected via `@media (prefers-color-scheme: light|dark)`
- **Lawnchair accent**: Green (#02d663 light mode, custom in dark mode)
- **Usage**: All colors defined as CSS custom properties — never hardcode hex codes
- **Example**: `background-color: var(--md-sys-color-primary);`

**Spacing & Shapes**
- Border radius tokens in `/assets/m3/shapes.css`  
- Responsive breakpoint: **700px** (mobile/desktop split)
- **Main container**: `<main>` element with `max-width: 900px` and `margin: 0 auto`
- Padding: 80% width on desktop, full width on mobile

**Typography**
- **Font**: Google Fonts "Inter" (all weights 100–900)
- **Document styles**: `/assets/document.css` for article/blog post typography
- Structured headings: `h1` (page title), `h2` (sections), `h3+` (sub-sections)

## HTML & Page Structure

**Standard Page Template**
Every page should include:
1. Full `<!DOCTYPE html>` with UTF-8 charset
2. Preload critical resources:
   - Fonts with `fetchpriority="high"`
   - Hero images with `rel="preload" as="image"`
3. M3 + Lawnchair stylesheets:
   ```html
   <link href="/assets/m3/colors.css" rel="stylesheet" />
   <link href="/assets/m3/shapes.css" rel="stylesheet" />
   <link href="/assets/common.css" rel="stylesheet" />
   ```
4. Sticky header with navigation (copy from existing pages)
5. Schema.org `<script type="application/ld+json">` for SEO

**Image Optimization**
- Use `<picture>` elements with WebP primary + PNG fallback:
  ```html
  <picture>
    <source srcset="/images/hero.webp" type="image/webp" />
    <source srcset="/images/hero.png" type="image/png" />
    <img src="/images/hero.png" alt="Hero image" decoding="async" />
  </picture>
  ```
- Set `decoding="async"` to prevent render blocking
- Use `fetchpriority="high"` for above-the-fold images

**Semantic HTML**
- Use semantic elements: `<main>`, `<article>`, `<section>`, `<nav>`
- Headings must have IDs for FAQ TOC generation
- Link structure: Use relative paths (e.g., `/blog/`, `/faq/`)

## JavaScript Patterns

**No Frameworks or Build Tools**
- All JS is vanilla ES6+ (arrow functions, async/await, const/let)
- Scripts use `defer` attribute to prevent render blocking
- **No package.json** — all external libs loaded from CDN

**Octokit for GitHub Releases**
Used on downloads page to fetch latest Lawnchair releases:
```javascript
import { Octokit } from "https://cdn.jsdelivr.net/npm/octokit@3.1.2/dist/bundle.min.mjs";
const octokit = new Octokit();
const releases = await octokit.rest.repos.listReleases({
  owner: "LawnchairLauncher",
  repo: "Lawnchair",
});
```

**Dynamic Announcements**
- Source: `/live-information.json`
- Fetched on page load; shows snackbar if announcements exist
- Has debug flag: `?test=true` to show test announcements
- Query param `?disabledownloads` skips API calls (for testing)

**FAQ Table of Contents**
- Auto-generated from heading IDs on `/faq/index.html`
- Query param `?disabletoc=true` disables it
- Pattern: headings with `id="question-name"` get TOC entries

## Adding New Content

**New Page**
1. Create directory: `/section-name/index.html`
2. Copy boilerplate from existing page (e.g., `/faq/index.html`)
3. Update `<title>`, `<meta name="description">`, and schema.org type
4. Add to navigation in header if it's a top-level section
5. Push to `master` → FTP deploy runs automatically

**Blog Post**
1. Create: `/blog/post-slug/index.html`
2. Include:
   - `/assets/document.css` (article typography)
   - `/blog/blog.css` (figure styling)
   - Post metadata in schema.org `BlogPosting`
3. Add entry to `/blog/index.html` with title, date, excerpt, link
4. Use semantic `<article>`, `<h1>` for title, `<h2>` for sections

**Dynamic Content Updates**
- Announcements: Edit `/live-information.json`
- Changelog: Edit `/changelog/log.json`
- GitHub releases: Automatically fetched (no manual edit needed)

## Performance & Cache Busting

**Cache Busting**
- Files change infrequently; query parameters track versions:
  ```html
  <link href="styles.css?newv52" rel="stylesheet">
  <script src="script.js?newv5_c12" defer></script>
  ```
- Increment query param when making CSS/JS changes (e.g., `?newv53`)

**Image Optimization**
- Use WebP format (modern browsers) with PNG fallback
- Mark above-the-fold images with `fetchpriority="high"`
- Preload hero images and fonts in `<head>`

**Minimal JavaScript**
- Only essential interactivity (scroll behavior, announcements, API calls)
- Gracefully degrades if GitHub API fails (hardcoded fallback versions)
- All external resources via CDN (Normalize.css, fonts, analytics, Octokit)

## Deployment & Development

**No Local Build Needed**
- Files are deployed directly from git to FTP server
- GitHub Action: `SamKirkland/FTP-Deploy-Action@v4.3.0`
- Trigger: Push to `master` branch

**Development**
- Edit files locally → test in browser (no build step)
- Use browser DevTools for responsive design testing (700px breakpoint)
- Preview images in WebP + PNG format

**Analytics**
- Simple Analytics (privacy-focused)  
- Script loaded from `https://scripts.simpleanalyticscdn.com`
- No performance impact (async load)

## Quick Editing Checklist

When modifying pages or content:

- [ ] Use CSS variables for colors (never hardcode hex)
- [ ] Responsive design: test at 700px breakpoint
- [ ] Images: WebP + PNG fallback in `<picture>` elements
- [ ] Links: Relative paths (e.g., `/blog/post/`)
- [ ] Headings: Add `id=""` for accessibility + TOC
- [ ] Cache bust: Increment query param on CSS/JS changes
- [ ] Preload: Critical fonts/images with `fetchpriority="high"`
- [ ] Scripts: Use `defer` attribute
- [ ] Semantic HTML: Use `<main>`, `<article>`, etc.

## Common Workflows

**Update homepage announcement**
```bash
# Edit /live-information.json with new announcement object
```

**Add new blog post**
```bash
# Create /blog/your-post-slug/index.html with full boilerplate
# Add entry to /blog/index.html landing page
```

**Fix styling across all pages**
```bash
# Edit /assets/common.css for shared styles
# Or /assets/m3/colors.css for M3 design tokens
# Increment query param on link tags (e.g., ?newv53)
```

**New page in existing section**
```bash
# Create /section/page-name/index.html
# Copy structure from sibling pages in that section
# Add link from parent section index
```
