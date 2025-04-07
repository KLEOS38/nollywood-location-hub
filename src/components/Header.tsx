
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import SearchBar from "@/components/SearchBar";

const Header = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setIsLoggedIn(user.isLoggedIn || false);
      setUserName(user.name || user.email || '');
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-nollywood-primary text-2xl font-bold">Nollywood</span>
          <span className="text-nollywood-secondary text-2xl font-bold">Locations</span>
        </Link>

        {!isMobile && (
          <div className="flex-1 max-w-md mx-4">
            <SearchBar />
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
            <Link to="/list-property">
              <Button variant="ghost">List Your Property</Button>
            </Link>
            {isLoggedIn ? (
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
                onClick={() => navigate('/profile')}
              >
                <User size={18} />
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="icon" className="rounded-full">
                  <User size={18} />
                </Button>
              </Link>
            )}
          </nav>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-border shadow-md z-50">
          <div className="p-4 flex flex-col space-y-2">
            <div className="relative mb-4">
              <SearchBar />
            </div>
            <Link to="/locations" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start">Browse Locations</Button>
            </Link>
            <Link to="/list-property" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start">List Your Property</Button>
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">My Profile</Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    localStorage.removeItem('user');
                    setIsLoggedIn(false);
                    toggleMenu();
                    window.location.reload();
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">Log in</Button>
                </Link>
                <Link to="/auth?tab=signup" onClick={toggleMenu}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
