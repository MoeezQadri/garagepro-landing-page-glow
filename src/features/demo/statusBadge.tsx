import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  open: "gp-status gp-status-open",
  "in-progress": "gp-status gp-status-progress",
  pending: "gp-status gp-status-open",
  completed: "gp-status gp-status-completed",
  paid: "gp-status gp-status-paid",
};

const labels: Record<string, string> = {
  open: "Open",
  "in-progress": "In progress",
  pending: "Pending",
  completed: "Completed",
  paid: "Paid",
};

export const StatusBadge = ({ status, className }: { status: string; className?: string }) => (
  <span className={cn(styles[status] ?? "gp-status gp-status-open", className)}>
    {labels[status] ?? status}
  </span>
);