import { Wrench, ShieldCheck, Gift } from "@phosphor-icons/react";

const trustSignals = [
  { icon: Wrench, text: "Built inside a real, working shop \u2014 not a boardroom concept" },
  { icon: ShieldCheck, text: "No contracts. Cancel anytime." },
  { icon: Gift, text: "14-day free trial, every feature unlocked, no card required" },
];

const WhyGaragePro = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="rounded-2xl border border-border bg-muted p-8 md:p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built by a garage, not a boardroom.
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              GaragePro started inside GearHead Garages, a working automotive shop handling everyday repair and servicing alongside full restoration and restomod builds. Every feature exists because a real shop needed it first: a job board that actually reflects where a car is, invoicing that doesn't mean retyping the same job twice, and a way to know a customer is drifting off before they're already gone.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mt-4">
              This isn't enterprise software with an auto shop skin bolted on. It came out of a shop, for shops.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {trustSignals.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm"
              >
                <span
                  className="w-9 h-9 rounded-xl border border-border bg-muted/40 flex items-center justify-center flex-shrink-0"
                  style={{ color: "hsl(var(--brand-accent))" }}
                >
                  <Icon size={18} weight="duotone" />
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border-2 border-foreground bg-white p-8 md:p-10 shadow-lg">
            <p className="text-lg md:text-xl font-medium text-muted-foreground leading-snug">
              Most shop software makes you pay for their higher tier just to see your own job board or track technician performance.{" "}
              <span className="text-foreground font-semibold">GaragePro includes both from your first paid plan.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGaragePro;