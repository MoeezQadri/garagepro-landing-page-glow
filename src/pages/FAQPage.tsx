import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Calendar } from "@phosphor-icons/react";
import { APP_SUBSCRIBE_URL, CALENDLY_URL } from "@/lib/links";
import { trackCta } from "@/lib/analytics";

const TITLE = "GaragePro FAQ: Auto Repair Shop Software Questions Answered";
const DESCRIPTION =
  "Answers to common questions about GaragePro, auto repair shop software for estimates, invoicing, inventory, and customer follow up.";
const URL = "https://mygaragepro.co/faq";

type FaqGroup = {
  id: string;
  title: string;
  items: { q: string; a: string; note?: string }[];
};

const groups: FaqGroup[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        q: "What is GaragePro?",
        a: "GaragePro is shop management software built for auto repair shops. It handles estimates, invoicing, the job board, technician tracking, inventory, and reporting, in one place, with automated customer follow up available once you're ready for it.",
      },
      {
        q: "How is GaragePro different from running my shop on paper or spreadsheets?",
        a: "Right now, getting a full picture of a job usually means checking a paper job card, a receipt for parts, and your own memory of what was quoted. GaragePro keeps all of that tied to one record, so building an invoice does not mean tracking down information from two or three different places.",
      },
      {
        q: "Who is GaragePro built for?",
        a: "Independent auto repair shops, along with quick lube, detailing, tire, and transmission shops. If your shop still runs on paper, spreadsheets, or a mix of disconnected tools, GaragePro is built for that starting point.",
      },
    ],
  },
  {
    id: "estimates-customers",
    title: "Estimates and Customers",
    items: [
      {
        q: "Can I build and send estimates through GaragePro?",
        a: "Yes. Estimates are tied directly to the job, and the same record becomes the invoice once the work is approved and completed. Nothing gets rebuilt or retyped between the two.",
      },
      {
        q: "What happens if a customer doesn't respond to an estimate?",
        a: "This is one of the most common ways shops lose work without realizing it. On Professional and Enterprise, GaragePro can automatically follow up with customers who haven't responded to an estimate, so a quiet customer doesn't just quietly go somewhere else.",
      },
      {
        q: "Does GaragePro ask customers for feedback after a job?",
        a: "Yes, on Professional and Enterprise. Once a job is marked complete, GaragePro can automatically send a feedback or review request, so you're not relying on remembering to ask.",
      },
      {
        q: "Does GaragePro keep a full history for each customer and vehicle?",
        a: "Yes. Every visit, every part used, and every job performed is tied to the customer and vehicle record, so the next visit doesn't start from zero.",
      },
    ],
  },
  {
    id: "invoicing-team",
    title: "Invoicing and Your Team",
    items: [
      {
        q: "How does invoicing actually work?",
        a: "An invoice in GaragePro is built from the job itself, not typed up separately. The parts used, the labor logged, and the work performed all flow into the invoice directly.",
      },
      {
        q: "Can I still send an invoice manually if I want to?",
        a: "Yes, on every plan. You can download or print an invoice or estimate and share it however you'd like, by hand, by email, whatever fits your process.",
      },
      {
        q: "Does GaragePro track inventory and parts?",
        a: "Yes. Parts get logged as they're used, and stock counts update as it happens, rather than being reconciled once a month.",
      },
      {
        q: "Can I see how my team is performing?",
        a: "Yes. GaragePro tracks actual time spent against the time a job was estimated to take, by technician and by job, so you can see where time is going before it becomes a pattern.",
      },
      {
        q: "Does GaragePro give me a clear financial picture?",
        a: "Yes. Income and expenses update as work happens, so you're not reconstructing your numbers from receipts at the end of the month.",
      },
    ],
  },
  {
    id: "pricing-trust",
    title: "Pricing and Trust",
    items: [
      {
        q: "How much does GaragePro cost, and is there a free plan?",
        a: "GaragePro has a free 14 day trial with every feature unlocked, no card required. Paid plans start at $29 a month. Full pricing details are on the pricing page.",
      },
      {
        q: "Is there a contract, or can I cancel anytime?",
        a: "No contract. It's month to month, and you can cancel anytime.",
      },
      {
        q: "Do I need to set up the automation features myself?",
        a: "No. Once you're on Professional or Enterprise, our team configures your reminders, notifications, and review requests for you after signup.",
      },
      {
        q: "Can I try GaragePro before committing my whole shop to it?",
        a: "Yes. Beyond the free trial, you can try a real, working copy of GaragePro in our sandbox with sample data first, no signup required, to see exactly how it works before you commit anything.",
      },
      {
        q: "Does GaragePro integrate with QuickBooks or other accounting software?",
        a: "QuickBooks integration is something you can ask for as part of the automation options available on our higher plans, the same way reminders and review requests work today.",
      },
      {
        q: "Can I use GaragePro on my phone?",
        a: "Yes, GaragePro works fine in a mobile browser. For the best experience, especially for seeing the job board and reports clearly, we recommend using a tablet or laptop.",
      },
      {
        q: "Is my shop's data and my customers' data safe?",
        a: "Yes. All of your data is held securely in the cloud, and it's only accessible to your organization and the access levels you set for your team. It's never shared with anyone outside your organization.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: groups.flatMap((g) =>
    g.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://mygaragepro.co/" },
              { "@type": "ListItem", position: 2, name: "FAQ", item: URL },
            ],
          })}
        </script>
      </Helmet>

      <Navbar />

      <main>
        <section className="pt-32 pb-10 md:pt-40">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-mint-950 mb-6">
                Frequently asked questions
              </h1>
              <p className="text-lg text-muted-foreground">
                Everything shop owners ask us about GaragePro — estimates, invoicing, inventory,
                pricing, and how your data is handled.
              </p>
              <nav aria-label="FAQ sections" className="mt-8 flex flex-wrap justify-center gap-2">
                {groups.map((g) => (
                  <a
                    key={g.id}
                    href={`#${g.id}`}
                    className="rounded-full border border-mint-200 bg-mint-50 px-4 py-1.5 text-sm font-medium text-mint-800 transition-colors hover:bg-mint-100"
                  >
                    {g.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-12">
              {groups.map((group) => (
                <div key={group.id} id={group.id} className="scroll-mt-28">
                  <h2 className="text-2xl md:text-3xl font-bold text-mint-950 mb-5">
                    {group.title}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {group.items.map((item, i) => (
                      <AccordionItem
                        key={item.q}
                        value={`${group.id}-${i}`}
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
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-mint-50/60 border-t border-mint-100">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-6">
                Still have a question?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Try the sandbox with sample data, start a 14 day trial with every feature unlocked,
                or talk to us first.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <a
                    href={APP_SUBSCRIBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackCta("Start Your Free Trial", {
                        location: "faq_page_footer",
                        destination: "subscribe",
                      })
                    }
                  >
                    Start Your Free Trial — 14 Days, Full Access
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-foreground/30 text-foreground hover:bg-muted"
                >
                  <Link
                    to="/demo"
                    onClick={() =>
                      trackCta("Try the Sandbox", {
                        location: "faq_page_footer",
                        destination: "demo",
                      })
                    }
                  >
                    Try the Sandbox <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-foreground/30 text-foreground hover:bg-muted"
                >
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackCta(
                        "Talk to Us",
                        { location: "faq_page_footer", destination: "calendly" },
                        "book_demo_click"
                      )
                    }
                  >
                    <Calendar size={16} className="mr-2" />
                    Talk to Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;