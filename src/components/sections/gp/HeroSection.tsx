import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ClipboardText as ClipboardList,
  Wrench,
  FileText,
} from "@phosphor-icons/react";
import { APP_SUBSCRIBE_URL } from "@/lib/links";
import heroShop from "@/assets/hero-shop.jpg";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Photo background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroShop})` }}
        aria-hidden="true"
      />
      {/* Translucent white overlay for readability */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" aria-hidden="true" />
      <div className="container relative px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[hsl(var(--brand-accent-light))] border border-[hsl(var(--brand-accent))]/20 text-[hsl(var(--brand-accent-text))] text-xs font-medium tracking-wide">
              Built for independent shops
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-foreground">
              Everything your shop needs to run.{" "}
              <span style={{ color: "hsl(var(--brand-accent))" }}>Nothing locked behind an upgrade.</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-xl">
              Invoicing, job tracking, inventory, and technician performance — all included from day one. No upgrade required to see your own job board.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="btn-signage bg-foreground hover:bg-foreground/90 text-background"
              >
                <a href={APP_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer">
                  Start Free — 14 Days, Full Access
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-foreground/30 bg-white/60 text-foreground hover:bg-white/90 hover:text-foreground"
              >
                <a href="#pricing">See Pricing</a>
              </Button>
            </div>
            <p className="text-sm text-foreground/70 pt-1">
              No credit card required · Cancel anytime
            </p>
          </div>

          {/* Visual: mock job board on a shop-floor tablet */}
          <div className="relative animate-fade-in-right">
            <div className="relative rounded-2xl border border-border bg-white overflow-hidden shadow-xl">
              <div className="px-5 py-3 border-b border-border bg-muted flex items-center justify-between">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <ClipboardList size={18} />
                  <span>Job Board</span>
                </div>
                <span className="text-xs text-muted-foreground">Today · 4 active</span>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { car: "2019 Ford F-150", status: "In Progress", tech: "Marcus", color: "bg-neutral-100 text-neutral-700 border-neutral-200" },
                  { car: "2021 Honda Civic", status: "Waiting", tech: "—", color: "bg-neutral-50 text-neutral-500 border-neutral-200" },
                  { car: "2017 Toyota RAV4", status: "Ready for Pickup", tech: "Dee", color: "bg-foreground text-background border-foreground" },
                  { car: "2020 Chevy Silverado", status: "In Progress", tech: "Luis", color: "bg-neutral-100 text-neutral-700 border-neutral-200" },
                ].map((job) => (
                  <div
                    key={job.car}
                    className="flex items-center justify-between rounded-xl border border-border px-4 py-3 hover:bg-muted/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center text-foreground">
                        <Wrench size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{job.car}</p>
                        <p className="text-xs text-muted-foreground">Tech: {job.tech}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${job.color}`}>
                      {job.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden sm:flex bg-white rounded-2xl shadow-lg p-3 border border-border items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Invoice #1042</p>
                <p className="text-sm font-semibold text-foreground">Sent · Paid</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;