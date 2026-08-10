import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "@phosphor-icons/react";
import { CALENDLY_URL, APP_SUBSCRIBE_URL } from "@/lib/links";
import demoVideo from "@/assets/garagepro-demo.mp4.asset.json";

const DemoSection = () => {
  return (
    <section id="demo" className="py-20 bg-mint-50/60 border-y border-mint-100">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-4">
            See it running in a real shop, in under 2 minutes.
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
            />
          </div>

          <div className="flex justify-center mt-8">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-foreground/30 text-foreground hover:bg-muted"
            >
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <Calendar size={16} className="mr-2" />
                Book a Live Walkthrough
              </a>
            </Button>
          </div>

          <div className="mt-8 text-center">
            <a
              href={APP_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-mint-700 hover:text-mint-900 font-medium"
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