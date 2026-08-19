import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, CursorClick } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { CALENDLY_URL, APP_SUBSCRIBE_URL } from "@/lib/links";
import { trackCta, trackEvent } from "@/lib/analytics";
import demoVideo from "@/assets/garagepro-demo.mp4.asset.json";

const DemoSection = () => {
  return (
    <section id="demo" className="py-20 bg-mint-50/60 border-y border-mint-100">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-4">
            See it running in a real shop, in under 5 minutes.
          </h2>
          <p className="text-lg text-muted-foreground whitespace-pre-line">
            No sales pitch, just the job board, an invoice being built from an actual job, and the reminder system in action. See exactly what you'd be using before you sign up for anything.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl bg-foreground">
            <video
              src={demoVideo.url}
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto block"
              aria-label="GaragePro product walkthrough"
              onPlay={(e) => {
                const el = e.currentTarget as HTMLVideoElement & { dataset: { tracked?: string } };
                if (el.dataset.tracked) return;
                el.dataset.tracked = "1";
                trackEvent("video_play", {
                  label: "GaragePro Demo Video",
                  location: "demo",
                });
              }}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Button asChild size="lg" className="rounded-full">
              <Link
                to="/demo"
                onClick={() =>
                  trackCta("Try the Interactive Demo", { location: "demo", destination: "sandbox" })
                }
              >
                <CursorClick size={16} className="mr-2" />
                Try the Interactive Demo
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
                    "Book a Live Walkthrough",
                    { location: "demo", destination: "calendly" },
                    "book_demo_click"
                  )
                }
              >
                <Calendar size={16} className="mr-2" />
                Book a Live Walkthrough
              </a>
            </Button>
          </div>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Build a real invoice in a sample shop — no login, no setup.
          </p>

          <div className="mt-8 text-center">
            <a
              href={APP_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-mint-700 hover:text-mint-900 font-medium"
              onClick={() =>
                trackCta("Start Free Trial", { location: "demo", destination: "subscribe" })
              }
            >
              Or start your 14-day free trial <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;