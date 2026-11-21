# Eremax — Quiz Funnel

Static quiz funnel (HTML/CSS/JS, no build step) for a men's performance supplement. Modeled on the structure of a 10-question quiz funnel → loading → personalized result → 12-week plan → offer page.

## Flow
1. Age
2. Biggest frustration
3. *Interstitial:* "You're not alone"
4. Anxiety before/during sex
5. When changes started
6. Desired results (multi-select)
7. *Interstitial:* social proof
8. Relationship status
9. Current sex life
10. What you've tried (multi-select)
11. *Interstitial:* why most solutions fall short
12. Morning erections ("Why we ask")
13. Stress level ("Why we ask")
14. Loading / analysis animation
15. Result — level (Low / Normal / Medium / High) **calculated from the answers**
16. 12-week plan with a real goal date
17. Offer — 3 packages, guarantee, FAQ

## Edit before going live — `config.js`
- `packages[].checkoutUrl` — your checkout links (BuyGoods/Shopify/etc). UTM and click-id params from the landing URL are passed through to checkout automatically (`passQueryParamsToCheckout`).
- `packages[].price / oldPrice / perUnit` — pricing.
- `customersCount` — only use a number you can back up.
- `countdownMinutes` — per-session countdown in the top bar.

Also:
- `script.js` → the "proof" screen has placeholders for **real, verified** reviews.
- `legal/*.html` → replace the placeholder policies and company details.
- `index.html` → paste Pixel / GTM / RedTrack scripts in `<head>`.

## Events fired
`QuizStep`, `QuizComplete`, `ViewOffer`, `InitiateCheckoutClick` — sent to `fbq` (if present) and `dataLayer`.

## Deploy
Any static host: Cloudflare Pages (build command empty, output `/`), Netlify, Vercel or GitHub Pages.
