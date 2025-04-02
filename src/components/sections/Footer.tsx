
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="text-2xl font-bold text-white mb-4">
              Garage<span className="text-garage-400">Pro</span>
            </div>
            <p className="text-muted-foreground mb-4">
              The complete software solution for auto shops and garages.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Knowledge Base</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Guides</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Webinars</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-white transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-muted-foreground">
            &copy; {currentYear} GaragePro, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
