import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import SeoHead from "@/components/seo/SeoHead";
import PageFaq, { faqPageSchema, PageFaqItem } from "@/components/seo/PageFaq";
import { Button } from "@/components/ui/button";
import {
  ClockCounterClockwise,
  ArrowsLeftRight,
  BellRinging,
  Calculator,
  PaperPlaneTilt,
  CursorClick,
} from "@phosphor-icons/react";
import { APP_SUBSCRIBE_URL } from "@/lib/links";
import { trackCta } from "@/lib/analytics";

const features = [
  {
    icon: ClockCounterClockwise,
    title: "Estimates tied to real history",
    body: "Every past visit, part, and job for that vehicle is already there when you start building the next estimate.",
  },
  {
    icon: ArrowsLeftRight,
    title: "One click from estimate to invoice",
    body: "Once a customer approves, the same record becomes the invoice. Nothing gets rebuilt from scratch.",
  },
  {
    icon: BellRinging,
    title: "Automatic follow up on quiet estimates",
    body: "Stop losing jobs to customers who simply never got back to you. (Professional and Enterprise)",
  },
  {
    icon: Calculator,
    title: "Accurate parts and labor, every time",
    body: "Pull real numbers into the estimate instead of quoting from memory or an outdated price in your head.",
  },
  {
    icon: PaperPlaneTilt,
    title: "Send it however your customer prefers",
    body: "Share manually, or send it automatically on Professional and Enterprise. Either way, it's built the same, correctly, the first time.",
  },
  {
    icon: CursorClick,
    title: "See it before you decide",
    body: "Try a real, working copy of GaragePro's estimate workflow in our sandbox, no signup required.",
  },
];

const faqs: PageFaqItem[] = [
  {
    q: "Can I build estimates the same way I do now, just faster?",
    a: "Yes. The workflow is the same idea you already know, describe the job, add parts and labor, send it. The difference is that the information you'd normally have to look up is already sitting there.",
  },
  {
    q: "What happens if a customer doesn't respond to an estimate?",
    a: "On Professional and Enterprise, GaragePro can follow up automatically, so you're not relying on remembering to chase it yourself.",
  },
  {
    q: "Do I need the paid automation tier to just build estimates?",
    a: "No. Building and sending estimates manually is included on every plan, including Basic. Automatic follow up is what's reserved for Professional and Enterprise.",
  },
];

const EstimateSoftware = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoHead
        title="Auto Repair Estimate Software: Estimates Without the Chasing"
        description="Build accurate auto repair estimates without digging through old records. Automatic follow up on quiet estimates. Try GaragePro free for 14 days."
        path="/about/auto-repair-estimate-software"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Auto repair estimate software", path: "/about/auto-repair-estimate-software" },
        ]}
        schemas={[faqPageSchema(faqs)]}
      />

      <Navbar />

      <main>
        <section className="pt-32 pb-12 md:pt-40">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-mint-950 mb-6">
                Auto Repair Estimate Software Built to Stop the Chasing
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Build accurate estimates without digging through three different places for the same
                information, and stop losing customers who go quiet after you send one.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <a
                    href={APP_SUBSCRIBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackCta("Start Free", {
                        location: "estimate_page_hero",
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
                        location: "estimate_page_hero",
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
                Getting an estimate right shouldn't take longer than the job itself.
              </h2>
              <p className="text-lg text-muted-foreground">
                Building a real estimate usually means pulling information from more than one place.
                What was actually completed last time. What the customer already asked for. What the
                parts are going to cost today, not last month. Most shops end up checking two or
                three different sources just to get one estimate out the door, and that adds up fast
                on a busy day.
              </p>
              <p className="text-lg text-muted-foreground">
                GaragePro keeps that information tied to the vehicle and the customer in one place,
                so building the next estimate doesn't start with a search.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-5">
              <h2 className="text-3xl md:text-4xl font-bold text-mint-950">
                An estimate that goes quiet is a job you've already lost.
              </h2>
              <p className="text-lg text-muted-foreground">
                Customers ghost on estimates constantly. They see a number, go quiet, and you never
                find out if they went with it, went somewhere else, or just forgot. By the time you'd
                normally think to follow up, the moment's gone.
              </p>
              <p className="text-lg text-muted-foreground">
                On GaragePro's Professional and Enterprise plans, estimates that go unanswered can be
                automatically followed up on, so a quiet customer doesn't automatically mean a lost
                one.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-mint-50/60 border-y border-mint-100">
          <div className="container px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-8">
                Everything an estimate needs, without the extra steps.
              </h2>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-mint-200 bg-white p-6"
                  >
                    <feature.icon size={28} className="text-mint-800 mb-4" />
                    <h3 className="text-lg font-bold text-mint-950 mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PageFaq heading="Estimate questions, answered" items={faqs} />

        <section className="py-16 bg-mint-50/60 border-t border-mint-100">
          <div className="container px-4 md:px-6 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-4">
              Stop rebuilding the same information every time you write an estimate.
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
                    location: "estimate_page_footer",
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

export default EstimateSoftware;