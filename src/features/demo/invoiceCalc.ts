import type { Invoice } from "./types";

export interface InvoiceBreakdown {
  subtotal: number;
  partsTotal: number;
  laborTotal: number;
  discountAmount: number;
  afterDiscount: number;
  taxAmount: number;
  total: number;
  paidAmount: number;
  balanceDue: number;
}

/** Mirrors the production app's calculateInvoiceBreakdown so demo totals match the real thing. */
export function calculateInvoiceBreakdown(invoice: Invoice): InvoiceBreakdown {
  const items = invoice.items ?? [];
  const partsTotal = items
    .filter((i) => i.type === "part")
    .reduce((sum, i) => sum + i.quantity * i.price, 0);
  const laborTotal = items
    .filter((i) => i.type === "labor")
    .reduce((sum, i) => sum + i.quantity * i.price, 0);
  const subtotal = partsTotal + laborTotal;

  let discountAmount = 0;
  if (invoice.discount_type === "percentage" && invoice.discount_value) {
    discountAmount = subtotal * (invoice.discount_value / 100);
  } else if (invoice.discount_type === "fixed" && invoice.discount_value) {
    discountAmount = invoice.discount_value;
  }

  const afterDiscount = Math.max(subtotal - discountAmount, 0);
  const taxAmount = afterDiscount * ((invoice.tax_rate || 0) / 100);
  const total = afterDiscount + taxAmount;
  const paidAmount = (invoice.payments ?? []).reduce((sum, p) => sum + p.amount, 0);

  return {
    subtotal,
    partsTotal,
    laborTotal,
    discountAmount,
    afterDiscount,
    taxAmount,
    total,
    paidAmount,
    balanceDue: total - paidAmount,
  };
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Number.isFinite(value) ? value : 0
  );