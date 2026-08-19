import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type PageFaqItem = { q: string; a: string };

interface PageFaqProps {
  heading?: string;
  items: PageFaqItem[];
}

export const faqPageSchema = (items: PageFaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

const PageFaq = ({ heading = "Questions shop owners ask", items }: PageFaqProps) => (
  <section className="py-16">
    <div className="container px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-6">{heading}</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`item-${i}`}
              className="rounded-xl border border-mint-200 bg-white px-5"
            >
              <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-mint-950 hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-6 text-sm text-muted-foreground">
          Looking for something broader?{" "}
          <Link to="/faq" className="font-semibold text-mint-800 underline">
            Read the full FAQ
          </Link>
          .
        </p>
      </div>
    </div>
  </section>
);

export default PageFaq;