
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { format, addDays, differenceInDays, isWithinInterval, isBefore } from "date-fns";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface BookingCardProps {
  propertyId: string;
  price: number;
  rating: number;
  reviewCount: number;
  days?: number;
  setDays?: (days: number) => void;
}

const BookingCard = ({ 
  propertyId, 
  price, 
  rating, 
  reviewCount,
  days: externalDays,
  setDays: setExternalDays
}: BookingCardProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), externalDays || 1));
  const [teamSize, setTeamSize] = useState<number>(5);
  const [notes, setNotes] = useState<string>("");
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [unavailableDates, setUnavailableDates] = useState<{start: Date, end: Date}[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Calculate days from date range
  const daysCount = startDate && endDate 
    ? Math.max(1, differenceInDays(endDate, startDate) + 1) 
    : externalDays || 1;
    
  // Sync with external days state if provided
  useEffect(() => {
    if (setExternalDays && daysCount !== externalDays) {
      setExternalDays(daysCount);
    }
  }, [daysCount, externalDays, setExternalDays]);
  
  // Fetch unavailable dates
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        // Fetch booked dates
        const { data: bookings, error: bookingsError } = await supabase
          .from('bookings')
          .select('start_date, end_date')
          .eq('property_id', propertyId)
          .in('status', ['confirmed', 'completed'])
          .in('payment_status', ['paid', 'completed']);
          
        if (bookingsError) throw bookingsError;
        
        // Fetch manually blocked dates
        const { data: unavailability, error: unavailabilityError } = await supabase
          .from('property_unavailability')
          .select('start_date, end_date')
          .eq('property_id', propertyId);
          
        if (unavailabilityError) throw unavailabilityError;
        
        // Combine both sets of dates
        const combinedUnavailable = [
          ...(bookings || []).map(booking => ({
            start: new Date(booking.start_date),
            end: new Date(booking.end_date)
          })),
          ...(unavailability || []).map(block => ({
            start: new Date(block.start_date),
            end: new Date(block.end_date)
          }))
        ];
        
        setUnavailableDates(combinedUnavailable);
      } catch (error) {
        console.error("Error fetching unavailable dates:", error);
      }
    };
    
    if (propertyId) {
      fetchUnavailableDates();
    }
  }, [propertyId]);
  
  // Calculate total price
  const totalPrice = price * daysCount;
  
  // Date picker helper functions
  const isDateUnavailable = (date: Date) => {
    // Disable dates in the past
    if (isBefore(date, new Date())) {
      return true;
    }
    
    // Check if date falls within any unavailable period
    return unavailableDates.some(period => 
      isWithinInterval(date, { start: period.start, end: period.end })
    );
  };
  
  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    // If end date is before new start date, reset it
    if (date && endDate && isBefore(endDate, date)) {
      setEndDate(addDays(date, 1));
    }
  };
  
  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDate(date);
  };
  
  const handleBookNow = async () => {
    if (!user) {
      toast("Please sign in to book this location");
      navigate('/auth');
      return;
    }
    
    if (!startDate || !endDate) {
      toast.error("Please select start and end dates");
      return;
    }
    
    setIsBooking(true);
    
    try {
      // Call the create-payment function to create a Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          propertyId,
          startDate: format(startDate, 'yyyy-MM-dd'),
          endDate: format(endDate, 'yyyy-MM-dd'),
          totalPrice,
          teamSize,
          notes
        }
      });
      
      if (error) throw error;
      
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to process booking");
      setIsBooking(false);
    }
  };
  
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Book This Location</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">₦{price.toLocaleString()} / day</span>
          {rating > 0 && (
            <div className="flex items-center text-sm">
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-yellow-500 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                {rating.toFixed(1)}
              </span>
              <span className="mx-1">·</span>
              <span className="text-muted-foreground">{reviewCount} reviews</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Check In</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="start-date"
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateSelect}
                  disabled={isDateUnavailable}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="end-date">Check Out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="end-date"
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateSelect}
                  disabled={(date) => 
                    isDateUnavailable(date) || 
                    (startDate ? isBefore(date, startDate) : false)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="team-size">Team Size</Label>
          <Input
            id="team-size"
            type="number"
            min={1}
            max={100}
            value={teamSize}
            onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
          />
          <p className="text-xs text-muted-foreground">Number of people in your filming team</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Tell the host about your project and any special requirements..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex justify-between mb-2">
            <span>₦{price.toLocaleString()} x {daysCount} days</span>
            <span>₦{totalPrice.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
            <span>Total</span>
            <span>₦{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          size="lg" 
          onClick={handleBookNow}
          disabled={isBooking}
        >
          {isBooking ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Book Now"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
