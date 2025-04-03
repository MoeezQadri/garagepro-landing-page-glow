
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { Link } from "react-router-dom";
import { useCMS } from "@/contexts/CMSContext";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const Index = () => {
  const { isAdmin } = useCMS();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      
      {/* Admin button - visible only to admin users */}
      {isAdmin && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button asChild className="rounded-full w-12 h-12 p-0">
            <Link to="/admin">
              <Settings className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
