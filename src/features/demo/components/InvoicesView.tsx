import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, SortAsc, SortDesc, Trash2 } from "lucide-react";
import { useSandbox, useSandboxLookups } from "../useSandbox";
import { calculateInvoiceBreakdown, formatCurrency } from "../invoiceCalc";
import { StatusBadge } from "../statusBadge";
import { PageHeader } from "./LockedControl";
import { trackEvent } from "@/lib/analytics";

const InvoicesView = ({ onOpen }: { onOpen: (id: string) => void }) => {
  const sandbox = useSandbox();
  const { customerName, vehicleLabel } = useSandboxLookups();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [desc, setDesc] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newCustomer, setNewCustomer] = useState("");
  const [newVehicle, setNewVehicle] = useState("");

  const rows = useMemo(() => {
    return sandbox.invoices
      .filter((inv) => {
        const haystack = `${inv.number} ${customerName(inv.customer_id)}`.toLowerCase();
        const matchesSearch = haystack.includes(search.toLowerCase());
        const matchesStatus = status === "all" || inv.status === status;
        return matchesSearch && matchesStatus;
      })
      .slice()
      .sort((a, b) =>
        desc
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }, [sandbox.invoices, search, status, desc, customerName]);

  const customerVehicles = sandbox.vehicles.filter((v) => v.customer_id === newCustomer);

  const create = () => {
    if (!newCustomer || !newVehicle) return;
    const invoice = sandbox.createInvoice(newCustomer, newVehicle);
    trackEvent("demo_invoice_created", { label: invoice.number });
    setCreating(false);
    setNewCustomer("");
    setNewVehicle("");
    onOpen(invoice.id);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        subtitle="Fully editable in this demo — build one from scratch and price it up"
        actions={
          <Button size="sm" onClick={() => setCreating(true)}>
            <Plus className="mr-2 h-4 w-4" /> New invoice
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by invoice or customer…"
            className="pl-9"
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={() => setDesc((d) => !d)} aria-label="Toggle sort">
          {desc ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((inv) => {
              const b = calculateInvoiceBreakdown(inv);
              return (
                <TableRow
                  key={inv.id}
                  className="cursor-pointer"
                  onClick={() => onOpen(inv.id)}
                >
                  <TableCell className="font-medium">{inv.number}</TableCell>
                  <TableCell>{customerName(inv.customer_id)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {vehicleLabel(inv.vehicle_id)}
                  </TableCell>
                  <TableCell>{new Date(inv.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <StatusBadge status={inv.status} />
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(b.total)}</TableCell>
                  <TableCell className="text-right">
                    {b.balanceDue > 0.01 ? formatCurrency(b.balanceDue) : "—"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Delete invoice"
                      onClick={(e) => {
                        e.stopPropagation();
                        sandbox.deleteInvoice(inv.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-sm text-muted-foreground">
                  No invoices match those filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New invoice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Customer</Label>
              <Select
                value={newCustomer}
                onValueChange={(v) => {
                  setNewCustomer(v);
                  setNewVehicle("");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer…" />
                </SelectTrigger>
                <SelectContent>
                  {sandbox.customers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Vehicle</Label>
              <Select value={newVehicle} onValueChange={setNewVehicle} disabled={!newCustomer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle…" />
                </SelectTrigger>
                <SelectContent>
                  {customerVehicles.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.year} {v.make} {v.model} · {v.license_plate}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={create} disabled={!newCustomer || !newVehicle}>
              Create invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoicesView;