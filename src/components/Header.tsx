
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import SearchBar from "@/components/SearchBar";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setIsLoggedIn(user.isLoggedIn || false);
        setUserName(user.name || user.email || '');
        setUserType(user.userType || '');
      } catch (error) {
        console.error('Error parsing user data', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    setUserType('');
    toggleMenu();
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-nollywood-primary text-2xl font-bold">Film</span>
          <span className="text-nollywood-secondary text-2xl font-bold">Loca</span>
        </Link>

        {!isMobile && (
          <div className="flex-1 max-w-md mx-4">
            <SearchBar />
          </div>
        )}

        {isMobile ? (
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? <X className="text-gray-700" /> : <Menu className="text-gray-700" />}
          </Button>
        ) : (
          <nav className="flex items-center space-x-1">
            <Link to="/locations">
              <Button variant="ghost" className="text-gray-700 hover:text-nollywood-primary">Browse Locations</Button>
            </Link>
            <Link to="/list-property">
              <Button variant="property" className="text-white hover:text-white">List Your Property</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" className="text-gray-700 hover:text-nollywood-primary">About Us</Button>
            </Link>
            {isLoggedIn ? (
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-nollywood-primary/30 hover:border-nollywood-primary"
                onClick={() => navigate('/profile')}
                aria-label="Profile"
                title={`${userName}'s Profile`}
              >
                <User size={18} className="text-nollywood-primary" />
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="icon" className="rounded-full" aria-label="Log in">
                  <User size={18} className="text-gray-700" />
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
              <Button variant="ghost" className="w-full justify-start text-gray-700">Browse Locations</Button>
            </Link>
            <Link to="/list-property" onClick={toggleMenu}>
              <Button variant="property" className="w-full justify-start text-white">List Your Property</Button>
            </Link>
            <Link to="/about" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start text-gray-700">About Us</Button>
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start text-gray-700">
                    My Profile {userType === 'homeowner' ? '(Property Owner)' : '(Filmmaker)'}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start text-gray-700">Log in</Button>
                </Link>
                <Link to="/auth?tab=signup" onClick={toggleMenu}>
                  <Button className="w-full bg-nollywood-primary hover:bg-nollywood-primary/90 text-white">Sign up</Button>
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
