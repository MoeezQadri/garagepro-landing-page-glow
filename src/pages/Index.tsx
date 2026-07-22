
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/gp/HeroSection";
import ProblemSection from "@/components/sections/gp/ProblemSection";
import SolutionSection from "@/components/sections/gp/SolutionSection";
import FeaturesSection from "@/components/sections/gp/FeaturesSection";
import ByNumbersSection from "@/components/sections/gp/ByNumbersSection";
import WhyGaragePro from "@/components/sections/gp/WhyGaragePro";
import DemoSection from "@/components/sections/gp/DemoSection";
import PricingSection from "@/components/sections/gp/PricingSection";
import FAQSection from "@/components/sections/gp/FAQSection";
import FinalCTASection from "@/components/sections/gp/FinalCTASection";
import { APP_SIGNUP_URL } from "@/lib/links";

const Index = () => {
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "I only have 2\u20133 people on my team \u2014 why would I need a 50-seat plan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our seat limits are ceilings, not requirements. Enterprise is priced for the automation and outreach tools inside it, not for how many people you employ \u2014 a small team that wants the full toolkit is welcome there.",
          },
        },
        {
          "@type": "Question",
          name: "Can I still send an invoice to a customer on the Basic plan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes \u2014 you can download and share invoices and estimates manually. Basic just doesn't include automated sending or reminder sequences.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to set up the automation myself?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No \u2014 once you're on Professional or Enterprise, reach out to us and our team will configure your reminders, notifications, and campaigns for you.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a contract or lock-in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Month-to-month, cancel anytime. Annual billing available at a 17% discount if you'd rather lock in savings.",
          },
        },
      ],
    };

    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "GaragePro",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Auto repair shop software for small shops. Job board, invoicing, inventory, and technician tracking \u2014 all included from day one.",
      offers: [
        { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
        { "@type": "Offer", name: "Basic", price: "29", priceCurrency: "USD" },
        { "@type": "Offer", name: "Professional", price: "79", priceCurrency: "USD" },
        { "@type": "Offer", name: "Enterprise", price: "199", priceCurrency: "USD" },
      ],
      url: APP_SIGNUP_URL,
    };

    const scripts: HTMLScriptElement[] = [];
    [faqSchema, softwareSchema].forEach((data) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      scripts.push(s);
    });
    return () => {
      scripts.forEach((s) => document.head.removeChild(s));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <ByNumbersSection />
        <WhyGaragePro />
        <DemoSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
