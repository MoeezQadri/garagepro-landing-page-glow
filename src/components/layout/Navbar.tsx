
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
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border border-mint-800 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M16 9C14 7 12 12 10 15C8 18 6 15 6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <path d="M12 12V21" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" fill="none"/>
            </svg>
          </div>
          <span className="text-2xl font-bold text-black">
            GARAGEPRO
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground/80 hover:text-mint-600 transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-foreground/80 hover:text-mint-600 transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="text-foreground/80 hover:text-mint-600 transition-colors">
            Testimonials
          </a>
          <a href="#contact" className="text-foreground/80 hover:text-mint-600 transition-colors">
            Contact
          </a>
          <Button variant="outline" className="border-mint-400 text-mint-600 hover:bg-mint-50">
            Login
          </Button>
          <Button className="bg-mint-600 hover:bg-mint-700 text-white">
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
              <Button variant="outline" className="w-full border-mint-400 text-mint-600 hover:bg-mint-50">
                Login
              </Button>
              <Button className="w-full bg-mint-600 hover:bg-mint-700 text-white">
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
