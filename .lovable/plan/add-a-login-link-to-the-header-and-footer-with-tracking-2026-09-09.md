# Add a Login link to the header and footer with tracking

## What to add
Add a "Login" link that points to `https://app.mygaragepro.co/auth/login` in the top navigation and the footer, styled to match the existing links, and fire a custom GA4/Google Ads event named `login_page_click` when it is clicked.

## Why this way
The link is part of the main conversion flow (visitor → app login → sign up), so it should be visible where users look for the product entry points. Centralizing the URL in `src/lib/links.ts` keeps it consistent, and using the existing `trackCta` helper keeps the tracking pattern identical to the other CTAs.

## Plan

### 1. Centralize the login URL
In `src/lib/links.ts`, add:
```ts
export const LOGIN_URL = "https://app.mygaragepro.co/auth/login";
```

### 2. Top navigation (`src/components/layout/Navbar.tsx`)

Desktop (md and up):
- Add a "Login" text link between the existing Blog link and the "Start Free" button.
- Use the same `text-sm font-medium text-foreground/80 hover:text-primary` classes as the other nav links.
- On click, fire:
  ```ts
  trackCta("Login", { location: "navbar", destination: "login" }, "login_page_click");
  ```
- Open in a new tab (`target="_blank" rel="noopener noreferrer"`) to keep the landing page available.

Mobile/tablet (below md, inside the hamburger menu):
- Add the same "Login" link between the Blog link and the "Start Free" button.
- Use the same mobile menu link style (`px-4 py-2 text-foreground/80 hover:bg-muted rounded-md`).
- Clicking it closes the mobile menu and fires:
  ```ts
  trackCta("Login", { location: "navbar_mobile", destination: "login" }, "login_page_click");
  ```
- Tablet viewport uses the same hamburger menu as mobile because the breakpoint is `md` (768 px).

### 3. Footer (`src/components/sections/Footer.tsx`)
- Add a "Login" link under the **More** column, above or below the Blog link.
- Use the same `text-mint-300 hover:text-white transition-colors` style as the other footer links.
- Open in a new tab.
- On click, fire:
  ```ts
  trackCta("Login", { location: "footer", destination: "login" }, "login_page_click");
  ```

### 4. No Google Ads conversion event needed
The requested event is `login_page_click`, which maps cleanly to a GA4 custom event via `trackCta`. No separate `trackConversion()` call is needed unless the user later wants to optimize Google Ads toward logins.

### 5. Verification
- Run the dev preview.
- Check that the Login link appears on desktop, inside the mobile menu, and in the footer.
- Open the browser console / network panel and confirm that clicking each Login link pushes an event to `dataLayer` with:
  - `event | login_page_click`
  - `ep.label = Login`
  - `ep.location = navbar | navbar_mobile | footer`
  - `ep.destination = login`

## Files touched
- `src/lib/links.ts` — add `LOGIN_URL`.
- `src/components/layout/Navbar.tsx` — add Login link for desktop and mobile.
- `src/components/sections/Footer.tsx` — add Login link in the More column.

No backend or routing changes are needed; the link is an external anchor.
