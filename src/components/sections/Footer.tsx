
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-mint-950 text-white">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="#0d2424" strokeWidth="1.5" fill="none"/>
                  <path d="M16 9C14 7 12 12 10 15C8 18 6 15 6 15" stroke="#0d2424" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  <path d="M12 12V21" stroke="#0d2424" strokeWidth="1" strokeDasharray="2 2" fill="none"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">
                GARAGEPRO
              </span>
            </div>
            <p className="text-mint-200 mb-4">
              The complete software solution for auto shops and garages.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-mint-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-mint-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-mint-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-mint-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-mint-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-mint-300 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-mint-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-mint-300 hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-mint-300 hover:text-white transition-colors">Knowledge Base</a></li>
              <li><a href="#" className="text-mint-300 hover:text-white transition-colors">Guides</a></li>
              <li><a href="#" className="text-mint-300 hover:text-white transition-colors">Webinars</a></li>
              <li><a href="#" className="text-mint-300 hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-mint-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-mint-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-mint-300 hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="text-mint-300 hover:text-white transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-mint-800 text-center">
          <p className="text-mint-300">
            &copy; {currentYear} GaragePro, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
