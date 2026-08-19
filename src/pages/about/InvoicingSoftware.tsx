import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import SeoHead from "@/components/seo/SeoHead";
import PageFaq, { faqPageSchema, PageFaqItem } from "@/components/seo/PageFaq";
import { Button } from "@/components/ui/button";
import { Receipt, ChartLineUp, ListChecks } from "@phosphor-icons/react";
import { APP_SUBSCRIBE_URL } from "@/lib/links";
import { trackCta } from "@/lib/analytics";

const pillars = [
  {
    icon: Receipt,
    title: "Low effort invoicing",
    body: "Build an invoice from the job itself. Parts, labor, and notes are already there, nothing gets retyped.",
  },
  {
    icon: ChartLineUp,
    title: "Daily financial reports, not end of month guesswork",
    body: "Every invoice updates your numbers as it's created, so you know where you stand today, not just when you finally sit down to reconcile.",
  },
  {
    icon: ListChecks,
    title: "Every task tracked through the invoice",
    body: "Each invoice line ties back to the actual job it came from, so you always know what was done, not just what was billed.",
  },
];

const faqs: PageFaqItem[] = [
  {
    q: "Does the invoice pull from the actual job automatically?",
    a: "Yes. Parts used, labor logged, and job notes all flow into the invoice directly, instead of being entered a second time.",
  },
  {
    q: "Can I still send invoices manually if that's how my shop works?",
    a: "Yes, on every plan. Download or print an invoice and share it however fits your process. Automatic sending is available on Professional and Enterprise.",
  },
  {
    q: "Does this replace my accounting software?",
    a: "No, GaragePro handles the day to day invoicing and job level financial picture. QuickBooks integration is something you can ask for as part of the automation options available on our higher plans.",
  },
];

const InvoicingSoftware = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoHead
        title="Auto Repair Invoicing Software: Accurate Invoices, No Double Checking"
        description="Invoice a job with the parts, labor, and history already tied together. Daily financial reporting included. Try GaragePro free for 14 days."
        path="/about/auto-repair-invoicing-software"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Auto repair invoicing software", path: "/about/auto-repair-invoicing-software" },
        ]}
        schemas={[faqPageSchema(faqs)]}
      />

      <Navbar />

      <main>
        <section className="pt-32 pb-12 md:pt-40">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-mint-950 mb-6">
                Auto Repair Invoicing Software That Doesn't Make You Double Check Everything
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Invoice a job knowing the parts, labor, and history are already right, instead of
                confirming it across a receipt, a supplier invoice, and memory.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <a
                    href={APP_SUBSCRIBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackCta("Start Free", {
                        location: "invoicing_page_hero",
                        destination: "subscribe",
                      })
                    }
                  >
                    Start Free, 14 Days, Full Access
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-foreground/30"
                >
                  <Link
                    to="/demo"
                    onClick={() =>
                      trackCta("Play Around With the Live Product", {
                        location: "invoicing_page_hero",
                        destination: "demo",
                      })
                    }
                  >
                    Play Around With the Live Product
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-mint-50/60 border-y border-mint-100">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-5">
              <h2 className="text-3xl md:text-4xl font-bold text-mint-950">
                An invoice is only as accurate as the three places you had to check to build it.
              </h2>
              <p className="text-lg text-muted-foreground">
                Most shops don't invoice from a single source. You're checking what was actually
                completed, what a part cost when you bought it, and what was quoted to the customer,
                often from three different places for one invoice. It's slow, and it's exactly where
                mistakes creep in, a part billed at the wrong price, a labor line that doesn't match
                what was actually done.
              </p>
              <p className="text-lg text-muted-foreground">
                GaragePro keeps the job, the parts, and the labor tied together from the start, so
                the invoice is built from what actually happened, not reconstructed from memory.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-8">
                Three things that matter more than a nice looking invoice.
              </h2>
              <div className="grid gap-5 md:grid-cols-3">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="rounded-2xl border border-mint-200 bg-white p-6">
                    <pillar.icon size={28} className="text-mint-800 mb-4" />
                    <h3 className="text-lg font-bold text-mint-950 mb-2">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground">{pillar.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PageFaq heading="Invoicing questions, answered" items={faqs} />

        <section className="py-16 bg-mint-50/60 border-t border-mint-100">
          <div className="container px-4 md:px-6 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-4">
              Stop confirming the same invoice against three different sources.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Try every feature free for 14 days. No card required.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <a
                href={APP_SUBSCRIBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackCta("Start Free", {
                    location: "invoicing_page_footer",
                    destination: "subscribe",
                  })
                }
              >
                Start Free, 14 Days, Full Access
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InvoicingSoftware;