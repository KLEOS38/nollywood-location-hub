
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export interface LocationProps {
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

const LocationCard = ({ 
  id, 
  title, 
  type, 
  neighborhood, 
  price, 
  rating, 
  reviewCount, 
  imageUrl,
  amenities,
  isVerified
}: LocationProps) => {
  return (
    <Link to={`/locations/${id}`}>
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md location-card-hover">
        <div className="relative aspect-[4/3]">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          {isVerified && (
            <Badge className="absolute top-2 right-2 bg-nollywood-secondary text-white">
              Verified
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-base line-clamp-1">{title}</h3>
            <div className="flex items-center text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({reviewCount})</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{neighborhood}, Lagos</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="bg-muted text-xs font-normal">
                {amenity}
              </Badge>
            ))}
            {amenities.length > 3 && (
              <Badge variant="outline" className="bg-muted text-xs font-normal">
                +{amenities.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">{type}</div>
            <div className="font-semibold">
              ₦{price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/day</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LocationCard;
