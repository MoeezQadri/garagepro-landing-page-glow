import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { APP_SIGNUP_URL } from "@/lib/links";

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
            className="bg-white text-mint-900 hover:bg-mint-100"
          >
            <a href={APP_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
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