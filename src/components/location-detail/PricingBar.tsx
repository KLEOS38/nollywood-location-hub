
import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface PricingBarProps {
  price: number;
  days: number;
  setDays: (days: number) => void;
}

const PricingBar = ({ price, days, setDays }: PricingBarProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const totalPrice = price * days;
  
  const handleBookNow = () => {
    if (!user) {
      toast.error("Please sign in to book this location");
      navigate('/auth');
      return;
    }
    
    // Scroll to booking card for payment
    const bookingCard = document.querySelector('[data-booking-card]');
    if (bookingCard) {
      bookingCard.scrollIntoView({ behavior: 'smooth' });
    }
    
    toast.success("Scroll down to complete your booking with Paystack!");
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
        Book with Paystack
      </Button>
    </div>
  );
};

export default PricingBar;
