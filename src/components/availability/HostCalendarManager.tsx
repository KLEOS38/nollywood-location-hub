
import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from '@/integrations/supabase/client';
import { format, isWithinInterval, isBefore, addDays } from 'date-fns';
import { toast } from 'sonner';
import { LoaderCircle, X } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface HostCalendarManagerProps {
  propertyId: string;
  className?: string;
}

interface UnavailableDate {
  id?: string;
  start: Date;
  end: Date;
  type: 'booking' | 'blocked';
  reason?: string;
}

const HostCalendarManager: React.FC<HostCalendarManagerProps> = ({
  propertyId,
  className
}) => {
  const [unavailableDates, setUnavailableDates] = useState<UnavailableDate[]>([]);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [reason, setReason] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch unavailable dates
  const fetchUnavailableDates = async () => {
    try {
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
      toast.error("Could not load calendar data");
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchUnavailableDates();
    }
  }, [propertyId]);

  // Check if a date is unavailable
  const isDateUnavailable = (date: Date) => {
    if (isBefore(date, new Date())) {
      return true;
    }
    
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

  // Block selected dates
  const handleBlockDates = async () => {
    if (!selectedRange?.from || !selectedRange?.to) {
      toast.error("Please select a date range");
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('property_unavailability')
        .insert({
          property_id: propertyId,
          start_date: format(selectedRange.from, 'yyyy-MM-dd'),
          end_date: format(selectedRange.to, 'yyyy-MM-dd'),
          reason: reason || "Blocked by host"
        });
      
      if (error) throw error;
      
      toast.success("Dates blocked successfully!");
      setSelectedRange(undefined);
      setReason("");
      setIsDialogOpen(false);
      fetchUnavailableDates();
    } catch (error) {
      console.error("Error blocking dates:", error);
      toast.error("Failed to block dates. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Unblock dates
  const handleUnblockDates = async (id: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
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

  const blockedDates = unavailableDates.filter(date => date.type === 'blocked');
  const bookedDates = unavailableDates.filter(date => date.type === 'booking');

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Manage Calendar Availability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Calendar
              mode="range"
              selected={selectedRange}
              onSelect={setSelectedRange}
              numberOfMonths={1}
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
                <span>Booked (Cannot modify)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded opacity-70"></div>
                <span>Blocked by you</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded"></div>
                <span>Selected</span>
              </div>
            </div>

            {selectedRange?.from && selectedRange?.to && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    Block Selected Dates
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Block Selected Dates</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <span className="font-medium">
                        {format(selectedRange.from, 'MMM d')} - {format(selectedRange.to, 'MMM d, yyyy')}
                      </span>
                    </div>
                    
                    <div>
                      <Label htmlFor="reason">Reason (optional)</Label>
                      <Textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="e.g., Personal use, Maintenance, etc."
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={handleBlockDates}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        {isLoading ? (
                          <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Blocking...
                          </>
                        ) : (
                          "Block Dates"
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Blocked Dates</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {blockedDates.map((period, index) => (
                  <div key={period.id || index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md border">
                    <div>
                      <div className="text-sm font-medium">
                        {format(period.start, 'MMM d')} - {format(period.end, 'MMM d, yyyy')}
                      </div>
                      {period.reason && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {period.reason}
                        </div>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => period.id && handleUnblockDates(period.id)}
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                {blockedDates.length === 0 && (
                  <p className="text-sm text-muted-foreground">No dates are currently blocked</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Booked Dates</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {bookedDates.map((period, index) => (
                  <div key={period.id || index} className="flex justify-between items-center p-3 bg-red-50 rounded-md border border-red-100">
                    <div className="text-sm">
                      {format(period.start, 'MMM d')} - {format(period.end, 'MMM d, yyyy')}
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      Booked
                    </Badge>
                  </div>
                ))}
                
                {bookedDates.length === 0 && (
                  <p className="text-sm text-muted-foreground">No confirmed bookings yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HostCalendarManager;
