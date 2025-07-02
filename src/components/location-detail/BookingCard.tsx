
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Calendar } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { differenceInDays, format } from 'date-fns';
import { useSecureOperation } from '@/hooks/useSecureOperation';
import { bookingSchema } from '@/lib/validation';
import SecureForm from '@/components/security/SecureForm';
import AvailabilityCalendar from '@/components/availability/AvailabilityCalendar';

interface BookingCardProps {
  propertyId: string;
  price: number;
  rating: number;
  reviewCount: number;
  days: number;
  setDays: (days: number) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  propertyId,
  price,
  rating,
  reviewCount,
  days,
  setDays
}) => {
  const [teamSize, setTeamSize] = useState<number>(1);
  const [notes, setNotes] = useState<string>("");
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [totalDays, setTotalDays] = useState<number>(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { execute, isLoading } = useSecureOperation({
    requireAuthentication: true,
    onSuccess: () => {
      navigate('/booking-success');
    }
  });

  const handleDateSelect = (startDate: Date | null, endDate: Date | null, days: number) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    setTotalDays(days);
    setDays(days);
  };

  const totalPrice = totalDays * price;

  const validateBooking = (data: any) => {
    if (!selectedStartDate || !selectedEndDate) {
      toast.error("Please select check-in and check-out dates");
      return { success: false };
    }

    const bookingData = {
      property_id: propertyId,
      start_date: format(selectedStartDate, 'yyyy-MM-dd'),
      end_date: format(selectedEndDate, 'yyyy-MM-dd'),
      team_size: teamSize,
      notes: notes.trim()
    };

    try {
      bookingSchema.parse(bookingData);
      return { success: true };
    } catch (error) {
      return { success: false, errors: error };
    }
  };

  const handleBooking = async (formData: FormData) => {
    if (!user) {
      toast.error("Please sign in to make a booking");
      navigate('/auth');
      return;
    }

    if (!selectedStartDate || !selectedEndDate) {
      toast.error("Please select your dates");
      return;
    }

    await execute(async () => {
      // Check availability first
      const { data: isAvailable } = await supabase.rpc('is_property_available', {
        property_id: propertyId,
        check_in: format(selectedStartDate, 'yyyy-MM-dd'),
        check_out: format(selectedEndDate, 'yyyy-MM-dd')
      });

      if (!isAvailable) {
        throw new Error("Selected dates are no longer available");
      }

      const bookingData = {
        property_id: propertyId,
        user_id: user.id,
        start_date: format(selectedStartDate, 'yyyy-MM-dd'),
        end_date: format(selectedEndDate, 'yyyy-MM-dd'),
        team_size: teamSize,
        total_price: totalPrice,
        notes: notes.trim() || null,
        status: 'pending',
        payment_status: 'unpaid'
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .single();

      if (error) throw error;

      toast.success("Booking request submitted successfully!");
      return data;
    });
  };

  return (
    <div className="sticky top-6 space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-2xl font-bold">₦{price.toLocaleString()}</span>
              <span className="text-muted-foreground ml-1">per day</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({reviewCount})</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <AvailabilityCalendar
            propertyId={propertyId}
            price={price}
            onDateSelect={handleDateSelect}
            className="border-0 shadow-none p-0"
          />

          {selectedStartDate && selectedEndDate && (
            <SecureForm onSubmit={handleBooking} validate={validateBooking}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="teamSize" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Team Size
                  </Label>
                  <Input
                    id="teamSize"
                    name="teamSize"
                    type="number"
                    min="1"
                    max="50"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Math.max(1, parseInt(e.target.value) || 1))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Special Requests (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requirements or notes..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>₦{price.toLocaleString()} × {totalDays} {totalDays === 1 ? 'day' : 'days'}</span>
                    <span>₦{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₦{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  type="submit"
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Request to Book"}
                </Button>
              </div>
            </SecureForm>
          )}

          {!selectedStartDate && (
            <div className="text-center py-4 text-muted-foreground">
              Select your dates to see booking details
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCard;
