import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

const faqs = [
  {
    q: "I only have 2\u20133 people on my team, would would I need a 50-seat plan?",
    a: "Our seat limits are ceilings, not requirements. Enterprise is priced for the automation and outreach tools inside it, not for how many people you employ \u2014 a small team that wants the full toolkit is welcome there.",
  },
  {
    q: "Can I still send an invoice to a customer on the Basic plan?",
    a: "Yes \u2014 you can download and share invoices and estimates manually (email attachment or print). Basic just doesn't include automated sending or reminder sequences.",
  },
  {
    q: "Do I need to set up the automation myself?",
    a: "No \u2014 once you're on Professional or Enterprise, reach out to us and our team will configure your reminders, notifications, and campaigns for you.",
  },
  {
    q: "Is there a contract or lock-in?",
    a: "No. Month-to-month, cancel anytime. Annual billing available at a 17% discount if you'd rather lock in savings.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-mint-50/60 border-y border-mint-100">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-mint-950 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-mint-200 bg-white px-5"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-mint-950 hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-base font-semibold text-mint-800 underline-offset-4 hover:underline"
            >
              See all frequently asked questions <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;