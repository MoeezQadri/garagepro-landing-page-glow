import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  FileText,
  Wrench,
  Users,
  CheckCircle2,
  TrendingUp,
  Calendar,
  RefreshCw,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSandbox } from "../useSandbox";
import { calculateInvoiceBreakdown, formatCurrency } from "../invoiceCalc";
import { LockedControl, PageHeader } from "./LockedControl";

const DashboardView = ({ onOpenInvoices }: { onOpenInvoices: () => void }) => {
  const { invoices, customers, tasks } = useSandbox();

  const metrics = useMemo(() => {
    const totals = invoices.map((inv) => calculateInvoiceBreakdown(inv));
    const revenue = totals.reduce((s, t) => s + t.paidAmount, 0);
    const outstanding = totals.reduce((s, t) => s + Math.max(t.balanceDue, 0), 0);
    const completed = invoices.filter((i) => i.status === "paid" || i.status === "completed").length;
    const avg = totals.length ? totals.reduce((s, t) => s + t.total, 0) / totals.length : 0;
    return [
      { title: "Revenue collected", value: formatCurrency(revenue), change: 12.4, icon: DollarSign, description: "Last 30 days" },
      { title: "Outstanding", value: formatCurrency(outstanding), change: -4.1, icon: TrendingUp, description: "Unpaid balance" },
      { title: "Invoices", value: String(invoices.length), change: 8.3, icon: FileText, description: "Created this month" },
      { title: "Active jobs", value: String(tasks.filter((t) => t.status === "in-progress").length), change: 2, icon: Wrench, description: "On the floor now" },
      { title: "Customers", value: String(customers.length), change: 5.6, icon: Users, description: "Active accounts" },
      { title: "Avg. job value", value: formatCurrency(avg), change: 3.2, icon: CheckCircle2, description: "Per invoice" },
    ];
  }, [invoices, customers, tasks]);

  const chartData = useMemo(() => {
    const buckets = new Map<string, number>();
    for (let i = 5; i >= 0; i -= 1) {
      const d = new Date();
      d.setDate(d.getDate() - i * 5);
      buckets.set(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }), 0);
    }
    const keys = [...buckets.keys()];
    invoices.forEach((inv, idx) => {
      const key = keys[idx % keys.length];
      buckets.set(key, (buckets.get(key) ?? 0) + calculateInvoiceBreakdown(inv).total);
    });
    return keys.map((name) => ({ name, revenue: Math.round(buckets.get(name) ?? 0) }));
  }, [invoices]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your garage operations and performance metrics"
        previewOnly
        actions={
          <>
            <LockedControl>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Last 30 days
              </Button>
            </LockedControl>
            <LockedControl>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </LockedControl>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m) => (
          <Card key={m.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{m.title}</CardTitle>
              <m.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{m.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                <span className={m.change >= 0 ? "text-emerald-600" : "text-destructive"}>
                  {m.change >= 0 ? "+" : ""}
                  {m.change}%
                </span>{" "}
                {m.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Invoiced value over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ left: -18, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: 8, fontSize: 12 }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary) / 0.12)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Invoicing is unlocked in this demo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={onOpenInvoices}
                className="flex flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center transition-colors hover:bg-accent"
              >
                <span className="rounded-full bg-primary/10 p-2">
                  <FileText className="h-5 w-5 text-primary" />
                </span>
                <span className="mt-2 text-sm font-medium">New invoice</span>
              </button>
              {[
                { label: "Schedule task", icon: Calendar },
                { label: "Add customer", icon: Users },
                { label: "Add mechanic", icon: Wrench },
              ].map((a) => (
                <LockedControl key={a.label}>
                  <span className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
                    <span className="rounded-full bg-muted p-2">
                      <a.icon className="h-5 w-5 text-muted-foreground" />
                    </span>
                    <span className="mt-2 text-sm font-medium">{a.label}</span>
                  </span>
                </LockedControl>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;