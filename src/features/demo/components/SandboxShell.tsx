import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Car,
  FileText,
  Gauge,
  Menu,
  Package,
  RotateCcw,
  Users,
  Wrench,
  ClipboardList,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSandbox } from "../useSandbox";
import DashboardView from "./DashboardView";
import InvoicesView from "./InvoicesView";
import InvoiceEditor from "./InvoiceEditor";
import {
  CustomersView,
  MechanicsView,
  PartsView,
  TasksView,
  VehiclesView,
} from "./PreviewTables";
import { APP_SUBSCRIBE_URL, CALENDLY_URL } from "@/lib/links";
import { trackCta } from "@/lib/analytics";
import Logo from "@/components/brand/Logo";

type ViewKey =
  | "dashboard"
  | "invoices"
  | "customers"
  | "vehicles"
  | "tasks"
  | "mechanics"
  | "parts";

const NAV: { key: ViewKey; label: string; icon: typeof Gauge; editable?: boolean }[] = [
  { key: "dashboard", label: "Dashboard", icon: Gauge },
  { key: "invoices", label: "Invoices", icon: FileText, editable: true },
  { key: "customers", label: "Customers", icon: Users },
  { key: "vehicles", label: "Vehicles", icon: Car },
  { key: "tasks", label: "Tasks", icon: ClipboardList },
  { key: "mechanics", label: "Mechanics", icon: Wrench },
  { key: "parts", label: "Parts", icon: Package },
];

const SandboxShell = () => {
  const { shop, resetInvoices } = useSandbox();
  const [view, setView] = useState<ViewKey>("invoices");
  const [openInvoice, setOpenInvoice] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  const go = (key: ViewKey) => {
    setView(key);
    setOpenInvoice(null);
    setNavOpen(false);
  };

  const renderView = () => {
    if (view === "invoices") {
      return openInvoice ? (
        <InvoiceEditor invoiceId={openInvoice} onBack={() => setOpenInvoice(null)} />
      ) : (
        <InvoicesView onOpen={setOpenInvoice} />
      );
    }
    switch (view) {
      case "dashboard":
        return <DashboardView onOpenInvoices={() => go("invoices")} />;
      case "customers":
        return <CustomersView />;
      case "vehicles":
        return <VehiclesView />;
      case "tasks":
        return <TasksView />;
      case "mechanics":
        return <MechanicsView />;
      case "parts":
        return <PartsView />;
    }
  };

  return (
    <div className="gp-app min-h-screen">
      <div className="flex min-h-screen">
        <aside
          className={cn(
            "gp-sidebar fixed inset-y-0 left-0 z-40 w-64 shrink-0 flex-col p-4 transition-transform lg:static lg:flex lg:translate-x-0",
            navOpen ? "flex translate-x-0" : "hidden -translate-x-full lg:flex"
          )}
        >
          <Link to="/" className="mb-6 flex items-center gap-2 px-2">
            <Logo invert className="[&_img]:h-8 [&_img]:md:h-8" />
          </Link>
          <p className="mb-2 px-2 text-xs uppercase tracking-wider text-white/40">
            {shop.name}
          </p>
          <nav className="space-y-1">
            {NAV.map(({ key, label, icon: Icon, editable }) => (
              <button
                key={key}
                onClick={() => go(key)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  view === key
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
                {editable && (
                  <span className="ml-auto rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                    Live
                  </span>
                )}
              </button>
            ))}
          </nav>
          <div className="mt-auto space-y-2 pt-6">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white/70 hover:bg-white/10 hover:text-white"
              onClick={resetInvoices}
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Reset demo data
            </Button>
            <a
              href={APP_SUBSCRIBE_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackCta("Start free trial", { location: "demo_sandbox_sidebar" })}
            >
              <Button size="sm" className="w-full bg-white text-neutral-900 hover:bg-white/90">
                Start free trial
              </Button>
            </a>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center gap-3 border-b bg-card px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setNavOpen((o) => !o)}
              aria-label="Toggle navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Interactive demo shop</p>
              <p className="truncate text-xs text-muted-foreground">
                Invoicing is fully editable · everything else is a read-only preview
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackCta("Book a walkthrough", { location: "demo_sandbox_header" })}
              >
                <Button variant="outline" size="sm">
                  Book a walkthrough
                </Button>
              </a>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  Back to site <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6">{renderView()}</main>
        </div>
      </div>
    </div>
  );
};

export default SandboxShell;