
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { MOCK_LOCATIONS } from "@/data/mockLocations";
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "@/components/ui/command";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar = ({ 
  placeholder = "Search for locations...", 
  onSearch,
  className = "" 
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      // Default behavior if no onSearch function is provided
      navigate(`/locations?search=${encodeURIComponent(searchQuery)}`);
    }
    setOpen(false);
  };

  // Get custom properties from localStorage if available
  const getLocations = () => {
    try {
      const customProperties = JSON.parse(localStorage.getItem('properties') || '[]');
      return [...MOCK_LOCATIONS, ...customProperties];
    } catch (error) {
      console.error('Error loading custom properties:', error);
      return MOCK_LOCATIONS;
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const allLocations = getLocations();
      const lowerCaseQuery = searchQuery.toLowerCase();
      
      const results = allLocations.filter(location => 
        location.title.toLowerCase().includes(lowerCaseQuery) ||
        location.neighborhood.toLowerCase().includes(lowerCaseQuery) ||
        location.type.toLowerCase().includes(lowerCaseQuery) ||
        (location.amenities && location.amenities.some((amenity: string) => 
          amenity.toLowerCase().includes(lowerCaseQuery)
        ))
      );
      
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <>
      <form onSubmit={handleSearch} className={`relative ${className}`}>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-20 py-5 h-11 bg-muted/50"
          onClick={() => setOpen(true)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Button 
          type="submit"
          size="sm"
          variant="ghost"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 hover:bg-muted"
        >
          Search
        </Button>
      </form>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search locations, neighborhoods, amenities..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          {searchResults.length === 0 && searchQuery && (
            <CommandEmpty>No results found for "{searchQuery}"</CommandEmpty>
          )}
          {searchResults.length > 0 && (
            <CommandGroup heading="Locations">
              {searchResults.map((location) => (
                <CommandItem
                  key={location.id}
                  onSelect={() => {
                    navigate(`/locations/${location.id}`);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded overflow-hidden mr-2 flex-shrink-0">
                      <img 
                        src={location.images[0]} 
                        alt={location.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-medium">{location.title}</span>
                      <span className="text-xs text-muted-foreground ml-2">{location.neighborhood}</span>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {searchQuery && (
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  navigate(`/locations?search=${encodeURIComponent(searchQuery)}`);
                  setOpen(false);
                }}
              >
                <span>View all results for "{searchQuery}"</span>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
