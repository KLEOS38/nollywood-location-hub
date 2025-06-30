
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from 'react-router-dom';
import { Star, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface ReviewSectionProps {
  rating: number;
  reviewCount: number;
  propertyId: string;
}

const ReviewSection = ({ rating, reviewCount, propertyId }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [canReview, setCanReview] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<{
    hasCompletedBooking: boolean;
    hasReviewed: boolean;
  } | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Load reviews and check if user can review
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      
      try {
        // Get published reviews for this property
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews' as any)
          .select(`
            *,
            profiles:user_id(name, avatar_url)
          `)
          .eq('property_id', propertyId)
          .eq('is_published', true)
          .order('created_at', { ascending: false });
        
        if (reviewsError) throw reviewsError;
        
        setReviews(reviewsData || []);
        
        // Check if user can leave a review using edge function
        if (user) {
          try {
            const { data, error } = await supabase.functions.invoke('verify-booking', {
              body: { propertyId }
            });
            
            if (error) throw error;
            
            setCanReview(data.canReview);
            setBookingId(data.bookingId);
            setVerificationStatus({
              hasCompletedBooking: data.hasCompletedBooking,
              hasReviewed: data.hasReviewed
            });
          } catch (error) {
            console.error("Error verifying booking:", error);
            // Fallback to database check
            checkBookingInDatabase();
          }
        }
      } catch (error) {
        console.error("Error loading reviews:", error);
        // Fallback to database check if edge function fails
        if (user) {
          checkBookingInDatabase();
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    // Fallback to direct database check if edge function is not available
    const checkBookingInDatabase = async () => {
      try {
        // Check if user has a completed booking
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings' as any)
          .select('id')
          .eq('property_id', propertyId)
          .eq('user_id', user?.id)
          .eq('status', 'completed')
          .limit(1);
        
        if (bookingsError) throw bookingsError;
        
        // Check if the user has already left a review
        const { data: existingReview, error: reviewError } = await supabase
          .from('reviews' as any)
          .select('id')
          .eq('property_id', propertyId)
          .eq('user_id', user?.id)
          .limit(1);
        
        if (reviewError) throw reviewError;
        
        // User can review if they have a completed booking and haven't already reviewed
        const hasCompletedBooking = bookingsData && bookingsData.length > 0;
        const hasReviewed = existingReview && existingReview.length > 0;
        
        setCanReview(hasCompletedBooking && !hasReviewed);
        setBookingId(hasCompletedBooking ? (bookingsData as any)[0].id : null);
        setVerificationStatus({
          hasCompletedBooking,
          hasReviewed
        });
      } catch (error) {
        console.error("Error checking booking in database:", error);
      }
    };
    
    fetchReviews();
  }, [propertyId, user]);
  
  const handleSubmitReview = async () => {
    if (!user) {
      toast.error("Please sign in to leave a review");
      navigate('/auth');
      return;
    }
    
    if (userReview.trim() === "") {
      toast.error("Please enter a review comment");
      return;
    }
    
    if (!bookingId) {
      toast.error("You must have completed a booking to leave a review");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit the review
      const { error: reviewError } = await supabase
        .from('reviews' as any)
        .insert({
          property_id: propertyId,
          user_id: user.id,
          booking_id: bookingId,
          rating: userRating,
          comment: userReview,
          is_published: true
        });
      
      if (reviewError) throw reviewError;
      
      toast.success("Review submitted successfully!");
      
      // Clear the form
      setUserReview("");
      setUserRating(5);
      setCanReview(false);
      setVerificationStatus(prev => prev ? {...prev, hasReviewed: true} : null);
      
      // Reload reviews to show the new one
      const { data: updatedReviews } = await supabase
        .from('reviews' as any)
        .select(`
          *,
          profiles:user_id(name, avatar_url)
        `)
        .eq('property_id', propertyId)
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      setReviews(updatedReviews || []);
      
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderReviewStatus = () => {
    if (!user) {
      return (
        <div className="mb-8 border-b pb-6">
          <p className="text-center">
            <Button variant="link" onClick={() => navigate('/auth')}>
              Sign in
            </Button> 
            to leave a review
          </p>
        </div>
      );
    }
    
    if (verificationStatus?.hasReviewed) {
      return (
        <div className="mb-8 border-b pb-6">
          <p className="text-center text-muted-foreground">
            You've already reviewed this property. Thank you for your feedback!
          </p>
        </div>
      );
    }
    
    if (verificationStatus?.hasCompletedBooking === false) {
      return (
        <div className="mb-8 border-b pb-6">
          <p className="text-center text-muted-foreground">
            Only guests who have stayed at this property can leave a review.
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Reviews 
          <div className="flex items-center text-sm font-normal">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="mr-1">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviewCount} reviews)</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!canReview && renderReviewStatus()}
        
        {canReview && (
          <div className="mb-8 border-b pb-6">
            <h3 className="text-lg font-medium mb-4">Write a Review</h3>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="mr-2">Rating:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-5 w-5 ${
                          star <= userRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <Textarea
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                placeholder="Share your experience with this location..."
                className="min-h-24"
              />
            </div>
            <Button 
              onClick={handleSubmitReview} 
              disabled={isSubmitting || userReview.trim() === ""}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </div>
        )}

        {isLoading ? (
          <div className="py-4 text-center">
            <LoaderCircle className="h-6 w-6 animate-spin mx-auto mb-2" />
            <p>Loading reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review: any) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                    {review.profiles?.avatar_url ? (
                      <img 
                        src={review.profiles.avatar_url} 
                        alt={review.profiles.name || "User"} 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-sm font-medium">
                        {(review.profiles?.name || "U").charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{review.profiles?.name || "User"}</p>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-2">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-center text-muted-foreground">
            No reviews yet for this location.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewSection;
