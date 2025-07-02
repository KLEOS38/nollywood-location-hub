
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { bookingSchema } from '@/lib/validation';
import { requireAuth } from '@/lib/auth-guard';
import { checkRateLimit } from '@/utils/security';

interface BookingCardProps {
  propertyId: string;
  price: number;
  rating: number;
  reviewCount: number;
  days: number;
  setDays: (days: number) => void;
}

const BookingCard = ({ propertyId, price, rating, reviewCount, days, setDays }: BookingCardProps) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [teamSize, setTeamSize] = useState(1);
  const [notes, setNotes] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBooking = async () => {
    // Rate limiting check
    if (!checkRateLimit(`booking-${user?.id}`, 5, 60000)) {
      toast.error('Too many booking attempts. Please wait a minute.');
      return;
    }

    if (!(await requireAuth())) {
      navigate('/auth');
      return;
    }

    // Validate input
    const validation = bookingSchema.safeParse({
      property_id: propertyId,
      start_date: checkIn,
      end_date: checkOut,
      team_size: teamSize,
      notes: notes.trim()
    });

    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsBooking(true);

    try {
      const totalPrice = price * days;
      
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          property_id: propertyId,
          user_id: user!.id,
          start_date: checkIn,
          end_date: checkOut,
          team_size: teamSize,
          total_price: totalPrice,
          notes: notes.trim() || null,
          status: 'pending',
          payment_status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Booking request submitted successfully!');
      navigate(`/booking-success?booking_id=${data.id}`);
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const totalPrice = price * days;

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>₦{price.toLocaleString()}/day</span>
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span>{rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviewCount})</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="checkin">Check-in</Label>
            <Input
              id="checkin"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div>
            <Label htmlFor="checkout">Check-out</Label>
            <Input
              id="checkout"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="teamsize">Team Size</Label>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <Input
              id="teamsize"
              type="number"
              min="1"
              max="100"
              value={teamSize}
              onChange={(e) => setTeamSize(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="notes">Special Requests (Optional)</Label>
          <Textarea
            id="notes"
            placeholder="Any special requirements or questions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value.slice(0, 500))}
            maxLength={500}
          />
          <div className="text-xs text-muted-foreground mt-1">
            {notes.length}/500 characters
          </div>
        </div>
        
        {checkIn && checkOut && (
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>₦{price.toLocaleString()} × {days} days</span>
              <span>₦{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₦{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleBooking}
          disabled={!checkIn || !checkOut || !teamSize || isBooking}
        >
          {isBooking ? 'Processing...' : 'Book Now'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
