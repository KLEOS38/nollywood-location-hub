
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";
import { toast } from "sonner";
import { LoaderCircle, Calendar as CalendarIcon } from "lucide-react";
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { format, isWithinInterval, isBefore, isAfter, addDays, parseISO } from 'date-fns';

interface PropertyAvailabilityManagerProps {
  propertyId: string;
}

const PropertyAvailabilityManager = ({ propertyId }: PropertyAvailabilityManagerProps) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 1));
  const [reason, setReason] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [unavailableDates, setUnavailableDates] = useState<Array<{start: Date, end: Date, id?: string}>>([]);
  const { user } = useAuth();
  
  // Fetch unavailable dates on component mount
  useEffect(() => {
    if (propertyId) {
      fetchUnavailableDates();
    }
  }, [propertyId]);

  const fetchUnavailableDates = async () => {
    try {
      // Fetch booked dates
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('id, start_date, end_date')
        .eq('property_id', propertyId)
        .in('status', ['confirmed', 'completed'])
        .in('payment_status', ['paid', 'completed']);
        
      if (bookingsError) throw bookingsError;
      
      // Fetch manually blocked dates
      const { data: unavailability, error: unavailabilityError } = await supabase
        .from('property_unavailability')
        .select('id, start_date, end_date')
        .eq('property_id', propertyId);
        
      if (unavailabilityError) throw unavailabilityError;
      
      // Combine both sets of dates
      const combinedUnavailable = [
        ...(bookings || []).map(booking => ({
          id: booking.id,
          start: new Date(booking.start_date),
          end: new Date(booking.end_date),
          type: 'booking'
        })),
        ...(unavailability || []).map(block => ({
          id: block.id,
          start: new Date(block.start_date),
          end: new Date(block.end_date),
          type: 'blocked'
        }))
      ];
      
      setUnavailableDates(combinedUnavailable);
    } catch (error) {
      console.error("Error fetching unavailable dates:", error);
      toast.error("Could not load unavailable dates");
    }
  };

  const handleBlockDates = async () => {
    if (!user) {
      toast.error("You must be signed in to manage availability");
      return;
    }
    
    if (isBefore(endDate, startDate)) {
      toast.error("End date cannot be before start date");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('update-availability', {
        body: {
          propertyId,
          action: 'block',
          startDate: format(startDate, 'yyyy-MM-dd'),
          endDate: format(endDate, 'yyyy-MM-dd'),
          reason
        }
      });
      
      if (error) throw error;
      
      toast.success("Dates blocked successfully!");
      setReason("");
      fetchUnavailableDates();
    } catch (error) {
      console.error("Error blocking dates:", error);
      toast.error("Failed to block dates. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnblockDates = async (id?: string) => {
    if (!user) {
      toast.error("You must be signed in to manage availability");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('property_unavailability')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success("Dates unblocked successfully!");
      fetchUnavailableDates();
    } catch (error) {
      console.error("Error unblocking dates:", error);
      toast.error("Failed to unblock dates. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Property Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Select dates to block</Label>
              <div className="mt-2">
                <Calendar
                  mode="range"
                  selected={{
                    from: startDate,
                    to: endDate
                  }}
                  onSelect={(range) => {
                    if (range?.from) setStartDate(range.from);
                    if (range?.to) setEndDate(range.to);
                  }}
                  disabled={isDateUnavailable}
                  className="border rounded-md p-2"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="block-reason">Reason (optional)</Label>
                <Textarea
                  id="block-reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., Personal use, Renovations, etc."
                  className="mt-1"
                />
              </div>
              
              <Button
                onClick={handleBlockDates}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Blocking...
                  </>
                ) : (
                  "Block Selected Dates"
                )}
              </Button>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Currently Blocked Dates:</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {unavailableDates
                    .filter(period => period.type === 'blocked')
                    .map((period, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md border">
                      <span className="text-sm">
                        {format(period.start, 'MMM d, yyyy')} - {format(period.end, 'MMM d, yyyy')}
                      </span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleUnblockDates(period.id)}
                        disabled={isLoading}
                      >
                        Unblock
                      </Button>
                    </div>
                  ))}
                  
                  {unavailableDates.filter(period => period.type === 'blocked').length === 0 && (
                    <p className="text-sm text-muted-foreground">No dates are currently manually blocked</p>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Booked Dates:</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {unavailableDates
                    .filter(period => period.type === 'booking')
                    .map((period, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-blue-50 rounded-md border border-blue-100">
                      <span className="text-sm">
                        {format(period.start, 'MMM d, yyyy')} - {format(period.end, 'MMM d, yyyy')}
                      </span>
                      <span className="text-xs text-blue-600 font-medium">Booked</span>
                    </div>
                  ))}
                  
                  {unavailableDates.filter(period => period.type === 'booking').length === 0 && (
                    <p className="text-sm text-muted-foreground">No confirmed bookings yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyAvailabilityManager;
