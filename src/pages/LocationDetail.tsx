import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { getLocationById, getRelatedLocations } from "@/data/mockLocations";
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

// Import the refactored components
import ImageCarousel from "@/components/location-detail/ImageCarousel";
import PricingBar from "@/components/location-detail/PricingBar";
import LocationHeader from "@/components/location-detail/LocationHeader";
import LocationInfo from "@/components/location-detail/LocationInfo";
import ReviewSection from "@/components/location-detail/ReviewSection";
import BookingCard from "@/components/location-detail/BookingCard";
import SimilarLocations from "@/components/location-detail/SimilarLocations";
import ActionButtons from "@/components/location-detail/ActionButtons";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import { useAuth } from '@/contexts/AuthContext';
import ReviewForm from "@/components/reviews/ReviewForm";
import ReviewList from "@/components/reviews/ReviewList";

const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [days, setDays] = useState(1);
  const [location, setLocation] = useState<any>(null);
  const [relatedLocations, setRelatedLocations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const { user } = useAuth();
  const [refreshReviews, setRefreshReviews] = useState(0);
  
  // Load property details from Supabase
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setIsLoading(true);
      
      try {
        // Get property details
        const { data: property, error } = await supabase
          .from('properties')
          .select(`
            *,
            profiles:owner_id(*),
            property_images(*),
            property_amenities(
              amenities(*)
            )
          `)
          .eq('id', id)
          .single();
        
        if (error) {
          console.error("Error fetching property:", error);
          // Fallback to mock data for development
          const mockLocation = getLocationById(id || "");
          setLocation(mockLocation);
          setRelatedLocations(getRelatedLocations(id || ""));
          return;
        }
        
        // Get reviews
        const { data: reviews } = await supabase
          .from('reviews')
          .select('*')
          .eq('property_id', id)
          .eq('is_published', true);
        
        // Transform property data to match the existing structure
        const transformedProperty = {
          ...property,
          id: property.id,
          title: property.title,
          description: property.description,
          imageUrl: property.property_images?.find((img: any) => img.is_primary)?.url || 
                   (property.property_images?.[0]?.url),
          price: property.price,
          rating: reviews?.length ? reviews.reduce((sum: number, rev: any) => sum + rev.rating, 0) / reviews.length : 0,
          reviewCount: reviews?.length || 0,
          location: property.address,
          neighborhood: property.neighborhood,
          isVerified: property.is_verified,
          amenities: property.property_amenities?.map((pa: any) => pa.amenities.name) || [],
          owner: {
            name: property.profiles?.name || 'Property Owner',
            avatar: property.profiles?.avatar_url
          },
          additionalImages: property.property_images?.map((img: any) => img.url) || []
        };
        
        setLocation(transformedProperty);
        
        // Get related properties
        const { data: related } = await supabase
          .from('properties')
          .select(`
            *,
            profiles:owner_id(*),
            property_images(*)
          `)
          .eq('is_published', true)
          .neq('id', id)
          .eq('city', property.city)
          .limit(3);
        
        if (related?.length) {
          const transformedRelated = related.map((prop: any) => ({
            id: prop.id,
            title: prop.title,
            description: prop.description,
            imageUrl: prop.property_images?.find((img: any) => img.is_primary)?.url || 
                     (prop.property_images?.[0]?.url),
            price: prop.price,
            rating: 0,  // Could fetch reviews for each, but skipping for performance
            reviewCount: 0,
            neighborhood: prop.neighborhood,
            isVerified: prop.is_verified
          }));
          setRelatedLocations(transformedRelated);
        } else {
          // Fallback to mock data
          setRelatedLocations(getRelatedLocations(id || ""));
        }
        
      } catch (error) {
        console.error("Error loading property details:", error);
        // Fallback to mock data
        const mockLocation = getLocationById(id || "");
        setLocation(mockLocation);
        setRelatedLocations(getRelatedLocations(id || ""));
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);
  
  // Mock additional images if needed
  const additionalImages = location?.additionalImages || [
    location?.imageUrl || "",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
  ];
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading location details...</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
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
  
  const toggleFavorite = async () => {
    if (!user) {
      toast.error("Please sign in to save favorites");
      return;
    }
    
    setIsFavorite(!isFavorite);
    
    if (isFavorite) {
      toast.success("Removed from favorites");
    } else {
      toast.success("Added to favorites");
    }
    
    // TODO: Implement favorites in database
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleDateSelect = (startDate: Date | null, endDate: Date | null) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    
    if (startDate && endDate) {
      const timeDiff = endDate.getTime() - startDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setDays(daysDiff);
    }
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
              
              {/* Calendar Section */}
              <div className="mt-8 p-6 border rounded-lg">
                <AvailabilityCalendar 
                  propertyId={id || ""}
                  onDateSelect={handleDateSelect}
                  selectedStartDate={selectedStartDate}
                  selectedEndDate={selectedEndDate}
                />
              </div>
              
              <ReviewSection 
                rating={location.rating}
                reviewCount={location.reviewCount}
                propertyId={id || ""}
              />

              {/* Enhanced Review Section */}
              <div className="mt-8 space-y-6">
                <h2 className="text-2xl font-bold">Reviews</h2>
                <ReviewList 
                  propertyId={id || ""} 
                  refreshTrigger={refreshReviews}
                />
                <ReviewForm 
                  propertyId={id || ""} 
                  onReviewSubmitted={() => setRefreshReviews(prev => prev + 1)}
                />
              </div>
            </div>
            
            {/* Booking Card with data attribute for scrolling */}
            <div className="lg:col-span-1" data-booking-card>
              <BookingCard 
                propertyId={id || ""}
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
