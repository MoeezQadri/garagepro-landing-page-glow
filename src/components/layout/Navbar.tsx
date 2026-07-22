
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "@/components/brand/Logo";
import { APP_SIGNUP_URL, BLOG_URL } from "@/lib/links";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Demo" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

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
        isScrolled ? "bg-white/95 backdrop-blur shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#" className="text-mint-800">
          <Logo />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? "text-foreground/80" : "text-white/90"}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? "text-foreground/80" : "text-white/90"}`}
          >
            Blog
          </a>
          <Button asChild className="btn-signage bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href={APP_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
              Start Free
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 ${isScrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-foreground/80 hover:bg-muted rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-foreground/80 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </a>
            <Button asChild className="w-full bg-mint-700 hover:bg-mint-800 text-white">
              <a href={APP_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                Start Free
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
