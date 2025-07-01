
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  propertyId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const FavoriteButton = ({ propertyId, className, size = 'md' }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite, loading } = useFavorites();
  const isLiked = isFavorite(propertyId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(propertyId);
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        sizeClasses[size],
        'rounded-full bg-white/80 hover:bg-white/90 backdrop-blur-sm',
        className
      )}
      onClick={handleClick}
      disabled={loading}
    >
      <Heart 
        size={iconSizes[size]}
        className={cn(
          'transition-colors',
          isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
        )}
      />
    </Button>
  );
};

export default FavoriteButton;
