import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Download, Plus, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useSandbox, useSandboxLookups } from "../useSandbox";
import { calculateInvoiceBreakdown, formatCurrency } from "../invoiceCalc";
import { printInvoice } from "../printInvoice";
import { StatusBadge } from "../statusBadge";
import LeadGateDialog, { hasPassedGate } from "./LeadGateDialog";
import type { InvoiceStatus, Payment } from "../types";
import { trackEvent } from "@/lib/analytics";

const InvoiceEditor = ({ invoiceId, onBack }: { invoiceId: string; onBack: () => void }) => {
  const sandbox = useSandbox();
  const { customer, vehicle, vehicleLabel } = useSandboxLookups();
  const invoice = sandbox.invoices.find((i) => i.id === invoiceId);

  const [partId, setPartId] = useState<string>("");
  const [mechanicId, setMechanicId] = useState<string>("");
  const [laborHours, setLaborHours] = useState("1");
  const [payment, setPayment] = useState({ amount: "", method: "card" as Payment["method"] });
  const [gate, setGate] = useState<null | "download" | "send">(null);

  if (!invoice) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">That invoice no longer exists in your demo shop.</p>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to invoices
        </Button>
      </div>
    );
  }

  const breakdown = calculateInvoiceBreakdown(invoice);
  const cust = customer(invoice.customer_id);
  const veh = vehicle(invoice.vehicle_id);

  const addPart = () => {
    const part = sandbox.parts.find((p) => p.id === partId);
    if (!part) return;
    sandbox.addItem(invoice.id, {
      type: "part",
      description: `${part.name} (${part.part_number})`,
      quantity: 1,
      price: part.price,
    });
    setPartId("");
  };

  const addLabor = () => {
    const mech = sandbox.mechanics.find((m) => m.id === mechanicId);
    if (!mech) return;
    const hours = Number(laborHours) || 0;
    if (hours <= 0) return;
    sandbox.addItem(invoice.id, {
      type: "labor",
      description: `Labour — ${mech.name}`,
      quantity: hours,
      price: mech.labor_rate,
    });
    setMechanicId("");
    setLaborHours("1");
  };

  const recordPayment = () => {
    const amount = Number(payment.amount);
    if (!amount || amount <= 0) return;
    sandbox.addPayment(invoice.id, {
      amount,
      method: payment.method,
      date: new Date().toISOString(),
    });
    setPayment({ amount: "", method: payment.method });
    toast.success("Payment recorded");
  };

  const runExport = (action: "download" | "send") => {
    if (!hasPassedGate()) {
      setGate(action);
      return;
    }
    completeExport(action);
  };

  const completeExport = (action: "download" | "send") => {
    const opened = printInvoice(invoice, cust, veh);
    if (!opened) {
      toast.error("Your browser blocked the print window — allow pop-ups and try again.");
      return;
    }
    trackEvent("demo_invoice_export", { label: invoice.number, action });
    if (action === "send") {
      toast.success("In the full version this emails the customer automatically.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-4">
        <div>
          <Button variant="ghost" size="sm" className="-ml-2 mb-1" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Invoices
          </Button>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">{invoice.number}</h2>
            <StatusBadge status={invoice.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {cust?.name} · {vehicleLabel(invoice.vehicle_id)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => runExport("send")}>
            <Send className="mr-2 h-4 w-4" /> Send to customer
          </Button>
          <Button size="sm" onClick={() => runExport("download")}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Line items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-24 text-right">Qty / hrs</TableHead>
                    <TableHead className="w-28 text-right">Rate</TableHead>
                    <TableHead className="w-28 text-right">Amount</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.items.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-sm text-muted-foreground">
                        No line items yet — add a part or labour below.
                      </TableCell>
                    </TableRow>
                  )}
                  {invoice.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          value={item.description}
                          onChange={(e) =>
                            sandbox.updateItem(invoice.id, item.id, { description: e.target.value })
                          }
                          className="h-9"
                        />
                        <span className="mt-1 inline-block text-xs text-muted-foreground">
                          {item.type === "labor" ? "Labour" : "Part"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          value={item.quantity}
                          onChange={(e) =>
                            sandbox.updateItem(invoice.id, item.id, {
                              quantity: Number(e.target.value) || 0,
                            })
                          }
                          className="h-9 text-right"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.price}
                          onChange={(e) =>
                            sandbox.updateItem(invoice.id, item.id, {
                              price: Number(e.target.value) || 0,
                            })
                          }
                          className="h-9 text-right"
                        />
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(item.quantity * item.price)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => sandbox.removeItem(invoice.id, item.id)}
                          aria-label="Remove line item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="grid gap-4 border-t pt-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Add a part from inventory</Label>
                  <div className="flex gap-2">
                    <Select value={partId} onValueChange={setPartId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select part…" />
                      </SelectTrigger>
                      <SelectContent>
                        {sandbox.parts.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name} — {formatCurrency(p.price)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={addPart} disabled={!partId}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Add labour</Label>
                  <div className="flex gap-2">
                    <Select value={mechanicId} onValueChange={setMechanicId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Mechanic…" />
                      </SelectTrigger>
                      <SelectContent>
                        {sandbox.mechanics.map((m) => (
                          <SelectItem key={m.id} value={m.id}>
                            {m.name} — {formatCurrency(m.labor_rate)}/hr
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      step="0.25"
                      min="0"
                      value={laborHours}
                      onChange={(e) => setLaborHours(e.target.value)}
                      className="w-20"
                      aria-label="Hours"
                    />
                    <Button variant="outline" onClick={addLabor} disabled={!mechanicId}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Payments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {invoice.payments.length === 0 ? (
                <p className="text-sm text-muted-foreground">No payments recorded yet.</p>
              ) : (
                <ul className="divide-y">
                  {invoice.payments.map((p) => (
                    <li key={p.id} className="flex items-center justify-between py-2 text-sm">
                      <span>
                        {formatCurrency(p.amount)}{" "}
                        <span className="text-muted-foreground capitalize">
                          · {p.method.replace("-", " ")} · {new Date(p.date).toLocaleDateString()}
                        </span>
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => sandbox.removePayment(invoice.id, p.id)}
                        aria-label="Remove payment"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap items-end gap-2 border-t pt-4">
                <div className="space-y-2">
                  <Label htmlFor="pay-amount">Amount</Label>
                  <Input
                    id="pay-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={payment.amount}
                    onChange={(e) => setPayment((p) => ({ ...p, amount: e.target.value }))}
                    className="w-32"
                    placeholder={breakdown.balanceDue.toFixed(2)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Method</Label>
                  <Select
                    value={payment.method}
                    onValueChange={(v) => setPayment((p) => ({ ...p, method: v as Payment["method"] }))}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["cash", "card", "bank-transfer", "check", "other"].map((m) => (
                        <SelectItem key={m} value={m} className="capitalize">
                          {m.replace("-", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" onClick={recordPayment}>
                  Record payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Invoice details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={invoice.status}
                  onValueChange={(v) =>
                    sandbox.updateInvoice(invoice.id, { status: v as InvoiceStatus })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="tax">Tax rate (%)</Label>
                  <Input
                    id="tax"
                    type="number"
                    step="0.01"
                    min="0"
                    value={invoice.tax_rate}
                    onChange={(e) =>
                      sandbox.updateInvoice(invoice.id, { tax_rate: Number(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due">Due date</Label>
                  <Input
                    id="due"
                    type="date"
                    value={invoice.due_date.slice(0, 10)}
                    onChange={(e) =>
                      sandbox.updateInvoice(invoice.id, {
                        due_date: new Date(e.target.value).toISOString(),
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Discount</Label>
                  <Select
                    value={invoice.discount_type}
                    onValueChange={(v) =>
                      sandbox.updateInvoice(invoice.id, {
                        discount_type: v as typeof invoice.discount_type,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount-value">Value</Label>
                  <Input
                    id="discount-value"
                    type="number"
                    min="0"
                    step="0.01"
                    disabled={invoice.discount_type === "none"}
                    value={invoice.discount_value}
                    onChange={(e) =>
                      sandbox.updateInvoice(invoice.id, {
                        discount_value: Number(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={invoice.notes}
                  onChange={(e) => sandbox.updateInvoice(invoice.id, { notes: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Totals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Parts</span>
                <span>{formatCurrency(breakdown.partsTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Labour</span>
                <span>{formatCurrency(breakdown.laborTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(breakdown.subtotal)}</span>
              </div>
              {breakdown.discountAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span>-{formatCurrency(breakdown.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax ({invoice.tax_rate}%)</span>
                <span>{formatCurrency(breakdown.taxAmount)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-base font-semibold">
                <span>Total</span>
                <span>{formatCurrency(breakdown.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paid</span>
                <span>{formatCurrency(breakdown.paidAmount)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Balance due</span>
                <span>{formatCurrency(breakdown.balanceDue)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <LeadGateDialog
        open={gate !== null}
        action={gate ?? "download"}
        onOpenChange={(open) => !open && setGate(null)}
        onSuccess={() => completeExport(gate ?? "download")}
      />
    </div>
  );
};

export default InvoiceEditor;