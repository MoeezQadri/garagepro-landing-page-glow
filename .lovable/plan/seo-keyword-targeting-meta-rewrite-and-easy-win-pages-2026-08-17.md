# SEO: keyword targeting, meta rewrite, and easy-win pages

## What Semrush shows (US market)

mygaragepro.co has no organic data yet in Semrush — the site is new to Google's index, so the strategy is to pick low-difficulty terms rather than fight head terms.

The head term "auto repair shop software" (880/mo, KD 47) is held by Mitchell 1, ARI, Tekmetric, Shop Boss, Orderry, plus Reddit/Quora/Capterra threads. That's ambitious for a new domain, but it belongs in the homepage title as a secondary phrase.

Competition pattern (Tekmetric): ~50% of their traffic is their own brand name, and their only non-brand wins are utility content (printable vehicle inspection checklist, app roundups) and a `/pricing` page. That is the gap a new site can copy.

Easier targets, by difficulty:

| Keyword | Volume | KD | Why |
|---|---|---|---|
| auto repair estimate software | 390/mo | 17 (easy) | best ratio on the list |
| auto repair invoicing software | 210/mo | 30 | high CPC ($17.51), buyer intent |
| free auto repair shop software | 170/mo | 40 | matches the 14-day full-access trial |
| tekmetric alternative | 30/mo | 0 | tiny volume, near-zero effort, high intent |
| "how shop management software helps auto repair shops" and similar questions | 10-320/mo | ~0 | blog/FAQ fodder |

Terms to avoid for now: "shop management software" (KD 61), "mechanic shop software" (KD 50), and all competitor-brand navigational terms.

## Plan

### 1. Rewrite homepage meta in `index.html`

- Title (58 chars): `Auto Repair Shop Software with Invoicing & Estimates`-style framing, keeping the brand: **"GaragePro — Auto Repair Shop Software & Invoicing"**
- Description (~150 chars): lead with estimates/invoicing/job board, keep the free-trial hook: "Job board, estimates, invoicing, inventory and technician tracking in one auto repair shop software. Free 14-day trial, no card required."
- Mirror both into `og:title` / `og:description` / `twitter:*`, and add a self-referencing `og:url` + `link rel="canonical"` for `https://mygaragepro.co/`.

### 2. Add on-page keyword coverage to existing sections (copy only)

- Add one H2-level phrasing in the Features area that names "estimates and invoicing" explicitly, so the estimate/invoice keywords have real on-page support.
- Add alt text mentioning the shop-floor job board on the hero image.
- Keep the existing hero H1 as the single H1.

## Technical notes

- Scope is `index.html` head tags plus copy in the existing homepage sections — no new routes, no sitemap changes.
- One cleanup needed to keep the build green: `src/integrations/supabase/client.ts` is a leftover file importing a package that is no longer installed. It will be deleted.
- Static Vite SPA: Helmet tags are read by Google, but social-preview crawlers only see `index.html`'s head — per-route social previews would need SSR.
- No backend work; no `og:image` added (hosting injects one).

## Not included

- New keyword landing pages for estimate/invoicing/free-trial terms, and the sitemap update they would need — deferred at your request.
- Competitor-brand comparison page ("tekmetric alternative") — 30/mo and it invites brand-comparison arguments. Say the word and I'll add it.
- A blog for the question keywords; the blog lives on WordPress at blog.mygaragepro.co.