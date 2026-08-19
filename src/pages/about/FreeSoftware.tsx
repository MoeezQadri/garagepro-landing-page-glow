import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import SeoHead from "@/components/seo/SeoHead";
import PageFaq, { faqPageSchema, PageFaqItem } from "@/components/seo/PageFaq";
import { Button } from "@/components/ui/button";
import { APP_SUBSCRIBE_URL } from "@/lib/links";
import { trackCta } from "@/lib/analytics";

const faqs: PageFaqItem[] = [
  {
    q: "Is the sandbox actually free, or is it a trial in disguise?",
    a: "It's actually free. No signup, no email, no time limit on trying it. It uses sample data, not your own, so it's meant for trying the product, not running your shop day to day.",
  },
  {
    q: "Do I need a credit card for the 14 day trial?",
    a: "No. Every feature is unlocked for 14 days with no card required.",
  },
  {
    q: "What happens if I don't upgrade after the trial?",
    a: "Your account is locked to the pricing and settings section until you choose a plan. Nothing is deleted.",
  },
];

const FreeSoftware = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoHead
        title="Free Auto Repair Shop Software: Try GaragePro, No Card Needed"
        description="Try a free, working copy of GaragePro with no signup, or start a 14 day free trial with every feature unlocked. Plans start at $29 a month after that."
        path="/about/free-auto-repair-shop-software"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Free auto repair shop software", path: "/about/free-auto-repair-shop-software" },
        ]}
        schemas={[faqPageSchema(faqs)]}
      />

      <Navbar />

      <main>
        <section className="pt-32 pb-12 md:pt-40">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-mint-950 mb-6">
                Free Auto Repair Shop Software, No Card, No Catch
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Try a real, working copy of GaragePro for free, no signup required. Then get every
                feature unlocked for 14 days if you want to run it in your own shop.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link
                    to="/demo"
                    onClick={() =>
                      trackCta("Try the Free Sandbox", {
                        location: "free_page_hero",
                        destination: "demo",
                      })
                    }
                  >
                    Try the Free Sandbox, No Signup
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-foreground/30"
                >
                  <a
                    href={APP_SUBSCRIBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackCta("Start Your Free Trial", {
                        location: "free_page_hero",
                        destination: "subscribe",
                      })
                    }
                  >
                    Start Your Free Trial, 14 Days, Full Access
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-mint-50/60 border-y border-mint-100">
          <div className="container px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-8">
                Two ways to try GaragePro without paying anything.
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-mint-200 bg-white p-6">
                  <h3 className="text-lg font-bold text-mint-950 mb-2">
                    The sandbox, free forever, no signup
                  </h3>
                  <p className="text-muted-foreground">
                    Open a real, working copy of GaragePro loaded with a sample shop and sample
                    vehicle history. Build an invoice, see how the job board works, no email, no
                    card, nothing saved. This is genuinely free, not a trial.
                  </p>
                </div>
                <div className="rounded-2xl border border-mint-200 bg-white p-6">
                  <h3 className="text-lg font-bold text-mint-950 mb-2">
                    The 14 day free trial, full features unlocked
                  </h3>
                  <p className="text-muted-foreground">
                    Ready to run it in your own shop? Every feature, including automated reminders
                    and reporting, is unlocked for 14 days, no card required to start.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-5">
              <h2 className="text-3xl md:text-4xl font-bold text-mint-950">
                After the trial, plans start at $29 a month.
              </h2>
              <p className="text-lg text-muted-foreground">
                We're not going to pretend GaragePro is free forever, plenty of searches for free
                shop software land on pages that quietly aren't. After your 14 day trial, plans start
                at $29 a month for up to 3 users, with the full job board, invoicing, inventory, and
                technician tracking included from that first paid tier, not locked behind a more
                expensive plan. No contract, cancel anytime.
              </p>
              <p className="text-lg text-muted-foreground">
                If you're looking for something to run your whole shop on for free indefinitely, this
                isn't that. If you're looking to try real shop software before spending anything, the
                sandbox and the trial both get you there with nothing charged.
              </p>
            </div>
          </div>
        </section>

        <PageFaq heading="Free plan questions, answered" items={faqs} />

        <section className="py-16 bg-mint-50/60 border-t border-mint-100">
          <div className="container px-4 md:px-6 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-4">
              See it for yourself before you decide anything.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              No signup for the sandbox. No card for the trial.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link
                to="/demo"
                onClick={() =>
                  trackCta("Try the Free Sandbox", {
                    location: "free_page_footer",
                    destination: "demo",
                  })
                }
              >
                Try the Free Sandbox, No Signup
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FreeSoftware;