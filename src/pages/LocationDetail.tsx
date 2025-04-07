
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { getLocationById, getRelatedLocations } from "@/data/mockLocations";
import { useToast } from "@/components/ui/use-toast";

// Import the refactored components
import ImageCarousel from "@/components/location-detail/ImageCarousel";
import PricingBar from "@/components/location-detail/PricingBar";
import LocationHeader from "@/components/location-detail/LocationHeader";
import LocationInfo from "@/components/location-detail/LocationInfo";
import ReviewSection from "@/components/location-detail/ReviewSection";
import BookingCard from "@/components/location-detail/BookingCard";
import SimilarLocations from "@/components/location-detail/SimilarLocations";
import ActionButtons from "@/components/location-detail/ActionButtons";

const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [days, setDays] = useState(1);
  
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
          <ImageCarousel 
            images={additionalImages} 
            isVerified={location.isVerified}
            title={location.title}
          />
          
          <div className="absolute top-8 right-12">
            <ActionButtons 
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
              handleShare={handleShare}
            />
          </div>
        </div>
        
        {/* Pricing & Booking Section */}
        <div className="bg-white py-6 border-b shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <LocationHeader 
                title={location.title}
                rating={location.rating}
                reviewCount={location.reviewCount}
                neighborhood={location.neighborhood}
              />
              
              <PricingBar 
                price={location.price}
                days={days}
                setDays={setDays}
              />
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LocationInfo location={location} />
              
              <ReviewSection 
                rating={location.rating}
                reviewCount={location.reviewCount}
              />
            </div>
            
            {/* Booking Card */}
            <div className="lg:col-span-1">
              <BookingCard 
                price={location.price}
                rating={location.rating}
                reviewCount={location.reviewCount}
                days={days}
                setDays={setDays}
              />
            </div>
          </div>
          
          {/* Related Locations */}
          <SimilarLocations locations={relatedLocations} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LocationDetail;
