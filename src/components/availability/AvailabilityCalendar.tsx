
import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { format, isWithinInterval, isBefore, addDays, differenceInDays } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface AvailabilityCalendarProps {
  propertyId: string;
  price: number;
  onDateSelect?: (startDate: Date | null, endDate: Date | null, totalDays: number) => void;
  isOwner?: boolean;
  className?: string;
}

interface UnavailableDate {
  id?: string;
  start: Date;
  end: Date;
  type: 'booking' | 'blocked';
  reason?: string;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  propertyId,
  price,
  onDateSelect,
  isOwner = false,
  className
}) => {
  const [unavailableDates, setUnavailableDates] = useState<UnavailableDate[]>([]);
  const [selectedRange, setSelectedRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: undefined,
    to: undefined
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch unavailable dates
  const fetchUnavailableDates = async () => {
    try {
      setIsLoading(true);
      
      // Fetch booked dates
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('id, start_date, end_date')
        .eq('property_id', propertyId)
        .in('status', ['confirmed', 'completed']);
        
      if (bookingsError) throw bookingsError;
      
      // Fetch manually blocked dates
      const { data: unavailability, error: unavailabilityError } = await supabase
        .from('property_unavailability')
        .select('id, start_date, end_date, reason')
        .eq('property_id', propertyId);
        
      if (unavailabilityError) throw unavailabilityError;
      
      // Combine both sets of dates
      const combinedUnavailable: UnavailableDate[] = [
        ...(bookings || []).map((booking: any) => ({
          id: booking.id,
          start: new Date(booking.start_date),
          end: new Date(booking.end_date),
          type: 'booking' as const
        })),
        ...(unavailability || []).map((block: any) => ({
          id: block.id,
          start: new Date(block.start_date),
          end: new Date(block.end_date),
          type: 'blocked' as const,
          reason: block.reason
        }))
      ];
      
      setUnavailableDates(combinedUnavailable);
    } catch (error) {
      console.error("Error fetching unavailable dates:", error);
      toast.error("Could not load calendar availability");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchUnavailableDates();
    }
  }, [propertyId]);

  // Check if a date is unavailable
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

  // Get the type of unavailability for a date
  const getDateUnavailabilityType = (date: Date): 'booking' | 'blocked' | null => {
    const period = unavailableDates.find(period => 
      isWithinInterval(date, { start: period.start, end: period.end })
    );
    return period ? period.type : null;
  };

  // Handle date selection
  const handleDateSelect = (range: {from: Date | undefined, to: Date | undefined} | undefined) => {
    if (!range) {
      setSelectedRange({ from: undefined, to: undefined });
      onDateSelect?.(null, null, 0);
      return;
    }

    setSelectedRange(range);
    
    if (range.from && range.to) {
      const days = differenceInDays(range.to, range.from) + 1;
      onDateSelect?.(range.from, range.to, days);
    } else if (range.from) {
      onDateSelect?.(range.from, null, 1);
    }
  };

  // Clear selected dates
  const clearDates = () => {
    setSelectedRange({ from: undefined, to: undefined });
    onDateSelect?.(null, null, 0);
  };

  // Calculate total price for selected range
  const calculateTotalPrice = () => {
    if (selectedRange.from && selectedRange.to) {
      const days = differenceInDays(selectedRange.to, selectedRange.from) + 1;
      return days * price;
    }
    return 0;
  };

  const totalPrice = calculateTotalPrice();
  const totalDays = selectedRange.from && selectedRange.to ? 
    differenceInDays(selectedRange.to, selectedRange.from) + 1 : 0;

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Select dates</CardTitle>
          {(selectedRange.from || selectedRange.to) && (
            <Button variant="ghost" size="sm" onClick={clearDates}>
              Clear dates
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="text-sm text-muted-foreground">Loading availability...</div>
          </div>
        ) : (
          <>
            <Calendar
              mode="range"
              selected={selectedRange}
              onSelect={handleDateSelect}
              disabled={isDateUnavailable}
              numberOfMonths={2}
              className="rounded-md border"
              modifiers={{
                booked: (date) => getDateUnavailabilityType(date) === 'booking',
                blocked: (date) => getDateUnavailabilityType(date) === 'blocked',
              }}
              modifiersStyles={{
                booked: { 
                  backgroundColor: '#ef4444', 
                  color: 'white',
                  opacity: 0.7
                },
                blocked: { 
                  backgroundColor: '#6b7280', 
                  color: 'white',
                  opacity: 0.7
                },
              }}
            />
            
            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded opacity-70"></div>
                <span>Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded opacity-70"></div>
                <span>Unavailable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded"></div>
                <span>Selected</span>
              </div>
            </div>

            {/* Selected date info */}
            {selectedRange.from && (
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {selectedRange.to ? (
                      `${format(selectedRange.from, 'MMM d')} - ${format(selectedRange.to, 'MMM d, yyyy')}`
                    ) : (
                      format(selectedRange.from, 'MMM d, yyyy')
                    )}
                  </span>
                  {totalDays > 0 && (
                    <Badge variant="secondary">
                      {totalDays} {totalDays === 1 ? 'day' : 'days'}
                    </Badge>
                  )}
                </div>
                
                {totalPrice > 0 && (
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total</span>
                    <span>₦{totalPrice.toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;
