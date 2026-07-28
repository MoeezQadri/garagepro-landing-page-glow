import { Quote } from "lucide-react";

const WhyGaragePro = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-4">
              Built by someone who's actually run a shop.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              GaragePro wasn't designed in a boardroom — it was built to solve the exact problems of running an independent shop day to day: chasing paper job cards, invoicing that doesn't match the work done, and customers who quietly stop coming back.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-muted/50 p-8 md:p-10 shadow-sm">
            <p className="text-lg md:text-xl font-medium text-foreground leading-snug">
              Most shop software makes you pay their higher tier just to see your own job board or track technician performance.{" "}
              <span className="text-foreground/60">GaragePro includes both from your first paid plan.</span>
            </p>
          </div>

          {/* Placeholder for future testimonial */}
          <div className="mt-10 rounded-xl border border-dashed border-mint-200 bg-mint-50/40 p-6 text-center">
            <div className="inline-flex items-center gap-2 text-mint-700 mb-2">
              <Quote size={18} />
              <span className="text-sm font-medium uppercase tracking-wide">Customer Story Coming Soon</span>
            </div>
            <p className="text-sm text-muted-foreground">
              We're saving this spot for a real quote from a shop running GaragePro today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGaragePro;