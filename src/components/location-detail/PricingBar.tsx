
import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

interface PricingBarProps {
  price: number;
  days: number;
  setDays: (days: number) => void;
}

const PricingBar = ({ price, days, setDays }: PricingBarProps) => {
  const { toast } = useToast();
  const totalPrice = price * days;
  
  const handleBookNow = () => {
    toast({
      title: "Booking request sent!",
      description: "The property owner will contact you shortly to confirm availability.",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
      <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
        <span className="text-muted-foreground text-sm">Price per day</span>
        <span className="text-2xl font-bold">₦{price.toLocaleString()}</span>
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
  );
};

export default PricingBar;
