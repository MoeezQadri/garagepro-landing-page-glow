## Goal
Shift GaragePro from the industrial "Hard Bento" navy/orange look to a minimalist **black & white** theme with **curvy, modern** components, while keeping a photographic hero background under a translucent overlay.

## Design direction
- **Palette:** pure white background (`#ffffff`), near-black foreground (`#0a0a0a`), soft grey borders/muted text (`#f4f4f5`, `#a1a1aa`). Primary = black, primary-foreground = white. No orange, no navy.
- **Typography:** keep Hind for body, but drop the uppercase Archivo Black display in favor of a cleaner heading treatment (still Archivo Black, mixed-case, tighter tracking) for a modern minimal feel.
- **Shape language:** curvy & modern — bump `--radius` from `0.25rem` to `1rem`; buttons become fully rounded (`rounded-full`). Remove hard offset "signage" shadows; replace with soft subtle shadows (`shadow-sm`, `hover:shadow-md`) and thin 1px borders.
- **Hero:** restore a real photo background (reuse `src/assets/hero-shop.jpg`) with a white/black translucent overlay (`bg-white/70` or `bg-black/50` depending on text color) so the image is visible but text stays readable. Dark text on a lightened photo overlay by default.

## Changes
1. **`src/index.css`** — rewrite tokens: white background, black foreground/primary, grey muted/border, larger radius. Remove uppercase + heavy tracking on `h1–h4`. Replace `.feature-card`, `.pricing-card`, `.testimonial-card`, `.btn-signage` with minimal rounded variants (soft border, soft shadow, no hard offset). Simplify `.hero-gradient` (no longer needed) or repurpose.
2. **`tailwind.config.ts`** — remap `mint` and `garage` scales to a neutral greyscale ramp so existing `bg-mint-950`, `text-mint-800`, `border-mint-100`, etc. resolve to black/white/grey without touching every component.
3. **`src/components/sections/gp/HeroSection.tsx`** — set background to `hero-shop.jpg` via `bg-cover` with a translucent white overlay (`bg-white/75 backdrop-blur-sm`) so text stays dark and readable; remove the blueprint grid; make buttons `rounded-full`.
4. **`src/components/layout/Navbar.tsx`** & **`src/components/sections/Footer.tsx`** — white nav with black text, black footer with white text; rounded-full CTA.
5. **Buttons across sections** (`HeroSection`, `FinalCTASection`, `Navbar`, `PricingSection`, `DemoSection`, `Hero.tsx`) — add `rounded-full` and switch to black/white variants via existing primary tokens (no per-component color rewrites needed once tokens change).
6. **Card sections** (`ProblemSection`, `SolutionSection`, `FeaturesSection`, `ByNumbersSection`, `WhyGaragePro`, `PricingSection`, `Testimonials`, `FAQSection`) — inherit new minimal card styling automatically via the updated `.feature-card` / `.pricing-card` / `.testimonial-card` classes plus the remapped `mint` scale. Spot-fix any hard-coded orange/navy accents to black.
7. **Icons** — switch tile fills from navy+orange to black circle with white icon (or vice versa) inside `SolutionSection` and `FeaturesSection`.

## Out of scope
- No copy changes.
- No layout/section reordering.
- Admin panel visuals untouched (functional area).

## Technical notes
- Remapping the `mint`/`garage` Tailwind scales is the cheapest path: every existing `mint-950 → #0a0a0a`, `mint-100 → #f4f4f5`, etc. keeps components working without a sweep.
- Keep hero photo but overlay `bg-white/75` so the picture reads as a soft textured backdrop, not a full image — matches minimalist intent while satisfying "image with transparency over it."
- Verify with a Playwright screenshot at `/` after changes.