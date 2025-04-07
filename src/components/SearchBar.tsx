
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

const SearchBar = ({ 
  placeholder = "Search for locations in Lagos...", 
  className = "",
  onSearch
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const suggestions = [
    { value: 'lekki', label: 'Lekki' },
    { value: 'ikoyi', label: 'Ikoyi' },
    { value: 'victoria-island', label: 'Victoria Island' },
    { value: 'yaba', label: 'Yaba' },
    { value: 'surulere', label: 'Surulere' },
    { value: 'studio', label: 'Studio' },
    { value: 'mansion', label: 'Mansion' },
    { value: 'apartment', label: 'Apartment' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        navigate(`/locations?search=${encodeURIComponent(searchQuery)}`);
      }
      setOpen(false);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    } else {
      navigate(`/locations?search=${encodeURIComponent(value)}`);
    }
    setOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholder}
                className="pl-10 pr-16 py-2 w-full rounded-full border-muted"
                onClick={() => setOpen(true)}
              />
              <Button 
                type="submit" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-8 px-4"
                variant="default"
                size="sm"
              >
                Search
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[calc(100vw-2rem)] sm:w-[400px]" align="start">
            <Command>
              <CommandInput placeholder="Type to search..." value={searchQuery} onValueChange={setSearchQuery} />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Popular Searches">
                  {suggestions.map((suggestion) => (
                    <CommandItem 
                      key={suggestion.value}
                      onSelect={() => handleSuggestionClick(suggestion.value)}
                    >
                      {suggestion.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </form>
    </div>
  );
};

export default SearchBar;
