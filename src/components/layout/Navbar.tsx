import { useState } from "react";
import { Button } from "@/components/ui/button";
import { List as Menu, X } from "@phosphor-icons/react";
import Logo from "@/components/brand/Logo";
import { APP_SUBSCRIBE_URL, BLOG_URL } from "@/lib/links";
import { trackCta } from "@/lib/analytics";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "/demo", label: "Demo" },
  { href: "#pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

const aboutLinks = [
  { href: "/about", label: "About GaragePro" },
  { href: "/about/auto-repair-estimate-software", label: "Estimate software" },
  { href: "/about/auto-repair-invoicing-software", label: "Invoicing software" },
  { href: "/about/free-auto-repair-shop-software", label: "Free software" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm py-3 transition-all duration-300">
      <div className="container flex items-center justify-between">
        <a href="/" className="text-mint-800">
          <Logo />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <div className="relative group">
            <a
              href="/about"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              About
            </a>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 hidden group-hover:block group-focus-within:block">
              <ul className="min-w-56 rounded-xl border border-mint-200 bg-white p-2 shadow-lg">
                {aboutLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            onClick={() =>
              trackCta("Blog", { location: "navbar", destination: "blog" }, "outbound_click")
            }
          >
            Blog
          </a>
          <Button asChild className="btn-signage bg-foreground hover:bg-foreground/90 text-background">
            <a
              href={APP_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCta("Start Free", { location: "navbar", destination: "subscribe" })}
            >
              Start Free
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
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
            <div className="border-t pt-3">
              <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                About
              </p>
              {aboutLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-foreground/80 hover:bg-muted rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-foreground/80 hover:bg-muted rounded-md"
              onClick={() => {
                trackCta("Blog", { location: "navbar_mobile", destination: "blog" }, "outbound_click");
                setIsMobileMenuOpen(false);
              }}
            >
              Blog
            </a>
            <Button asChild className="w-full rounded-full bg-foreground hover:bg-foreground/90 text-background">
              <a
                href={APP_SUBSCRIBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackCta("Start Free", { location: "navbar_mobile", destination: "subscribe" })
                }
              >
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
