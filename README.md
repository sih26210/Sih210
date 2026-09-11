# PDS e-Services Portal — Phase 1

A functional, responsive prototype of a Public Distribution System (PDS) citizen
portal, built as a plain HTML/CSS/JavaScript single-page application (no build
step, no framework required).

## Running locally

You need any static file server (the app uses ES modules, so it must be served
over HTTP — opening index.html directly via `file://` will not work).

**Option A — Python (built into most systems):**
```
cd pds-portal
python3 -m http.server 8080
```
Then open http://localhost:8080 in your browser.

**Option B — Node (if you have it installed):**
```
cd pds-portal
npx serve .
```

**Option C — VS Code:** install the "Live Server" extension, right-click
`index.html`, and choose "Open with Live Server".

## Project structure

```
index.html              Single HTML shell — the app renders into #main-content
css/main.css             Full design system (tokens, components, responsive rules)
js/app.js                 Entry point — registers every route
js/router.js               Minimal hash-based router (#/path)
js/data.js                  Shared content: nav links, service tiles, FAQ, flash news
js/utils.js                  Form validation, toasts, reference-ID/captcha generators
js/components/               Reusable UI: header, footer, page header, accordion
js/pages/                     One file per route/page
```

## What's implemented (Phase 1)

- Home dashboard with all 18+ service tiles
- Citizen Login & Department Login (demo authentication, captcha, validation)
- Register a Complaint, Convert Your Card, Feedback — full forms with validation
  and success states with generated reference numbers
- About PDS, Operations, FAQ (accordion), Contact Us
- 9 informational service pages (Family Card Details, Consumer Awareness Video,
  Smart Card services, SMS Services, etc.)
- Reports hub with placeholder pages for NFSA / PDS / Godown Stock / Hostels
  reports — routes exist and are linked, ready for Phase 2 data
- Fully responsive: desktop, tablet, and mobile, including a working mobile
  navigation menu

## Adding a new page (for Phase 2)

1. Create `js/pages/your-page.js` exporting a `render...(main)` function.
2. Import it in `js/app.js` and call `registerRoute("/your-path", renderYourPage, { title: "..." })`.
3. Link to it with a normal anchor tag: `<a href="#/your-path">`.

Report pages already have placeholder routes registered in `js/app.js` — replace
the call to `renderReportPlaceholder` with your real page renderer when ready.

## Notes

- All phone numbers, emails, and statistics are placeholder/demo values.
- No external build tooling is required; fonts are loaded from Google Fonts CDN
  (falls back to system fonts if offline).
