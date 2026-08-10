import { Button } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react";
import { APP_SUBSCRIBE_URL } from "@/lib/links";
import { trackCta } from "@/lib/analytics";

const FinalCTASection = () => {
  return (
    <section className="py-20 bg-mint-950 text-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Stop losing time to paperwork you didn't sign up for.
          </h2>
          <p className="text-lg text-mint-200 mb-8">
            Try every feature free for 14 days. No card required.
          </p>
          <Button
            asChild
            size="lg"
            className="btn-signage bg-white text-foreground hover:bg-white/90"
          >
            <a
              href={APP_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackCta("Start Free Trial", { location: "final_cta", destination: "subscribe" })
              }
            >
              Start Free — 14 Days, Full Access
              <ArrowRight size={16} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;