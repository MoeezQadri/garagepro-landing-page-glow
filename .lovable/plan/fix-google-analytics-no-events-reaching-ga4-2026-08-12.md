# Fix Google Analytics: no events reaching GA4

## What I found

I loaded the live preview and watched the network + GA queue:

- The GA script loads fine (`gtag/js?id=G-F2JSW9BNC0`), and the env var is configured.
- Clicks do queue an event (`event | cta_click | {label, location, destination}` appeared after clicking "Start Free").
- **But zero requests are ever sent to Google Analytics** — no `page_view`, no `cta_click`, no `/collect` call at all. `window.gtag` is also `undefined`.

Cause: `src/lib/analytics.ts` pushes a plain **array** into `dataLayer` (`window.dataLayer.push(args)`). Google's gtag.js only executes commands pushed as an `arguments` object, so every command — including `js` and `config` — is silently ignored. Nothing is dropped by GA; it never gets sent. That's why the header "Start Free" and all other buttons look untracked.

## The fix

Rewrite the gtag bridge in `src/lib/analytics.ts` to use the canonical snippet shape:

- Define `window.gtag` as a real function that does `window.dataLayer.push(arguments)` (not an array).
- Keep `initAnalytics()`, `trackEvent()`, and `trackCta()` signatures unchanged, so the existing tracking calls in Navbar, Hero, Demo, Pricing, Final CTA and Footer keep working untouched.
- Push `js`/`config` through the same function so the initial page view fires.

## Verification

Re-run the browser check after the fix and confirm:
- A `google-analytics.com/g/collect` request with `en=page_view` on load.
- A second `/collect` with `en=cta_click` and `ep.label=Start Free`, `ep.location=navbar` when the header button is clicked.
- Spot-check one pricing button fires `select_plan_click` with its plan and billing values.

No content, layout, or link changes — only the analytics bridge.
