
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [days, setDays] = useState(1);
  const [bookingDate, setBookingDate] = useState("");
  const [teamSize, setTeamSize] = useState("");
  
  const location = getLocationById(id || "");
  const relatedLocations = getRelatedLocations(id || "");
  
  // Mock additional images
  const additionalImages = [
    location?.imageUrl || "",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
  ];
  
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
  
  const totalPrice = location.price * days;

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
        
        {/* Image Carousel */}
        <div className="relative bg-muted px-8 py-6">
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {additionalImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="h-[400px] w-full relative">
                    <img 
                      src={image} 
                      alt={`${location.title} - Image ${index + 1}`} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {index === 0 && location.isVerified && (
                      <Badge className="absolute top-4 left-4 bg-nollywood-secondary text-white">
                        Verified
                      </Badge>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white" />
            <CarouselNext className="right-4 bg-white" />
          </Carousel>
          
          <div className="absolute top-8 right-12 flex space-x-2">
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
        </div>
        
        {/* Pricing & Booking Section */}
        <div className="bg-white py-6 border-b shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div>
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
              
              <div className="bg-white rounded-lg shadow-sm p-4 border flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
                  <span className="text-muted-foreground text-sm">Price per day</span>
                  <span className="text-2xl font-bold">₦{location.price.toLocaleString()}</span>
                </div>
                
                <div className="w-full sm:w-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">Days:</span>
                    <Slider 
                      value={[days]} 
                      onValueChange={(value) => setDays(value[0])}
                      max={14}
                      min={1}
                      step={1}
                      className="w-[120px]"
                    />
                    <span className="font-medium">{days}</span>
                  </div>
                  <div className="text-sm font-medium">
                    Total: ₦{totalPrice.toLocaleString()}
                  </div>
                </div>
                
                <Button onClick={handleBookNow} className="w-full sm:w-auto">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
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
                    <div className="flex-1">
                      <div className="text-sm font-medium">Pick a date</div>
                      <Input 
                        type="date" 
                        value={bookingDate} 
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 border rounded-lg mb-3">
                    <Users size={20} className="text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Team size</div>
                      <Input 
                        type="number" 
                        placeholder="Number of crew members" 
                        value={teamSize} 
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <Calendar size={20} className="text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Number of days</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Slider 
                          value={[days]} 
                          onValueChange={(value) => setDays(value[0])}
                          max={14}
                          min={1}
                          step={1}
                          className="flex-1"
                        />
                        <span className="font-medium w-6 text-center">{days}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center border-t border-b py-3 mb-4">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-bold">₦{totalPrice.toLocaleString()}</span>
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
