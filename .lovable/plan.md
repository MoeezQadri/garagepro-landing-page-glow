# Interactive Demo Sandbox at /demo

A no-login, in-browser replica of the real GaragePro app (the `wrench-flow-pro` project), seeded with sample shop data. Visitors explore the dashboard, invoices, customers, vehicles and tasks and build an invoice end to end; the email gate appears when they try to download or send it.

## Matching the real app

The sandbox mirrors the actual app rather than inventing new UI:

- **Shell**: dark collapsible sidebar + 16px-high top bar with GaragePro logo, exactly like the app's `Layout` / `AppSidebar`.
- **Theme**: the app's own tokens — cool blue-gray background (`210 40% 98%`), near-black primary, `0.5rem` radius, dark sidebar (`0 0% 7%`), plus its status-badge colors for open / in-progress / completed / paid.
- **Icons**: lucide, as in the app (the landing page keeps Phosphor; the sandbox is visually its own app surface).
- **Navigation** (same items and order as the app, trimmed to what makes sense unauthenticated): Dashboard, Invoices, Customers, Vehicles, Tasks, Mechanics, Parts.
- **Components**: metric cards, revenue chart, searchable/sortable invoice table with status filter, and an invoice form with customer/vehicle selection, parts + labour item rows, and a payments section — matching the real `Dashboard`, `Invoices` and `InvoiceForm` layouts.

Because the landing page's own theme (forest green, Archivo Black, rounded-full buttons) differs from the app, the sandbox renders inside a scoped theme wrapper so the app look is faithful without disturbing the marketing pages.

## What the visitor experiences

1. Lands on `/demo` — short marketing intro and a "Launch the demo shop" button, then the full-width sandbox.
2. A persistent banner: "Demo shop with sample data — invoicing is fully playable, everything else is a preview. Reset invoices / Start free trial".
3. Seeded data: ~8 customers, 10 vehicles, 12 invoices across statuses, 10 tasks, 4 mechanics, ~25 parts, and enough history for the dashboard metrics and revenue chart to look real.
4. **Invoicing is the only editable area.** Visitors can create an invoice, pick a customer and vehicle, add and remove parts and labour rows, change quantities, rates, hours, tax and discount, record a payment, and watch totals recalculate — same form and math as the real app.
5. **Everything else is a locked read-only preview.** Dashboard, Customers, Vehicles, Tasks, Mechanics and Parts render with the sample data, but every input and action button (Add, Edit, Delete, status change) is disabled. Clicking or hovering a locked control shows "Available in the full version — start your free trial", and locked pages carry a subtle "Preview only" badge in the page header. Read-only search and sorting stay enabled so the previews still feel alive.
6. Invoice edits persist in `localStorage` for that browser; "Reset invoices" restores the seed. Nothing else is mutable, so nothing else needs resetting.
7. On **Download PDF** or **Send to customer**, the gate dialog asks for name, email, shop name, optional phone. After submitting, the print-styled invoice opens for save/print, and the gate is remembered so it doesn't reappear.

## Lead capture

This project is already connected to your Supabase project, so leads go there. One new table `demo_leads` (name, email, shop name, phone, source, created_at) with insert-only public access — anyone can submit, nothing readable from the browser. You'll view leads in the Supabase dashboard.

GA events: `demo_start`, `demo_invoice_created`, `demo_lead_submit` (plus existing CTA tracking on the sandbox's "Start free trial" buttons).

## SEO

- `/demo` gets its own title/description via the existing Helmet setup, targeted at "auto repair invoicing software demo", with real intro copy above the sandbox.
- Added to `public/sitemap.xml` through the existing generator.
- Linked from the nav, the homepage Demo section (under the video), and the final CTA.

## Technical notes

- Route `/demo` in `src/App.tsx`; page `src/pages/Demo.tsx`.
- `src/features/demo/`: `seed.ts`, `types.ts`, `useSandbox.tsx` (reducer + localStorage + reset), `invoiceCalc.ts` (ported from the app's `calculateInvoiceBreakdown` so totals match production).
- `src/features/demo/components/`: `SandboxShell`, `SandboxSidebar`, `DashboardView`, `InvoicesView`, `InvoiceEditor`, `InvoicePreview`, `CustomersView`, `VehiclesView`, `TasksView`, `MechanicsView`, `PartsView`, `LeadGateDialog`.
- Reuses existing shadcn primitives already in this project (sidebar, table, tabs, dialog, select, chart) — copying only the app's token values and layout structure, not its data layer.
- Sandbox tokens defined as a scoped `.gp-app` block in `src/index.css`; no hardcoded color utilities.
- PDF via browser print against a print-styled invoice preview.
- New Supabase table via migration with explicit grants and an `anon` insert-only RLS policy; submitted with the existing anon client.

## Out of scope

- Connecting to the real app's database or API — this is a faithful mock with local sample data.
- Auth, subscriptions, superadmin, reports and settings screens from the real app.
- Actually emailing the invoice (the button explains it's simulated in the demo).
