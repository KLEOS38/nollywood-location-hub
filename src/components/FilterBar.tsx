
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Camera, Home, Hotel, Warehouse, Building, Wind, Tv, Wifi, 
  Car, Shield, Zap, Calendar as CalendarIcon, SlidersHorizontal 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';

const propertyTypes = [
  { name: 'Apartment', icon: Home },
  { name: 'Villa', icon: Building },
  { name: 'Mansion', icon: Hotel },
  { name: 'Studio', icon: Camera },
  { name: 'Warehouse', icon: Warehouse }
];

const amenities = [
  { name: 'AC', icon: Wind },
  { name: 'TV/Monitors', icon: Tv },
  { name: 'Wifi', icon: Wifi },
  { name: 'Parking', icon: Car },
  { name: 'Security', icon: Shield },
  { name: 'Generator', icon: Zap }
];

const FilterBar = () => {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [priceRange, setPriceRange] = useState([20000, 150000]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const togglePropertyType = (type: string) => {
    setSelectedPropertyTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setDate(undefined);
    setPriceRange([20000, 150000]);
    setSelectedPropertyTypes([]);
    setSelectedAmenities([]);
  };

  const activeFiltersCount = 
    (date ? 1 : 0) + 
    (JSON.stringify(priceRange) !== JSON.stringify([20000, 150000]) ? 1 : 0) + 
    selectedPropertyTypes.length + 
    selectedAmenities.length;

  return (
    <div className="bg-white sticky top-16 z-40 border-b border-border py-4">
      <div className="container mx-auto px-4">
        {isMobile ? (
          <div className="flex justify-between">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal size={16} />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-nollywood-primary text-white">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[320px] p-4">
                <div className="space-y-4">
                  {/* Date Selection */}
                  <div>
                    <h4 className="font-medium mb-2">Date</h4>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium mb-2">Daily Price Range (₦)</h4>
                    <Slider
                      defaultValue={priceRange}
                      max={500000}
                      min={0}
                      step={5000}
                      onValueChange={(val) => setPriceRange(val as number[])}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>₦{priceRange[0].toLocaleString()}</span>
                      <span>₦{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Property Types */}
                  <div>
                    <h4 className="font-medium mb-2">Property Type</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {propertyTypes.map((type) => {
                        const isSelected = selectedPropertyTypes.includes(type.name);
                        return (
                          <Button
                            key={type.name}
                            variant={isSelected ? "default" : "outline"}
                            className={cn(
                              "h-auto py-2 justify-start gap-2",
                              isSelected && "bg-nollywood-primary text-white"
                            )}
                            onClick={() => togglePropertyType(type.name)}
                          >
                            <type.icon size={16} />
                            {type.name}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Amenities */}
                  <div>
                    <h4 className="font-medium mb-2">Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {amenities.map((amenity) => {
                        const isSelected = selectedAmenities.includes(amenity.name);
                        return (
                          <Button
                            key={amenity.name}
                            variant={isSelected ? "default" : "outline"}
                            className={cn(
                              "h-auto py-2 justify-start gap-2",
                              isSelected && "bg-nollywood-primary text-white"
                            )}
                            onClick={() => toggleAmenity(amenity.name)}
                          >
                            <amenity.icon size={16} />
                            {amenity.name}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <Button variant="ghost" onClick={clearFilters}>
                      Clear all
                    </Button>
                    <Button>
                      Show results
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon size={16} />
                  {date ? format(date, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            {/* Property Types */}
            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1">
              {propertyTypes.map((type) => {
                const isSelected = selectedPropertyTypes.includes(type.name);
                return (
                  <Button
                    key={type.name}
                    variant={isSelected ? "default" : "outline"}
                    className={cn(
                      "h-9 px-3 flex items-center gap-1.5",
                      isSelected && "bg-nollywood-primary text-white"
                    )}
                    onClick={() => togglePropertyType(type.name)}
                  >
                    <type.icon size={14} />
                    {type.name}
                  </Button>
                );
              })}
            </div>
            
            <div className="h-6 border-r border-border mx-1"></div>
            
            {/* Amenities */}
            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1">
              {amenities.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity.name);
                return (
                  <Button
                    key={amenity.name}
                    variant={isSelected ? "default" : "outline"}
                    className={cn(
                      "h-9 px-3 flex items-center gap-1.5",
                      isSelected && "bg-nollywood-primary text-white"
                    )}
                    onClick={() => toggleAmenity(amenity.name)}
                  >
                    <amenity.icon size={14} />
                    {amenity.name}
                  </Button>
                );
              })}
            </div>
            
            <div className="h-6 border-r border-border mx-1"></div>
            
            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-9 gap-1.5">
                  <CalendarIcon size={14} />
                  {date ? format(date, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            
            {/* Price Range */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-9">
                  ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="p-2">
                  <h4 className="font-medium mb-3">Daily Price Range</h4>
                  <Slider
                    defaultValue={priceRange}
                    max={500000}
                    min={0}
                    step={5000}
                    onValueChange={(val) => setPriceRange(val as number[])}
                  />
                  <div className="flex justify-between mt-2">
                    <span>₦{priceRange[0].toLocaleString()}</span>
                    <span>₦{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            {activeFiltersCount > 0 && (
              <Button variant="ghost" onClick={clearFilters} className="h-9 ml-auto">
                Clear filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
