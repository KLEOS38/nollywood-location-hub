
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterBar from "@/components/FilterBar";
import LocationCard from "@/components/LocationCard";
import { MOCK_LOCATIONS } from "@/data/mockLocations";
import { Helmet } from 'react-helmet-async';
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const LocationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filteredLocations, setFilteredLocations] = useState(MOCK_LOCATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');
  
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
  
  // Get search query from URL on initial load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');
    
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);
  
  // Filter locations when search or filters change
  useEffect(() => {
    let results = getLocations();
    
    // Apply search filter
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      results = results.filter(location => 
        location.title.toLowerCase().includes(lowerCaseQuery) ||
        location.neighborhood.toLowerCase().includes(lowerCaseQuery) ||
        location.type.toLowerCase().includes(lowerCaseQuery) ||
        (location.amenities && location.amenities.some(amenity => 
          amenity.toLowerCase().includes(lowerCaseQuery)
        ))
      );
    }
    
    // Apply type filter
    if (selectedType && selectedType !== 'all_types') {
      results = results.filter(location => 
        location.type.toLowerCase() === selectedType.toLowerCase()
      );
    }
    
    // Apply neighborhood filter
    if (selectedNeighborhood && selectedNeighborhood !== 'all_areas') {
      results = results.filter(location => 
        location.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortBy === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      results.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredLocations(results);
  }, [searchQuery, selectedType, selectedNeighborhood, sortBy, location.search]);
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate(`/locations?search=${encodeURIComponent(query)}`, { replace: true });
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedNeighborhood('');
    setSortBy('default');
    navigate('/locations', { replace: true });
    
    toast({
      title: "Filters reset",
      description: "All search filters have been cleared.",
    });
  };
  
  // Get unique property types for filter
  const propertyTypes = [...new Set(getLocations().map(location => location.type))];
  
  // Get unique neighborhoods for filter
  const neighborhoods = [...new Set(getLocations().map(location => location.neighborhood))];

  return (
    <>
      <Helmet>
        <title>Browse Filming Locations in Lagos | Nollywood Locations</title>
        <meta name="description" content="Find the perfect house, apartment, or studio for your next Nollywood film production in Lagos. All locations verified with filmmaker reviews." />
        <link rel="canonical" href="https://www.nollywoodlocations.com/locations" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <FilterBar />
        
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            <section aria-labelledby="locations-heading">
              <div className="mb-6">
                <h1 id="locations-heading" className="text-2xl font-bold mb-2">Filming Locations in Lagos</h1>
                <p className="text-muted-foreground">
                  {filteredLocations.length} {filteredLocations.length === 1 ? 'location' : 'locations'} available for your next production
                </p>
              </div>
              
              {/* Search and Filters */}
              <div className="mb-8 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <SearchBar 
                      placeholder="Search by location name, area, or amenities..." 
                      onSearch={handleSearch}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_types">All Types</SelectItem>
                        {propertyTypes.map(type => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Neighborhood" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_areas">All Areas</SelectItem>
                        {neighborhoods.map(neighborhood => (
                          <SelectItem key={neighborhood} value={neighborhood.toLowerCase()}>
                            {neighborhood}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Featured</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="rating-desc">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Active filters */}
                {(searchQuery || selectedType || selectedNeighborhood) && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {searchQuery && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 rounded-full text-xs"
                        onClick={() => { setSearchQuery(''); navigate('/locations'); }}
                      >
                        Search: {searchQuery} ×
                      </Button>
                    )}
                    {selectedType && selectedType !== 'all_types' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 rounded-full text-xs"
                        onClick={() => setSelectedType('')}
                      >
                        Type: {selectedType} ×
                      </Button>
                    )}
                    {selectedNeighborhood && selectedNeighborhood !== 'all_areas' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 rounded-full text-xs"
                        onClick={() => setSelectedNeighborhood('')}
                      >
                        Area: {selectedNeighborhood} ×
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={resetFilters}
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Results */}
              {filteredLocations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredLocations.map((location) => (
                    <LocationCard key={location.id} {...location} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h2 className="text-xl font-semibold mb-2">No locations found</h2>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any locations matching your search criteria.
                  </p>
                  <Button onClick={resetFilters}>
                    Clear all filters
                  </Button>
                </div>
              )}
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default LocationsPage;
