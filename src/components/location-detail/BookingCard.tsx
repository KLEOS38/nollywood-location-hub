
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Users, Star } from 'lucide-react';

interface BookingCardProps {
  price: number;
  rating: number;
  reviewCount: number;
  days: number;
  setDays: (days: number) => void;
}

const BookingCard = ({ price, rating, reviewCount, days, setDays }: BookingCardProps) => {
  const [bookingDate, setBookingDate] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const { toast } = useToast();
  
  const totalPrice = price * days;
  
  const handleBookNow = () => {
    toast({
      title: "Booking request sent!",
      description: "The property owner will contact you shortly to confirm availability.",
    });
  };
  
  return (
    <div className="sticky top-28 border rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl font-bold">₦{price.toLocaleString()}</span>
          <span className="text-muted-foreground">per day</span>
        </div>
        <div className="flex items-center">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-muted-foreground ml-1">({reviewCount} reviews)</span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center gap-2 p-3 border rounded-lg mb-3">
          <Calendar size={20} className="text-muted-foreground" />
          <div className="flex-1">
            <div className="text-sm font-medium">Pick a date</div>
            <Input 
              type="date" 
              value={bookingDate} 
              onChange={(e) => setBookingDate(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 border rounded-lg mb-3">
          <Users size={20} className="text-muted-foreground" />
          <div className="flex-1">
            <div className="text-sm font-medium">Team size</div>
            <Input 
              type="number" 
              placeholder="Number of crew members" 
              value={teamSize} 
              onChange={(e) => setTeamSize(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 border rounded-lg">
          <Calendar size={20} className="text-muted-foreground" />
          <div className="flex-1">
            <div className="text-sm font-medium">Number of days</div>
            <div className="flex items-center gap-2 mt-1">
              <Slider 
                value={[days]} 
                onValueChange={(value) => setDays(value[0])}
                max={14}
                min={1}
                step={1}
                className="flex-1"
              />
              <span className="font-medium w-6 text-center">{days}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center border-t border-b py-3 mb-4">
        <span className="font-medium">Total</span>
        <span className="text-xl font-bold">₦{totalPrice.toLocaleString()}</span>
      </div>
      
      <Button className="w-full mb-3" onClick={handleBookNow}>
        Book Now
      </Button>
      
      <Button variant="outline" className="w-full">
        Contact Host
      </Button>
      
      <div className="mt-6 text-sm text-center text-muted-foreground">
        You won't be charged yet. Booking will be confirmed after host approval.
      </div>
    </div>
  );
};

export default BookingCard;
