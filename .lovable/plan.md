# Interactive Demo Sandbox at /demo

A no-login, in-browser mini GaragePro workspace where visitors play with realistic sample data — job board, invoicing, customers and vehicles — and hit an email gate when they try to download or send the finished invoice.

## What the visitor experiences

1. Lands on `/demo` (linked from the nav, the Demo section under the video, and the final CTA).
2. Sees a seeded shop: ~6 customers, 8 vehicles, 6 jobs across statuses, 3 existing invoices.
3. A sandbox banner: "You're in a live demo. Nothing is saved to a real shop. Reset data / Start free trial".
4. Four tabs inside the workspace:
   - **Dashboard** — jobs in progress, unpaid invoice total, today's bookings, revenue-this-week tiles.
   - **Job Board** — columns (Booked / In Progress / Awaiting Parts / Ready / Collected), cards moved via a status dropdown and drag-and-drop, "Add job" form.
   - **Invoicing** — invoice list, "Create invoice from job", line-item editor (parts + labour hours × rate), tax/discount, live totals, printable invoice preview with GaragePro branding.
   - **Customers** — customer/vehicle list with service history, add/edit.
5. Everything is editable and persists in `localStorage` for that browser; "Reset demo data" restores the seed.
6. On **Download PDF** or **Send to customer** the email gate appears: name, email, shop name, optional phone. After submitting, the invoice preview opens in a print/save dialog and the lead is stored.

## Lead capture

The gate needs a backend, so this plan enables **Lovable Cloud** for this project (the site is otherwise static). It adds one table, `demo_leads` (name, email, shop name, phone, source page, timestamp), with insert-only public access — anyone can submit, nobody can read from the browser. Leads are viewable in the backend dashboard. Once an email is submitted it's remembered locally so the gate doesn't reappear.

A GA event fires on gate submit (`demo_lead_submit`) plus events for demo start, invoice created, and job moved, so you can see engagement depth.

## SEO and structure

- `/demo` gets its own title/description via the existing Helmet setup, aimed at "auto repair invoicing software demo".
- Added to `public/sitemap.xml` via the existing generator.
- The workspace UI is `noindex`-free but the page is a real indexable page with intro copy above the sandbox.

## Technical notes

- New route `/demo` in `src/App.tsx`, page at `src/pages/Demo.tsx`.
- Sandbox state in `src/features/demo/`: `seed.ts` (sample data), `useSandbox.tsx` (reducer + localStorage persistence, reset), typed models for Customer, Vehicle, Job, Invoice, LineItem.
- UI components under `src/features/demo/components/`: `SandboxShell`, `DashboardTab`, `JobBoardTab`, `InvoicingTab`, `InvoiceEditor`, `InvoicePreview`, `CustomersTab`, `LeadGateDialog`. Built on existing shadcn primitives (tabs, table, dialog, select, input) and current Hard Bento / forest-green tokens — no new colors hardcoded.
- Drag-and-drop via `@dnd-kit/core` (small, already common) with a dropdown fallback for touch.
- Invoice PDF uses the browser print dialog against a print-styled preview — no PDF library needed.
- Lovable Cloud enabled; `demo_leads` table with RLS insert policy for `anon` plus explicit grants; insert called from the gate dialog.

## Out of scope

- Real GaragePro app data or API connection — this is a faithful mock, not the live product.
- Email delivery of the invoice to the sample customer (button explains it's simulated).
