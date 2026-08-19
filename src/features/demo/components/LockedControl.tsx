import { Lock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const LOCK_MESSAGE = "Available in the full version — start your free trial.";

/** Wraps a preview-only control: disables interaction and explains why. */
export const LockedControl = ({
  children,
  message = LOCK_MESSAGE,
}: {
  children: React.ReactNode;
  message?: string;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="inline-flex cursor-not-allowed opacity-60" aria-disabled="true">
        <span className="pointer-events-none">{children}</span>
      </span>
    </TooltipTrigger>
    <TooltipContent>
      <span className="flex items-center gap-1.5">
        <Lock className="h-3 w-3" />
        {message}
      </span>
    </TooltipContent>
  </Tooltip>
);

export const PreviewOnlyBadge = () => (
  <Badge variant="secondary" className="gap-1 font-normal">
    <Lock className="h-3 w-3" />
    Preview only
  </Badge>
);

export const PageHeader = ({
  title,
  subtitle,
  actions,
  previewOnly = false,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  previewOnly?: boolean;
}) => (
  <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-4">
    <div>
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {previewOnly && <PreviewOnlyBadge />}
      </div>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
    {actions && <div className="flex items-center gap-2">{actions}</div>}
  </div>
);