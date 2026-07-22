import { Button } from "@/components/ui/button";
import { Play, Calendar, ArrowRight } from "lucide-react";
import { CALENDLY_URL, APP_SIGNUP_URL } from "@/lib/links";

const DemoSection = () => {
  return (
    <section id="demo" className="py-20 bg-mint-50/60 border-y border-mint-100">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-mint-950 mb-4">
            See it running in a real shop, in under 2 minutes.
          </h2>
          <p className="text-lg text-muted-foreground">
            No sales pitch — just the job board, an invoice being built from an actual job, and the reminder system in action. See exactly what you'd be using before you sign up for anything.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Video placeholder */}
          <div className="relative rounded-2xl overflow-hidden border border-mint-200 shadow-xl aspect-video bg-mint-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <button
                  className="w-20 h-20 rounded-full bg-white/95 hover:bg-white text-mint-800 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                  aria-label="Play demo video"
                >
                  <Play size={32} className="ml-1" fill="currentColor" />
                </button>
                <p className="text-mint-100 mt-4 text-sm">2-minute product walkthrough</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              className="bg-mint-700 hover:bg-mint-800 text-white"
            >
              <Play size={16} className="mr-2" />
              Watch the 2-Minute Demo
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-mint-400 text-mint-800 hover:bg-mint-50"
            >
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <Calendar size={16} className="mr-2" />
                Book a Live Walkthrough
              </a>
            </Button>
          </div>

          <div className="mt-8 text-center">
            <a
              href={APP_SIGNUP_URL}
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