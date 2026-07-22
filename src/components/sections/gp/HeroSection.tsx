import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardList, Wrench, FileText } from "lucide-react";
import { APP_SIGNUP_URL } from "@/lib/links";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 hero-gradient relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-mint-100 border border-mint-200 text-mint-800 text-xs font-medium">
              Built for independent shops
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-mint-950">
              Run your shop.{" "}
              <span className="heading-gradient">We'll handle the paperwork.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Invoicing, job tracking, inventory, and technician performance — all included from day one. No upgrade required to see your own job board.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-mint-700 hover:bg-mint-800 text-white"
              >
                <a href={APP_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                  Start Free — 14 Days, Full Access
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-mint-400 text-mint-800 hover:bg-mint-50"
              >
                <a href="#pricing">See Pricing</a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground pt-1">
              No credit card required · Cancel anytime
            </p>
          </div>

          {/* Visual: mock job board on a shop-floor tablet */}
          <div className="relative animate-fade-in-right">
            <div className="relative rounded-2xl border border-mint-200 bg-white shadow-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-mint-100 bg-mint-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-mint-900 font-semibold">
                  <ClipboardList size={18} />
                  <span>Job Board</span>
                </div>
                <span className="text-xs text-mint-700">Today · 4 active</span>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { car: "2019 Ford F-150", status: "In Progress", tech: "Marcus", color: "bg-amber-100 text-amber-800 border-amber-200" },
                  { car: "2021 Honda Civic", status: "Waiting", tech: "—", color: "bg-slate-100 text-slate-700 border-slate-200" },
                  { car: "2017 Toyota RAV4", status: "Ready for Pickup", tech: "Dee", color: "bg-mint-100 text-mint-800 border-mint-200" },
                  { car: "2020 Chevy Silverado", status: "In Progress", tech: "Luis", color: "bg-amber-100 text-amber-800 border-amber-200" },
                ].map((job) => (
                  <div
                    key={job.car}
                    className="flex items-center justify-between rounded-lg border border-mint-100 px-4 py-3 hover:bg-mint-50/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-mint-50 border border-mint-100 flex items-center justify-center text-mint-700">
                        <Wrench size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-mint-950">{job.car}</p>
                        <p className="text-xs text-muted-foreground">Tech: {job.tech}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${job.color}`}>
                      {job.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden sm:flex bg-white rounded-xl shadow-lg p-3 border border-mint-100 items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-mint-100 flex items-center justify-center text-mint-700">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Invoice #1042</p>
                <p className="text-sm font-semibold text-mint-950">Sent · Paid</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;