
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
  );
};

export default ActionButtons;
