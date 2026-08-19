import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { seedData, nextInvoiceNumber, SHOP } from "./seed";
import type { Invoice, InvoiceItem, Payment, SandboxData } from "./types";

const STORAGE_KEY = "gp-demo-invoices-v1";

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const uid = () => `x${Math.random().toString(36).slice(2, 9)}`;

interface SandboxContextValue extends SandboxData {
  shop: typeof SHOP;
  /** Invoicing is the only editable area of the demo. */
  createInvoice: (customerId: string, vehicleId: string) => Invoice;
  updateInvoice: (id: string, patch: Partial<Invoice>) => void;
  addItem: (invoiceId: string, item: Omit<InvoiceItem, "id">) => void
  updateItem: (invoiceId: string, itemId: string, patch: Partial<InvoiceItem>) => void;
  removeItem: (invoiceId: string, itemId: string) => void;
  addPayment: (invoiceId: string, payment: Omit<Payment, "id">) => void;
  removePayment: (invoiceId: string, paymentId: string) => void;
  deleteInvoice: (invoiceId: string) => void;
  resetInvoices: () => void;
}

const SandboxContext = createContext<SandboxContextValue | null>(null);

function loadInvoices(): Invoice[] {
  if (typeof window === "undefined") return clone(seedData.invoices);
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return clone(seedData.invoices);
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length) return parsed as Invoice[];
  } catch {
    /* fall through to seed */
  }
  return clone(seedData.invoices);
}

export const SandboxProvider = ({ children }: { children: React.ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(() => loadInvoices());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    } catch {
      /* storage unavailable — demo still works in memory */
    }
  }, [invoices]);

  const patchInvoice = useCallback((id: string, updater: (inv: Invoice) => Invoice) => {
    setInvoices((prev) => prev.map((inv) => (inv.id === id ? updater(inv) : inv)));
  }, []);

  const value = useMemo<SandboxContextValue>(() => {
    return {
      ...seedData,
      invoices,
      shop: SHOP,
      createInvoice: (customerId, vehicleId) => {
        const now = new Date();
        const due = new Date(now);
        due.setDate(due.getDate() + 14);
        const invoice: Invoice = {
          id: uid(),
          number: nextInvoiceNumber(invoices),
          customer_id: customerId,
          vehicle_id: vehicleId,
          status: "open",
          date: now.toISOString(),
          due_date: due.toISOString(),
          notes: "",
          tax_rate: SHOP.taxRate,
          discount_type: "none",
          discount_value: 0,
          items: [],
          payments: [],
        };
        setInvoices((prev) => [invoice, ...prev]);
        return invoice;
      },
      updateInvoice: (id, patch) => patchInvoice(id, (inv) => ({ ...inv, ...patch })),
      addItem: (invoiceId, item) =>
        patchInvoice(invoiceId, (inv) => ({ ...inv, items: [...inv.items, { ...item, id: uid() }] })),
      updateItem: (invoiceId, itemId, patch) =>
        patchInvoice(invoiceId, (inv) => ({
          ...inv,
          items: inv.items.map((it) => (it.id === itemId ? { ...it, ...patch } : it)),
        })),
      removeItem: (invoiceId, itemId) =>
        patchInvoice(invoiceId, (inv) => ({
          ...inv,
          items: inv.items.filter((it) => it.id !== itemId),
        })),
      addPayment: (invoiceId, payment) =>
        patchInvoice(invoiceId, (inv) => ({
          ...inv,
          payments: [...inv.payments, { ...payment, id: uid() }],
        })),
      removePayment: (invoiceId, paymentId) =>
        patchInvoice(invoiceId, (inv) => ({
          ...inv,
          payments: inv.payments.filter((p) => p.id !== paymentId),
        })),
      deleteInvoice: (invoiceId) => setInvoices((prev) => prev.filter((i) => i.id !== invoiceId)),
      resetInvoices: () => setInvoices(clone(seedData.invoices)),
    };
  }, [invoices, patchInvoice]);

  return <SandboxContext.Provider value={value}>{children}</SandboxContext.Provider>;
};

export function useSandbox() {
  const ctx = useContext(SandboxContext);
  if (!ctx) throw new Error("useSandbox must be used inside SandboxProvider");
  return ctx;
}

export function useSandboxLookups() {
  const { customers, vehicles, mechanics } = useSandbox();
  return useMemo(
    () => ({
      customerName: (id: string) => customers.find((c) => c.id === id)?.name ?? "Unknown customer",
      customer: (id: string) => customers.find((c) => c.id === id),
      vehicle: (id: string) => vehicles.find((v) => v.id === id),
      vehicleLabel: (id: string) => {
        const v = vehicles.find((x) => x.id === id);
        return v ? `${v.year} ${v.make} ${v.model} · ${v.license_plate}` : "Unknown vehicle";
      },
      mechanicName: (id: string | null) =>
        mechanics.find((m) => m.id === id)?.name ?? "Unassigned",
    }),
    [customers, vehicles, mechanics]
  );
}