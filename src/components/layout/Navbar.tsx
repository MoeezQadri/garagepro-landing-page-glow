
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#" className="flex items-center">
          <span className="text-2xl font-bold text-garage-700">
            Garage<span className="text-garage-500">Pro</span>
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground/80 hover:text-garage-600 transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-foreground/80 hover:text-garage-600 transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="text-foreground/80 hover:text-garage-600 transition-colors">
            Testimonials
          </a>
          <a href="#contact" className="text-foreground/80 hover:text-garage-600 transition-colors">
            Contact
          </a>
          <Button variant="outline" className="border-garage-400 text-garage-600 hover:bg-garage-50">
            Login
          </Button>
          <Button className="bg-garage-600 hover:bg-garage-700 text-white">
            Book Demo
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="px-4 py-2 text-foreground/80 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="px-4 py-2 text-foreground/80 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#testimonials" 
              className="px-4 py-2 text-foreground/80 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#contact" 
              className="px-4 py-2 text-foreground/80 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="w-full border-garage-400 text-garage-600 hover:bg-garage-50">
                Login
              </Button>
              <Button className="w-full bg-garage-600 hover:bg-garage-700 text-white">
                Book Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
