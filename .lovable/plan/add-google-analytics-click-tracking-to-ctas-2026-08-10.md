# Add Google Analytics click tracking to CTAs

## Current state
`src/lib/analytics.ts` initializes GA4 and exposes `trackEvent`, and `src/main.tsx` calls `initAnalytics()` on startup. `trackEvent` is not called anywhere in the app, so GA4 currently records page views only — no button or link clicks, and no labels.

## What to add
Attach a click handler to every conversion CTA, sending a GA4 event with consistent, readable labels.

| Location | Button | Event | Params |
| --- | --- | --- | --- |
| Navbar (desktop + mobile) | Start Free | `cta_click` | `location: navbar`, `label: Start Free`, `destination: subscribe` |
| Hero | Start Free — 14 Days, Full Access | `cta_click` | `location: hero`, `label: Start Free Trial`, `destination: subscribe` |
| Hero | See Pricing | `cta_click` | `location: hero`, `label: See Pricing`, `destination: #pricing` |
| Demo | Book a Live Walkthrough | `book_demo_click` | `location: demo`, `label: Book a Live Walkthrough` |
| Demo | Or start your 14-day free trial | `cta_click` | `location: demo`, `label: Start Free Trial` |
| Pricing (4 cards) | Start Free Trial / Get Started | `select_plan_click` | `location: pricing`, `plan: free/basic/professional/enterprise`, `billing: monthly/annual`, `label: <button text>` |
| Final CTA | Start Free — 14 Days, Full Access | `cta_click` | `location: final_cta`, `label: Start Free Trial` |
| Footer | any subscribe/Calendly/blog links present | `cta_click` | `location: footer`, `label: <link text>` |

Also track the demo video engagement (`video_play` on first play) and Blog link clicks (`outbound_click` with `destination: blog`).

## Technical notes
- Add a small `trackCta(label, params)` helper in `src/lib/analytics.ts` so labels stay uniform; keep the existing `trackEvent` as the base.
- Events fire via `onClick` on the anchors; links keep `target="_blank"` so navigation is unaffected and no `preventDefault` or delay is needed.
- Labels are hardcoded strings matching visible button text, not derived from DOM text, so GA reports stay stable if copy changes.
- Files touched: `src/lib/analytics.ts`, `Navbar.tsx`, `HeroSection.tsx`, `DemoSection.tsx`, `PricingSection.tsx`, `FinalCTASection.tsx`, `Footer.tsx`. No backend changes.
- Verification: run the preview and confirm `dataLayer` receives the events on click.
