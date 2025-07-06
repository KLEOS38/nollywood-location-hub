
import React from 'react';
import { Star, MapPin, Users } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import FavoriteButton from '@/components/favorites/FavoriteButton';

export interface LocationProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  rating: number;
  reviewCount: number;
  neighborhood: string;
  isVerified?: boolean;
  maxGuests?: number;
  type?: string;
  amenities?: string[];
}

interface LocationCardProps {
  location: LocationProps;
}

const LocationCard = ({ location }: LocationCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        <img 
          src={location.imageUrl} 
          alt={location.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {location.isVerified && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            Verified
          </div>
        )}
        <div className="absolute top-2 right-2">
          <FavoriteButton propertyId={location.id} />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate">{location.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location.neighborhood}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span>{location.rating.toFixed(1)}</span>
            <span className="text-muted-foreground ml-1">({location.reviewCount})</span>
          </div>
          {location.maxGuests && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>Up to {location.maxGuests} guests</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">₦{location.price.toLocaleString()}</span>
          {location.isVerified && (
            <Badge variant="secondary">Verified</Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
