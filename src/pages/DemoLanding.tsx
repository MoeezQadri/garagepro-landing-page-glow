import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "@phosphor-icons/react";
import { APP_SUBSCRIBE_URL, CALENDLY_URL } from "@/lib/links";
import { trackCta } from "@/lib/analytics";
import demoScreenshot from "@/assets/garagepro-demo-screenshot.jpg";

const TITLE = "GaragePro Sandbox: Try Real Auto Shop Invoicing Free";
const DESCRIPTION =
  "Open a working copy of GaragePro loaded with sample vehicle history. No signup. See what it feels like to invoice without digging through old records.";
const URL = "https://mygaragepro.co/demo";

const DemoLanding = () => {
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://mygaragepro.co/" },
              { "@type": "ListItem", position: 2, name: "Sandbox demo", item: URL },
            ],
          })}
        </script>
      </Helmet>

      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <p className="inline-flex items-center rounded-full bg-mint-50 px-4 py-1 text-sm font-medium text-mint-800 border border-mint-100 mb-6">
                Interactive sandbox — no signup
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-mint-950 mb-6">
                See what it feels like when the history is already there.
              </h1>
              <p className="text-lg text-muted-foreground">
                This is a real, working copy of GaragePro, loaded with a sample vehicle and its
                service history. No signup. No setup. Just open it and build an invoice the way you
                would for a real job.
              </p>
            </div>
            <div className="max-w-4xl mx-auto rounded-2xl border border-mint-100 shadow-xl overflow-hidden bg-white">
              <img
                src={demoScreenshot}
                alt="GaragePro interactive invoice demo showing a 2019 Toyota Camry invoice with oil change, brake pads and labor line items"
                width={1280}
                height={768}
                loading="eager"
                className="w-full h-auto"
              />
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Takes about a minute. Nothing you do here is saved or shared.
            </p>
          </div>
        </section>

        {/* What you're looking at */}
        <section className="py-16 bg-mint-50/60 border-y border-mint-100">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-6">
                A sample shop, already running.
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Inside, you'll find a sample customer with a vehicle that's been in three times over
                the past six months. Every part and every job from those visits is already logged,
                the same way it would be if this were your own shop after a few months on GaragePro.
              </p>
              <p className="text-lg text-muted-foreground">
                Your task is simple. That vehicle is back in for a fourth visit. Build the invoice,
                and watch what happens when you don't have to go dig through a receipt, a supplier
                invoice, and your memory just to remember what was done last time.
              </p>
            </div>
          </div>
        </section>

        {/* Why this matters */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-6">
                This is the part that actually saves you time.
              </h2>
              <p className="text-lg text-muted-foreground">
                Most shop software demos show you a dashboard. This shows you the moment that
                actually matters: billing a returning customer without having to reconstruct their
                history from scratch. If that's ever cost you ten minutes on a busy day, chasing down
                what parts you used last time or what you quoted a customer three months ago, this is
                what fixes it.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="rounded-full">
                  <Link
                    to="/demo/sandbox"
                    onClick={() =>
                      trackCta("Open the Sandbox", {
                        location: "demo_landing_mid",
                        destination: "sandbox",
                      })
                    }
                  >
                    Open the Sandbox <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* After the sandbox */}
        <section className="py-16 bg-mint-50/60 border-t border-mint-100">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-6">
                Ready to do this with your own shop?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Everything you just did happens automatically, for every vehicle, the moment you
                start using GaragePro for real. No sample data. Your data.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <a
                    href={APP_SUBSCRIBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackCta("Start Your Free Trial", {
                        location: "demo_landing_footer",
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
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackCta(
                        "Talk to Us First",
                        { location: "demo_landing_footer", destination: "calendly" },
                        "book_demo_click"
                      )
                    }
                  >
                    <Calendar size={16} className="mr-2" />
                    Talk to Us First
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

export default DemoLanding;