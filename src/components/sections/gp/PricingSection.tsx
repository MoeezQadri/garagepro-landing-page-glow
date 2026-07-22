import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { APP_SIGNUP_URL } from "@/lib/links";

type Billing = "monthly" | "annual";

interface Plan {
  name: string;
  monthly: string;
  annual: string;
  annualNote?: string;
  seats: string;
  blurb?: string;
  includes: string[];
  excludes?: string[];
  cta: string;
  highlight?: boolean;
  note?: string;
}

const plans: Plan[] = [
  {
    name: "Free",
    monthly: "$0",
    annual: "$0",
    seats: "1 user",
    blurb: "14-day full access, every feature unlocked",
    includes: ["Every feature", "14 days full access", "No credit card required"],
    cta: "Start Free Trial",
  },
  {
    name: "Basic",
    monthly: "$29",
    annual: "$24",
    annualNote: "$290/yr",
    seats: "Up to 3 users",
    includes: [
      "Invoicing & estimates",
      "Digital job board",
      "Technician performance tracking",
      "Inventory & parts tracking",
      "Income/expense reporting",
      "Manual invoice download & sharing",
    ],
    excludes: ["Automated reminders", "SMS/email delivery", "Review requests"],
    cta: "Get Started",
  },
  {
    name: "Professional",
    monthly: "$79",
    annual: "$65",
    annualNote: "$790/yr",
    seats: "Up to 10 users",
    includes: [
      "Everything in Basic",
      "Automated time/mileage reminders",
      "Automated SMS & email delivery",
      "Post-service review requests (Google/Yelp)",
    ],
    cta: "Get Started",
    highlight: true,
  },
  {
    name: "Enterprise",
    monthly: "$199",
    annual: "$165",
    annualNote: "$1,990/yr",
    seats: "Up to 50 users",
    includes: [
      "Everything in Professional",
      "Customer reactivation campaigns",
      "Lapsed-customer outreach",
      "Website booking form",
      "Custom branding",
    ],
    cta: "Get Started",
    note: "Priced for the full growth toolkit — a small team wanting complete automation belongs here too, not just large operations.",
  },
];

const PricingSection = () => {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-4">
            Simple pricing. Pick based on what you need, not headcount tricks.
          </h2>
          <div className="inline-flex items-center gap-1 p-1 rounded-full border border-mint-200 bg-mint-50 mt-4">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                billing === "monthly"
                  ? "bg-white text-mint-900 shadow-sm"
                  : "text-mint-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-2 ${
                billing === "annual"
                  ? "bg-white text-mint-900 shadow-sm"
                  : "text-mint-700"
              }`}
            >
              Annual
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-mint-700 text-white font-semibold">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const price = billing === "annual" ? plan.annual : plan.monthly;
            const showPerMonth = plan.monthly !== "$0";
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  plan.highlight
                    ? "border-mint-500 bg-mint-50/60 shadow-lg ring-1 ring-mint-500"
                    : "border-mint-100 bg-white shadow-sm"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-mint-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-mint-950">{plan.name}</h3>
                <div className="mt-3 mb-1 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-mint-950">{price}</span>
                  {showPerMonth && (
                    <span className="text-muted-foreground text-sm">/mo</span>
                  )}
                </div>
                {billing === "annual" && plan.annualNote && (
                  <p className="text-xs text-mint-700">{plan.annualNote} billed annually</p>
                )}
                <p className="text-sm text-muted-foreground mt-2">{plan.seats}</p>
                {plan.blurb && (
                  <p className="text-sm text-mint-800 mt-1">{plan.blurb}</p>
                )}

                <ul className="space-y-2 mt-5 mb-6">
                  {plan.includes.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-mint-700 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                  {plan.excludes?.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <X size={16} className="text-muted-foreground/60 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground line-through">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`mt-auto w-full ${
                    plan.highlight
                      ? "bg-mint-700 hover:bg-mint-800 text-white"
                      : "bg-mint-950 hover:bg-mint-900 text-white"
                  }`}
                >
                  <a href={APP_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                    {plan.cta}
                  </a>
                </Button>

                {plan.note && (
                  <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                    {plan.note}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
          No contracts. Cancel anytime. Automation setup on Professional and Enterprise is configured by our team after signup — reach out and we'll have it running quickly.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;