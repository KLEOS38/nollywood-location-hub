
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from 'sonner';
import { Calendar, Users, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface BookingCardProps {
  propertyId: string;
  price: number;
  rating: number;
  reviewCount: number;
  days: number;
  setDays: (days: number) => void;
}

const BookingCard = ({ propertyId, price, rating, reviewCount, days, setDays }: BookingCardProps) => {
  const [bookingDate, setBookingDate] = useState("");
  const [teamSize, setTeamSize] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const totalPrice = price * days;
  
  const handleBookNow = async () => {
    if (!user) {
      toast.error("Please sign in to book this location");
      navigate('/auth');
      return;
    }
    
    if (!bookingDate) {
      toast.error("Please select a start date");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Calculate end date
      const startDate = new Date(bookingDate);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + days);
      
      // Check availability first
      const { data: isAvailable } = await supabase.rpc('is_property_available', {
        property_id: propertyId,
        check_in: bookingDate,
        check_out: endDate.toISOString().split('T')[0]
      });
      
      if (!isAvailable) {
        toast.error("This property is not available for the selected dates");
        setIsLoading(false);
        return;
      }
      
      // Call our payment function
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          propertyId,
          startDate: bookingDate,
          endDate: endDate.toISOString().split('T')[0],
          totalPrice,
          teamSize: parseInt(teamSize),
          notes: ""
        }
      });
      
      if (error) {
        console.error("Payment error:", error);
        toast.error("Failed to process booking");
        return;
      }
      
      toast.success("Booking confirmed! The property owner will contact you shortly.");
      // Reset form
      setBookingDate("");
      setTeamSize("1");
      
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("An error occurred while processing your booking");
    } finally {
      setIsLoading(false);
    }
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
              min={new Date().toISOString().split('T')[0]} // Prevent past dates
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
              min="1"
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
      
      <Button 
        className="w-full mb-3" 
        onClick={handleBookNow}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Book Now"}
      </Button>
      
      <Button variant="outline" className="w-full">
        Contact Host
      </Button>
      
      <div className="mt-6 text-sm text-center text-muted-foreground">
        You won't be charged until the host approves your booking request.
      </div>
    </div>
  );
};

export default BookingCard;
