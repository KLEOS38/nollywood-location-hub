
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-nollywood-primary text-2xl font-bold">Nollywood</span>
          <span className="text-nollywood-secondary text-2xl font-bold">Locations</span>
        </Link>

        {!isMobile && (
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search for locations in Lagos..." 
                className="pl-10 pr-4 py-2 w-full rounded-full border-muted"
              />
            </div>
          </div>
        )}

        {isMobile ? (
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        ) : (
          <nav className="flex items-center space-x-1">
            <Link to="/locations">
              <Button variant="ghost">Browse Locations</Button>
            </Link>
            <Link to="/become-a-host">
              <Button variant="ghost">List Your Property</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="icon" className="rounded-full">
                <User size={18} />
              </Button>
            </Link>
          </nav>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-border shadow-md z-50">
          <div className="p-4 flex flex-col space-y-2">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search for locations in Lagos..." 
                className="pl-10 pr-4 py-2 w-full rounded-full border-muted"
              />
            </div>
            <Link to="/locations" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start">Browse Locations</Button>
            </Link>
            <Link to="/become-a-host" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start">List Your Property</Button>
            </Link>
            <Link to="/login" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start">Log in</Button>
            </Link>
            <Link to="/signup" onClick={toggleMenu}>
              <Button className="w-full">Sign up</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
