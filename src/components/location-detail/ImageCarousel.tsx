
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

interface ImageCarouselProps {
  images: string[];
  isVerified?: boolean;
  title: string;
}

const ImageCarousel = ({ images, isVerified, title }: ImageCarouselProps) => {
  return (
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="h-[400px] w-full relative">
              <img 
                src={image} 
                alt={`${title} - Image ${index + 1}`} 
                className="w-full h-full object-cover rounded-lg"
              />
              {index === 0 && isVerified && (
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
  );
};

export default ImageCarousel;
