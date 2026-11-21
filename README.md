# Eremax — Quiz Funnel

Static quiz funnel (HTML/CSS/JS, no build step) for a men's performance supplement.
Design, flow and mechanics modeled on a 16-step quiz funnel: beige/gold layout, Black Friday bar with a 2h per-visitor countdown,
age cards with photos, icon options, social-proof grid, profile summary with level slider, 12-week chart,
and a final loading step with Yes/No pop-ups before **Submit** redirects to the offer.

## Files
- `index.html` — the quiz
- `offer.html` — offer page (3 packages, guarantee, FAQ) — default Submit destination
- `config.js` — **everything you edit**: brand, social-proof number, redirect URL, images, packages/prices/checkout links
- `assets.js` — built-in SVG illustrations and line icons (fallbacks)
- `script.js` / `style.css` — logic and design
- `images/` — put your photos here (see `images/README.md`)
- `legal/` — placeholder policies

## Flow
1 Age (photo grid) · 2 Biggest frustration (icons) · 3 "You're not alone" · 4 Anxiety · 5 When it started ·
6 Desired results (multi) · 7 Social proof (4 photos) · 8 Relationship · 9 Sex life · 10 What you've tried ·
11 Motivational + transformation image · 12 Morning erections (Why we ask) · 13 Stress (Why we ask) ·
14 Profile summary (level calculated from answers) · 15 12-week chart · 16 Loading + 3 Yes/No pop-ups → Submit

## Before going live
1. `config.js` → `redirectUrl` (your product/checkout page, or keep `offer.html`) and `packages[].checkoutUrl` + prices.
2. `config.js` → `customersCount` — only a number you can back up.
3. Add your images to `images/`.
4. Replace `legal/*.html` placeholders.
5. Paste Pixel / GTM / RedTrack scripts in the `<head>` of `index.html` and `offer.html`.

UTM and click-id params on the quiz URL are passed to the redirect and to every checkout link.

## Events (dataLayer + fbq)
`quiz_step_view`, `quiz_answer`, `quiz_complete`, `quiz_submit`, `checkout_click` (+ Meta `InitiateCheckout` on offer clicks).

## Deploy
Cloudflare Pages (no build command, output `/`), Netlify, Vercel or GitHub Pages.
