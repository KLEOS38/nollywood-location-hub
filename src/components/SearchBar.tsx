
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

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
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      // Default behavior if no onSearch function is provided
      navigate(`/locations?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-20 py-5 h-11 bg-muted/50"
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
  );
};

export default SearchBar;
