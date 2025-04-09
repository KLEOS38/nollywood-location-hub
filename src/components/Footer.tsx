
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-muted-foreground hover:text-nollywood-primary">Help Center</Link></li>
              <li><Link to="/safety" className="text-muted-foreground hover:text-nollywood-primary">Safety Information</Link></li>
              <li><Link to="/cancellation" className="text-muted-foreground hover:text-nollywood-primary">Cancellation Options</Link></li>
              <li><Link to="/covid" className="text-muted-foreground hover:text-nollywood-primary">COVID-19 Guidelines</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link to="/filmmakers" className="text-muted-foreground hover:text-nollywood-primary">For Filmmakers</Link></li>
              <li><Link to="/homeowners" className="text-muted-foreground hover:text-nollywood-primary">For Property Owners</Link></li>
              <li><Link to="/forum" className="text-muted-foreground hover:text-nollywood-primary">Community Forum</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-nollywood-primary">Filming Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="text-muted-foreground hover:text-nollywood-primary">How it Works</Link></li>
              <li><Link to="/news" className="text-muted-foreground hover:text-nollywood-primary">Newsroom</Link></li>
              <li><Link to="/investors" className="text-muted-foreground hover:text-nollywood-primary">Investors</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-nollywood-primary">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect with Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-nollywood-primary">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-nollywood-primary">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-nollywood-primary">
                <Facebook size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-nollywood-primary">
                <Youtube size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">Subscribe to our newsletter for updates on new locations and filming tips.</p>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">© 2025 Film Loca. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-nollywood-primary">Privacy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-nollywood-primary">Terms</Link>
            <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-nollywood-primary">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
