import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { toast } from "sonner";

const GATE_KEY = "gp-demo-lead-v1";

export const hasPassedGate = () => {
  try {
    return Boolean(window.localStorage.getItem(GATE_KEY));
  } catch {
    return false;
  }
};

const LeadGateDialog = ({
  open,
  onOpenChange,
  onSuccess,
  action,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  action: "download" | "send";
}) => {
  const [form, setForm] = useState({ name: "", email: "", shop_name: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from("demo_leads").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      shop_name: form.shop_name.trim() || null,
      phone: form.phone.trim() || null,
      source: `demo_sandbox_${action}`,
    });
    setSubmitting(false);

    if (error) {
      toast.error("We couldn't save your details. Please try again.");
      return;
    }

    try {
      window.localStorage.setItem(GATE_KEY, form.email.trim());
    } catch {
      /* ignore */
    }
    trackEvent("demo_lead_submit", { label: "Demo invoice gate", action });
    onOpenChange(false);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {action === "download" ? "Get your sample invoice" : "Send this invoice"}
          </DialogTitle>
          <DialogDescription>
            Tell us where to reach you and we'll open your invoice straight away — plus a link to
            start your 14-day free trial.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lead-name">Your name *</Label>
            <Input id="lead-name" value={form.name} onChange={set("name")} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-email">Work email *</Label>
            <Input
              id="lead-email"
              type="email"
              value={form.email}
              onChange={set("email")}
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="lead-shop">Shop name</Label>
              <Input id="lead-shop" value={form.shop_name} onChange={set("shop_name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-phone">Phone</Label>
              <Input id="lead-phone" value={form.phone} onChange={set("phone")} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Just a moment…" : "Show my invoice"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadGateDialog;