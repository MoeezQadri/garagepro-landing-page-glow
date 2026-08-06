# Add Google Analytics / Google Tag Manager to GaragePro

Goal: Track page views and key conversion events on the GaragePro landing page without adding a backend.

## Two approaches

### Approach 1: Lovable Google Analytics connector (recommended for simple tracking)

Best if you just want page-view analytics and simple event tracking. Lovable provides a managed GA4 connector; no manual script injection needed.

What we would do:
1. Connect the Google Analytics connector via Lovable's connector UI.
2. Lovable injects `VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY` as a project env var.
3. Initialize `gtag.js` once at app startup in `src/main.tsx` (or a new `src/lib/analytics.ts`) using the injected Measurement ID.
4. Track the initial page load automatically and send `page_view` events on route changes (if routes are added later).
5. Track conversion events on key CTAs:
   - "Book a live walkthrough" click → `gtag('event', 'book_demo_click')`
   - "Start free trial" click → `gtag('event', 'start_trial_click', { plan })`
   - "Subscribe" plan clicks → `gtag('event', 'select_plan_click', { plan })`

Pros: No manual Measurement ID to store in code; managed by Lovable. Cons: Does not include Google Tag Manager itself.

### Approach 2: Manual Google Tag Manager + GA4 (recommended if you already have a GTM container)

Best if you want GTM's tag/pixel management, custom triggers, or multiple marketing pixels.

What we would do:
1. Add the GTM container snippet to `index.html` right after `<head>` opens, plus the `<noscript>` fallback after `<body>` opens.
2. Create a small `src/lib/analytics.ts` helper that wraps `window.dataLayer.push`.
3. Fire a `page_view` event on app startup.
4. Fire custom events from the same CTAs as above using `dataLayer` pushes so GTM can route them to GA4, Meta Pixel, etc.

Pros: Full GTM flexibility. Cons: You need your own GTM container ID and must keep it in the build (public string, so it's safe to store in `index.html` or an env var).

## What I need from you

- Which approach do you prefer?
- If Approach 1: do you have a Google Analytics 4 property already, or do you need help creating one?
- If Approach 2: what is your GTM container ID (format `GTM-XXXXXXX`)?
- Any extra events beyond the CTA clicks listed above that you want to track?

## Estimated scope

One file addition (`src/lib/analytics.ts`) and minor edits to `index.html` or `src/main.tsx`, plus CTA event handlers. No backend changes.
