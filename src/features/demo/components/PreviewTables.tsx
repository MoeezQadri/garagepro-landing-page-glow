import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useSandbox, useSandboxLookups } from "../useSandbox";
import { formatCurrency } from "../invoiceCalc";
import { StatusBadge } from "../statusBadge";
import { LockedControl, PageHeader } from "./LockedControl";

const RowActions = () => (
  <div className="flex justify-end gap-1">
    <LockedControl>
      <Button variant="ghost" size="icon">
        <Pencil className="h-4 w-4" />
      </Button>
    </LockedControl>
    <LockedControl>
      <Button variant="ghost" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
    </LockedControl>
  </div>
);

const SearchBar = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) => (
  <div className="relative max-w-sm flex-1">
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="pl-9"
    />
  </div>
);

const AddButton = ({ label }: { label: string }) => (
  <LockedControl>
    <Button size="sm">
      <Plus className="mr-2 h-4 w-4" />
      {label}
    </Button>
  </LockedControl>
);

export const CustomersView = () => {
  const { customers } = useSandbox();
  const [q, setQ] = useState("");
  const rows = customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        subtitle="Every account, vehicle history and lifetime value in one list"
        previewOnly
        actions={<AddButton label="Add customer" />}
      />
      <div className="flex gap-3">
        <SearchBar value={q} onChange={setQ} placeholder="Search customers…" />
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Visits</TableHead>
              <TableHead className="text-right">Lifetime value</TableHead>
              <TableHead>Last visit</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">
                  {c.name}
                  <div className="text-xs text-muted-foreground">{c.address}</div>
                </TableCell>
                <TableCell>
                  {c.phone}
                  <div className="text-xs text-muted-foreground">{c.email}</div>
                </TableCell>
                <TableCell className="text-right">{c.total_visits}</TableCell>
                <TableCell className="text-right">{formatCurrency(c.lifetime_value)}</TableCell>
                <TableCell>{new Date(c.last_visit).toLocaleDateString()}</TableCell>
                <TableCell>
                  <RowActions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export const VehiclesView = () => {
  const { vehicles } = useSandbox();
  const { customerName } = useSandboxLookups();
  const [q, setQ] = useState("");
  const rows = vehicles.filter((v) =>
    `${v.make} ${v.model} ${v.license_plate}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vehicles"
        subtitle="Plate, VIN and owner for every vehicle you service"
        previewOnly
        actions={<AddButton label="Add vehicle" />}
      />
      <SearchBar value={q} onChange={setQ} placeholder="Search by plate, make or model…" />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Plate</TableHead>
              <TableHead>VIN</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="font-medium">
                  {v.year} {v.make} {v.model}
                  <div className="text-xs text-muted-foreground">{v.color}</div>
                </TableCell>
                <TableCell>{v.license_plate}</TableCell>
                <TableCell className="font-mono text-xs">{v.vin}</TableCell>
                <TableCell>{customerName(v.customer_id)}</TableCell>
                <TableCell>
                  <RowActions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export const TasksView = () => {
  const { tasks } = useSandbox();
  const { mechanicName, vehicleLabel } = useSandboxLookups();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks"
        subtitle="What's on the floor, who owns it, and hours against estimate"
        previewOnly
        actions={<AddButton label="New task" />}
      />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Mechanic</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead className="text-right">Hours</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.title}</TableCell>
                <TableCell>{mechanicName(t.mechanic_id)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {t.vehicle_id ? vehicleLabel(t.vehicle_id) : "—"}
                </TableCell>
                <TableCell className="text-right">
                  {t.hours_spent} / {t.hours_estimated}
                </TableCell>
                <TableCell>
                  <LockedControl message="Moving jobs between statuses is available in the full version.">
                    <StatusBadge status={t.status} />
                  </LockedControl>
                </TableCell>
                <TableCell>
                  <RowActions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export const MechanicsView = () => {
  const { mechanics } = useSandbox();
  return (
    <div className="space-y-6">
      <PageHeader
        title="Mechanics"
        subtitle="Team, specialisations and labour rates"
        previewOnly
        actions={<AddButton label="Add mechanic" />}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mechanics.map((m) => (
          <Card key={m.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.specialization}</p>
              </div>
              <StatusBadge status={m.is_active ? "completed" : "open"} />
            </div>
            <dl className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Labour rate</dt>
                <dd>{formatCurrency(m.labor_rate)}/hr</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Type</dt>
                <dd className="capitalize">{m.employment_type}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Phone</dt>
                <dd>{m.phone}</dd>
              </div>
            </dl>
            <div className="mt-4 flex justify-end">
              <RowActions />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const PartsView = () => {
  const { parts } = useSandbox();
  const [q, setQ] = useState("");
  const rows = parts.filter((p) =>
    `${p.name} ${p.part_number} ${p.category}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Parts"
        subtitle="Live stock levels, reorder points and supplier per part"
        previewOnly
        actions={<AddButton label="Add part" />}
      />
      <SearchBar value={q} onChange={setQ} placeholder="Search parts…" />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Part</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">In stock</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">
                  {p.name}
                  <div className="font-mono text-xs text-muted-foreground">{p.part_number}</div>
                </TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>{p.vendor_name}</TableCell>
                <TableCell className="text-right">{formatCurrency(p.price)}</TableCell>
                <TableCell className="text-right">
                  <span className={p.quantity <= p.reorder_level ? "text-destructive" : undefined}>
                    {p.quantity}
                  </span>
                </TableCell>
                <TableCell>
                  <RowActions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};