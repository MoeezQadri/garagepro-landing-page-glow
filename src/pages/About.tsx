import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import PricingSection from "@/components/sections/gp/PricingSection";
import SeoHead from "@/components/seo/SeoHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Wrench, Rocket } from "@phosphor-icons/react";
import { APP_SUBSCRIBE_URL } from "@/lib/links";
import { trackCta } from "@/lib/analytics";

const subPages = [
  {
    to: "/about/auto-repair-estimate-software",
    title: "Auto repair estimate software",
    blurb: "Build estimates without digging, and follow up automatically when one goes quiet.",
  },
  {
    to: "/about/auto-repair-invoicing-software",
    title: "Auto repair invoicing software",
    blurb: "Invoice from the job itself, with parts, labor and history already tied together.",
  },
  {
    to: "/about/free-auto-repair-shop-software",
    title: "Free auto repair shop software",
    blurb: "A free sandbox with no signup, and a 14 day trial with every feature unlocked.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoHead
        title="About GaragePro: Built From a Real Auto Repair Shop"
        description="GaragePro was built inside a working auto repair shop by someone with a software and product background. See the story, try the product, or start free."
        path="/about"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <Navbar />

      <main>
        <section className="pt-32 pb-12 md:pt-40">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-mint-950 mb-6">
                Built by someone who spends time in both worlds.
              </h1>
              <p className="text-lg text-muted-foreground">
                GaragePro comes from running an actual repair shop and years of building software,
                not from a boardroom guessing what a shop needs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-mint-50/60 border-y border-mint-100">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-5">
              <h2 className="text-3xl md:text-4xl font-bold text-mint-950">
                A garage, and years of building software before it.
              </h2>
              <p className="text-lg text-muted-foreground">
                GaragePro didn't start as a product idea looking for a market. It started inside
                GearHead Garages, a working shop handling everyday repair and servicing alongside
                full restoration and restomod builds.
              </p>
              <p className="text-lg text-muted-foreground">
                Before GearHead, the time was spent building and leading software and AI products,
                the kind of background that makes it possible to actually build the tool a shop
                needs, not just imagine one. Running a shop and building software turned out to be a
                strange but useful combination. One side knows what breaks down about running a shop
                day to day, chasing paperwork, reconstructing a job from three different sources,
                losing track of a customer who went quiet. The other side knows how to actually fix
                that with software, properly, not with a feature list copied from a competitor.
              </p>
              <p className="text-lg text-muted-foreground">
                GaragePro is what happens when both of those come together. It's not enterprise
                software with an auto shop skin on it. It came out of a real shop, built by someone
                who also knows how to build software correctly.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-5">
              <h2 className="text-3xl md:text-4xl font-bold text-mint-950">
                Software that solves what actually slows a shop down.
              </h2>
              <p className="text-lg text-muted-foreground">
                Every feature in GaragePro exists because a real shop needed it, not because it
                looked good on a comparison chart. A job board that reflects where a car actually is.
                Invoicing that doesn't mean retyping the same job twice. A way to know a customer's
                gone quiet before they're already gone for good.
              </p>
              <p className="text-lg text-muted-foreground">
                That's also why GaragePro doesn't lock the basics, like the job board, inventory, and
                technician tracking, behind a second, more expensive plan the way a lot of shop
                software does. If it's core to running a shop, it belongs in your first plan, not an
                upsell.
              </p>
            </div>
          </div>
        </section>

        {/* Sub pages */}
        <section className="py-16 bg-mint-50/60 border-y border-mint-100">
          <div className="container px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-8">
                Go deeper on what GaragePro does.
              </h2>
              <div className="grid gap-5 md:grid-cols-3">
                {subPages.map((page) => (
                  <Link
                    key={page.to}
                    to={page.to}
                    className="rounded-2xl border border-mint-200 bg-white p-6 transition-shadow hover:shadow-lg"
                  >
                    <h3 className="text-lg font-bold text-mint-950 mb-2">{page.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{page.blurb}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-mint-800">
                      Read more <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Three-way CTA */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-8 text-center">
                Whichever way you'd rather see this.
              </h2>
              <div className="grid gap-5 md:grid-cols-3">
                <div className="rounded-2xl border border-mint-200 bg-white p-6 flex flex-col">
                  <PlayCircle size={28} className="text-mint-800 mb-4" />
                  <h3 className="text-lg font-bold text-mint-950 mb-2">Watch it</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">
                    See a 2 minute walkthrough of GaragePro in action.
                  </p>
                  <Button asChild variant="outline" className="rounded-full border-foreground/30">
                    <a
                      href="/#demo"
                      onClick={() =>
                        trackCta("Watch the Walkthrough", {
                          location: "about_cta",
                          destination: "home_demo",
                        })
                      }
                    >
                      Watch the walkthrough
                    </a>
                  </Button>
                </div>
                <div className="rounded-2xl border border-mint-200 bg-white p-6 flex flex-col">
                  <Wrench size={28} className="text-mint-800 mb-4" />
                  <h3 className="text-lg font-bold text-mint-950 mb-2">Try it, no signup</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">
                    Play around with a real, working copy of GaragePro loaded with sample data.
                  </p>
                  <Button asChild variant="outline" className="rounded-full border-foreground/30">
                    <Link
                      to="/demo"
                      onClick={() =>
                        trackCta("Try the Sandbox", { location: "about_cta", destination: "demo" })
                      }
                    >
                      Open the sandbox
                    </Link>
                  </Button>
                </div>
                <div className="rounded-2xl border border-mint-200 bg-white p-6 flex flex-col">
                  <Rocket size={28} className="text-mint-800 mb-4" />
                  <h3 className="text-lg font-bold text-mint-950 mb-2">Just start</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">
                    Every feature unlocked for 14 days, no card required.
                  </p>
                  <Button asChild className="rounded-full">
                    <a
                      href={APP_SUBSCRIBE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackCta("Start Free", { location: "about_cta", destination: "subscribe" })
                      }
                    >
                      Start free
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PricingSection />
      </main>

      <Footer />
    </div>
  );
};

export default About;