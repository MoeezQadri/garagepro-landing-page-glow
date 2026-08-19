import { calculateInvoiceBreakdown, formatCurrency } from "./invoiceCalc";
import { SHOP } from "./seed";
import type { Customer, Invoice, Vehicle } from "./types";

export function printInvoice(invoice: Invoice, customer?: Customer, vehicle?: Vehicle) {
  const b = calculateInvoiceBreakdown(invoice);
  const rows = invoice.items
    .map(
      (i) => `<tr>
        <td>${i.description}</td>
        <td class="c">${i.type === "labor" ? "Labour" : "Part"}</td>
        <td class="r">${i.quantity}</td>
        <td class="r">${formatCurrency(i.price)}</td>
        <td class="r">${formatCurrency(i.quantity * i.price)}</td>
      </tr>`
    )
    .join("");

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${invoice.number}</title>
<style>
  body{font-family:ui-sans-serif,system-ui,sans-serif;color:#111;margin:40px;font-size:13px}
  h1{font-size:22px;margin:0 0 4px}
  .muted{color:#666}
  .head{display:flex;justify-content:space-between;margin-bottom:28px}
  table{width:100%;border-collapse:collapse;margin-top:12px}
  th,td{padding:8px 6px;border-bottom:1px solid #e5e5e5;text-align:left}
  th{font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:#666}
  .r{text-align:right}.c{text-align:center}
  .totals{margin-top:18px;margin-left:auto;width:280px}
  .totals div{display:flex;justify-content:space-between;padding:4px 0}
  .totals .grand{border-top:2px solid #111;font-weight:700;font-size:15px;margin-top:6px;padding-top:8px}
  .demo{margin-top:36px;padding:10px 12px;border:1px dashed #999;color:#666;font-size:11px}
</style></head>
<body>
  <div class="head">
    <div>
      <h1>${SHOP.name}</h1>
      <div class="muted">${SHOP.address}<br/>${SHOP.phone} · ${SHOP.email}</div>
    </div>
    <div class="r">
      <h1>${invoice.number}</h1>
      <div class="muted">
        Issued ${new Date(invoice.date).toLocaleDateString()}<br/>
        Due ${new Date(invoice.due_date).toLocaleDateString()}
      </div>
    </div>
  </div>
  <div class="head">
    <div>
      <strong>Billed to</strong><br/>
      ${customer?.name ?? "—"}<br/>
      <span class="muted">${customer?.address ?? ""}<br/>${customer?.phone ?? ""}</span>
    </div>
    <div>
      <strong>Vehicle</strong><br/>
      ${vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : "—"}<br/>
      <span class="muted">${vehicle?.license_plate ?? ""} · VIN ${vehicle?.vin ?? "—"}</span>
    </div>
  </div>
  <table>
    <thead><tr><th>Description</th><th class="c">Type</th><th class="r">Qty / hrs</th><th class="r">Rate</th><th class="r">Amount</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="5" class="muted">No line items</td></tr>'}</tbody>
  </table>
  <div class="totals">
    <div><span class="muted">Parts</span><span>${formatCurrency(b.partsTotal)}</span></div>
    <div><span class="muted">Labour</span><span>${formatCurrency(b.laborTotal)}</span></div>
    <div><span class="muted">Subtotal</span><span>${formatCurrency(b.subtotal)}</span></div>
    ${b.discountAmount ? `<div><span class="muted">Discount</span><span>-${formatCurrency(b.discountAmount)}</span></div>` : ""}
    <div><span class="muted">Tax (${invoice.tax_rate}%)</span><span>${formatCurrency(b.taxAmount)}</span></div>
    <div class="grand"><span>Total</span><span>${formatCurrency(b.total)}</span></div>
    <div><span class="muted">Paid</span><span>${formatCurrency(b.paidAmount)}</span></div>
    <div><strong>Balance due</strong><strong>${formatCurrency(b.balanceDue)}</strong></div>
  </div>
  ${invoice.notes ? `<p class="muted" style="margin-top:24px"><strong>Notes:</strong> ${invoice.notes}</p>` : ""}
  <div class="demo">Sample invoice generated in the GaragePro interactive demo — not a real transaction.</div>
  <script>window.onload=()=>{window.print()}</script>
</body></html>`;

  const win = window.open("", "_blank", "width=900,height=1000");
  if (!win) return false;
  win.document.write(html);
  win.document.close();
  return true;
}