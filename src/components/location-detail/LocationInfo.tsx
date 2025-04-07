
import React from 'react';
import { Check, Zap, Wind, Shield, Car, Wifi, Tv } from 'lucide-react';

interface LocationProps {
  id: string;
  title: string;
  type: string;
  neighborhood: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  amenities: string[];
  isVerified: boolean;
}

interface LocationInfoProps {
  location: LocationProps;
}

const LocationInfo = ({ location }: LocationInfoProps) => {
  // Get the appropriate icon component based on amenity name
  const getIconComponent = (amenity: string) => {
    switch (amenity) {
      case 'Generator': return <Zap className="h-5 w-5 text-nollywood-primary" />;
      case 'AC': return <Wind className="h-5 w-5 text-nollywood-primary" />;
      case 'Security': return <Shield className="h-5 w-5 text-nollywood-primary" />;
      case 'Parking': return <Car className="h-5 w-5 text-nollywood-primary" />;
      case 'Wifi': return <Wifi className="h-5 w-5 text-nollywood-primary" />;
      case 'TV/Monitors': return <Tv className="h-5 w-5 text-nollywood-primary" />;
      default: return <Check className="h-5 w-5 text-nollywood-primary" />;
    }
  };
  
  return (
    <>
      {/* About */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About this location</h2>
        <p className="text-muted-foreground mb-4">
          A stunning {location.type.toLowerCase()} located in the heart of {location.neighborhood}, perfect for Nollywood productions. This location offers a blend of modern elegance and functional space, making it ideal for various filming needs.
        </p>
        <p className="text-muted-foreground">
          The property features excellent natural lighting throughout the day, spacious rooms for equipment setup, and quiet surroundings for clean audio recording. With its distinctive architecture and versatile spaces, this location has been featured in several notable Nollywood productions.
        </p>
      </div>
      
      {/* Amenities */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Amenities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {location.amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-2">
              {getIconComponent(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LocationInfo;
