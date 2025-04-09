
import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface ActionButtonsProps {
  isFavorite: boolean;
  toggleFavorite: () => void;
  handleShare: () => void;
}

const ActionButtons = ({ isFavorite, toggleFavorite, handleShare }: ActionButtonsProps) => {
  return (
    <div className="flex space-x-2">
      <Button 
        onClick={toggleFavorite}
        variant="light" 
        size="icon" 
        className="shadow-sm"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart 
          size={20} 
          className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"} 
        />
      </Button>
      <Button 
        onClick={handleShare}
        variant="light" 
        size="icon" 
        className="shadow-sm"
        aria-label="Share location"
      >
        <Share2 size={20} className="text-gray-700" />
      </Button>
    </div>
  );
};

export default ActionButtons;
