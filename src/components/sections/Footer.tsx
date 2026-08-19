
import { EnvelopeSimple as Mail } from "@phosphor-icons/react";
import Logo from "@/components/brand/Logo";
import { BLOG_URL, CALENDLY_URL, CONTACT_EMAIL } from "@/lib/links";
import { trackCta } from "@/lib/analytics";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-mint-950 text-mint-100">
      <div className="container px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          <div className="text-mint-100">
            <Logo invert />
            <p className="text-mint-300 mt-4 max-w-sm text-sm leading-relaxed">
              Auto repair shop software built for independent shops. Run the shop, keep customers coming back, grow without the busywork.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-4">
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#features" className="text-mint-300 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-mint-300 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#demo" className="text-mint-300 hover:text-white transition-colors">
                  Demo
                </a>
              </li>
              <li>
                <a href="/faq" className="text-mint-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mint-300 hover:text-white transition-colors"
                  onClick={() =>
                    trackCta(
                      "Book a Walkthrough",
                      { location: "footer", destination: "calendly" },
                      "book_demo_click"
                    )
                  }
                >
                  Book a Walkthrough
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-4">
              About
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/about" className="text-mint-300 hover:text-white transition-colors">
                  About GaragePro
                </a>
              </li>
              <li>
                <a
                  href="/about/auto-repair-estimate-software"
                  className="text-mint-300 hover:text-white transition-colors"
                >
                  Create Estimates
                </a>
              </li>
              <li>
                <a
                  href="/about/auto-repair-invoicing-software"
                  className="text-mint-300 hover:text-white transition-colors"
                >
                  Create Invoices
                </a>
              </li>
              <li>
                <a
                  href="/about/free-auto-repair-shop-software"
                  className="text-mint-300 hover:text-white transition-colors"
                >
                  Free Invoicing software
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-4">
              More
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={BLOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mint-300 hover:text-white transition-colors"
                  onClick={() =>
                    trackCta("Blog", { location: "footer", destination: "blog" }, "outbound_click")
                  }
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 text-mint-300 hover:text-white transition-colors"
                  onClick={() =>
                    trackCta("Email Support", { location: "footer", destination: "email" })
                  }
                >
                  <Mail size={14} />
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-mint-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-mint-400">
          <p>&copy; {currentYear} GaragePro. All rights reserved.</p>
          <p>No contracts. Cancel anytime.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
