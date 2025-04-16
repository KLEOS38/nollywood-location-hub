
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  User, 
  LogOut, 
  Home, 
  MapPin, 
  Heart, 
  HelpCircle,
  Settings,
  UserPlus
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from "@/components/SearchBar";
import { MOCK_LOCATIONS } from "@/data/mockLocations";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };
  
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSearch = (query: string) => {
    navigate(`/locations?search=${encodeURIComponent(query)}`);
    closeMobileMenu();
  };

  return (
    <header className={`sticky top-0 z-40 w-full ${isScrolled ? 'bg-white/95 shadow-sm backdrop-blur-md' : 'bg-white'} transition-all duration-200`}>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <span className="text-xl font-bold">Film<span className="text-burgundy">Loca</span></span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-4">
            <SearchBar 
              placeholder="Search Locations..." 
              onSearch={handleSearch}
              className="w-full"
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/locations')}>
              Browse Locations
            </Button>
            {(profile?.user_type === 'homeowner' || !user) && (
              <Button variant="ghost" onClick={() => navigate('/list-property')}>
                List Your Property
              </Button>
            )}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                    <Avatar>
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback>{getInitials(profile?.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{profile?.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  {profile?.user_type === 'homeowner' && (
                    <DropdownMenuItem onClick={() => navigate('/list-property')}>
                      <Home className="mr-2 h-4 w-4" />
                      <span>List a Property</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate('/locations')}>
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>Browse Locations</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Favorites</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/help')}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help Center</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/auth')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/auth?tab=signup')} className="bg-burgundy hover:bg-burgundy/90 text-white">
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2" 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 top-16 z-50 bg-white md:hidden">
              <div className="flex flex-col p-4 h-full overflow-y-auto">
                <div className="mb-4">
                  <SearchBar 
                    placeholder="Search Locations..." 
                    onSearch={handleSearch}
                    className="w-full"
                  />
                </div>
                
                <nav className="flex flex-col space-y-4">
                  <Link 
                    to="/locations" 
                    className="flex items-center py-3 text-base hover:text-burgundy" 
                    onClick={closeMobileMenu}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Browse Locations
                  </Link>
                  {(profile?.user_type === 'homeowner' || !user) && (
                    <Link 
                      to="/list-property" 
                      className="flex items-center py-3 text-base hover:text-burgundy" 
                      onClick={closeMobileMenu}
                    >
                      <Home className="mr-2 h-4 w-4" />
                      List Your Property
                    </Link>
                  )}
                  <Link 
                    to="/how-it-works" 
                    className="flex items-center py-3 text-base hover:text-burgundy" 
                    onClick={closeMobileMenu}
                  >
                    How It Works
                  </Link>
                </nav>
                
                <div className="mt-4 pt-4 border-t">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center mb-4">
                        <Avatar className="mr-3">
                          <AvatarImage src={profile?.avatar_url} />
                          <AvatarFallback>{getInitials(profile?.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{profile?.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={() => {
                            navigate('/profile');
                            closeMobileMenu();
                          }}
                        >
                          <User className="mr-2 h-4 w-4" />
                          My Profile
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={() => {
                            navigate('/help');
                            closeMobileMenu();
                          }}
                        >
                          <HelpCircle className="mr-2 h-4 w-4" />
                          Help Center
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={() => {
                            handleLogout();
                            closeMobileMenu();
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Button 
                        className="w-full" 
                        variant="outline" 
                        onClick={() => {
                          navigate('/auth');
                          closeMobileMenu();
                        }}
                      >
                        Login
                      </Button>
                      <Button 
                        className="w-full bg-burgundy hover:bg-burgundy/90 text-white" 
                        onClick={() => {
                          navigate('/auth?tab=signup');
                          closeMobileMenu();
                        }}
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
