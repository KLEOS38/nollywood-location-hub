
import React from 'react';
import { Button } from "@/components/ui/button";
import { Star, Users, MessageSquare } from 'lucide-react';

interface ReviewSectionProps {
  rating: number;
  reviewCount: number;
}

const ReviewSection = ({ rating, reviewCount }: ReviewSectionProps) => {
  // Function to render star ratings with partial fills
  const renderStarRating = (rating: number, maxStars: number = 5) => {
    return Array(maxStars).fill(0).map((_, i) => {
      // For partial stars
      if (i < Math.floor(rating) && i + 1 > rating) {
        // This is a partial star (e.g. 4.3 stars would have 4 full stars and 1 partial star)
        return (
          <div key={i} className="relative">
            <Star 
              className="h-4 w-4 text-gray-300" 
            />
            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${(rating - Math.floor(rating)) * 100}%` }}>
              <Star 
                className="h-4 w-4 fill-yellow-400 text-yellow-400" 
              />
            </div>
          </div>
        );
      }
      
      return (
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
        />
      );
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="flex items-center">
          <div className="flex mr-2">
            {renderStarRating(rating)}
          </div>
          <span className="font-medium">{rating.toFixed(1)}</span>
          <span className="text-muted-foreground ml-1">({reviewCount} reviews)</span>
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
            {renderStarRating(5)}
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
            {renderStarRating(4)}
          </div>
          <p className="text-sm">
            The space was mostly as described. We had a minor issue with the generator, but the host was quick to fix it. The neighborhood was quiet which was great for sound recording.
          </p>
        </div>
      </div>
      
      <Button variant="outline" className="w-full flex items-center gap-2">
        <MessageSquare size={16} />
        Read all {reviewCount} reviews
      </Button>
    </div>
  );
};

export default ReviewSection;
