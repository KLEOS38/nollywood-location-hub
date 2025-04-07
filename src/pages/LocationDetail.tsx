
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, MapPin, Star, Check, Users, Wind, Tv, Wifi, 
  Car, Shield, Zap, Share2, Heart, ArrowLeft, MessageSquare
} from 'lucide-react';
import { getLocationById, getRelatedLocations } from "@/data/mockLocations";
import LocationCard from "@/components/LocationCard";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const location = getLocationById(id || "");
  const relatedLocations = getRelatedLocations(id || "");
  
  if (!location) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Location not found</h1>
            <Link to="/locations">
              <Button>Browse all locations</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? "This location has been removed from your favorites" 
        : "This location has been added to your favorites",
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "The link to this location has been copied to your clipboard",
    });
  };
  
  const handleBookNow = () => {
    toast({
      title: "Booking request sent!",
      description: "The property owner will contact you shortly to confirm availability.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Back button (mobile) */}
        <div className="md:hidden p-4">
          <Link to="/locations">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <ArrowLeft size={16} /> Back to locations
            </Button>
          </Link>
        </div>
        
        {/* Image Gallery */}
        <div className="relative h-96 md:h-[500px] bg-muted">
          <img 
            src={location.imageUrl} 
            alt={location.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button 
              onClick={toggleFavorite}
              variant="secondary" 
              size="icon" 
              className="bg-white/80 hover:bg-white"
            >
              <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
            </Button>
            <Button 
              onClick={handleShare}
              variant="secondary" 
              size="icon" 
              className="bg-white/80 hover:bg-white"
            >
              <Share2 size={20} />
            </Button>
          </div>
          {location.isVerified && (
            <Badge className="absolute top-4 left-4 bg-nollywood-secondary text-white">
              Verified
            </Badge>
          )}
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Location Header */}
              <div className="mb-6">
                <div className="hidden md:block mb-2">
                  <Link to="/locations">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 -ml-2">
                      <ArrowLeft size={16} /> Back to locations
                    </Button>
                  </Link>
                </div>
                <h1 className="text-3xl font-bold mb-2">{location.title}</h1>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    {location.rating.toFixed(1)}
                    <span className="text-muted-foreground ml-1">({location.reviewCount} reviews)</span>
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="flex items-center text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {location.neighborhood}, Lagos
                  </span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
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
                  {location.amenities.map((amenity) => {
                    let Icon;
                    switch (amenity) {
                      case 'Generator': Icon = Zap; break;
                      case 'AC': Icon = Wind; break;
                      case 'Security': Icon = Shield; break;
                      case 'Parking': Icon = Car; break;
                      case 'Wifi': Icon = Wifi; break;
                      case 'TV/Monitors': Icon = Tv; break;
                      default: Icon = Check;
                    }
                    
                    return (
                      <div key={amenity} className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-nollywood-primary" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Reviews */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Reviews</h2>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{location.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground ml-1">({location.reviewCount} reviews)</span>
                  </div>
                </div>
                
                {/* Reviews preview */}
                <div className="space-y-4 mb-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <Users size={20} className="text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">Chioma Okeke</h4>
                        <p className="text-xs text-muted-foreground">2 months ago</p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} 
                        />
                      ))}
                    </div>
                    <p className="text-sm">
                      Great location for our drama series! The lighting was perfect, and all amenities worked as advertised. The owner was very accommodating with our shooting schedule. Highly recommend for any production.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <Users size={20} className="text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">Adebayo Johnson</h4>
                        <p className="text-xs text-muted-foreground">4 months ago</p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} 
                        />
                      ))}
                    </div>
                    <p className="text-sm">
                      The space was mostly as described. We had a minor issue with the generator, but the host was quick to fix it. The neighborhood was quiet which was great for sound recording.
                    </p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <MessageSquare size={16} />
                  Read all {location.reviewCount} reviews
                </Button>
              </div>
            </div>
            
            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 border rounded-lg shadow-sm p-6">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold">₦{location.price.toLocaleString()}</span>
                    <span className="text-muted-foreground">per day</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{location.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground ml-1">({location.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center gap-2 p-3 border rounded-lg mb-3">
                    <Calendar size={20} className="text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Pick a date</div>
                      <div className="text-xs text-muted-foreground">Check our calendar for availability</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <Users size={20} className="text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Team size</div>
                      <div className="text-xs text-muted-foreground">How many crew members?</div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mb-3" onClick={handleBookNow}>
                  Book Now
                </Button>
                
                <Button variant="outline" className="w-full">
                  Contact Host
                </Button>
                
                <div className="mt-6 text-sm text-center text-muted-foreground">
                  You won't be charged yet. Booking will be confirmed after host approval.
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Locations */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar Locations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedLocations.map((relatedLocation) => (
                <LocationCard key={relatedLocation.id} {...relatedLocation} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LocationDetail;
