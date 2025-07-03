
import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, isWithinInterval, isBefore, startOfDay } from 'date-fns';
import { supabase } from '@/lib/supabase';

interface AvailabilityCalendarProps {
  propertyId: string;
  onDateSelect?: (startDate: Date | null, endDate: Date | null) => void;
  selectedStartDate?: Date | null;
  selectedEndDate?: Date | null;
}

interface UnavailableDate {
  start: Date;
  end: Date;
  type: 'booking' | 'blocked';
}

const AvailabilityCalendar = ({ 
  propertyId, 
  onDateSelect, 
  selectedStartDate, 
  selectedEndDate 
}: AvailabilityCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState<UnavailableDate[]>([]);
  const [selectedRange, setSelectedRange] = useState<{ from?: Date; to?: Date }>({
    from: selectedStartDate || undefined,
    to: selectedEndDate || undefined
  });

  useEffect(() => {
    fetchUnavailableDates();
  }, [propertyId]);

  const fetchUnavailableDates = async () => {
    try {
      // Fetch booked dates
      const { data: bookings } = await supabase
        .from('bookings')
        .select('start_date, end_date')
        .eq('property_id', propertyId)
        .in('status', ['confirmed', 'completed']);

      // Fetch blocked dates
      const { data: blocked } = await supabase
        .from('property_unavailability')
        .select('start_date, end_date')
        .eq('property_id', propertyId);

      const combined: UnavailableDate[] = [
        ...(bookings || []).map(booking => ({
          start: new Date(booking.start_date),
          end: new Date(booking.end_date),
          type: 'booking' as const
        })),
        ...(blocked || []).map(block => ({
          start: new Date(block.start_date),
          end: new Date(block.end_date),
          type: 'blocked' as const
        }))
      ];

      setUnavailableDates(combined);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const isDateUnavailable = (date: Date) => {
    const dayStart = startOfDay(date);
    
    // Disable past dates
    if (isBefore(dayStart, startOfDay(new Date()))) {
      return true;
    }

    // Check if date is within any unavailable period
    return unavailableDates.some(period => 
      isWithinInterval(dayStart, { 
        start: startOfDay(period.start), 
        end: startOfDay(period.end) 
      })
    );
  };

  const handleSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (!range) {
      setSelectedRange({});
      onDateSelect?.(null, null);
      return;
    }

    setSelectedRange(range);
    onDateSelect?.(range.from || null, range.to || null);
  };

  const clearDates = () => {
    setSelectedRange({});
    onDateSelect?.(null, null);
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Select check-in date</h3>
        <Button variant="ghost" onClick={clearDates} className="text-sm underline">
          Clear dates
        </Button>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-8">
          <span className="font-medium">{format(currentMonth, 'MMMM yyyy')}</span>
          <span className="font-medium">{format(addMonths(currentMonth, 1), 'MMMM yyyy')}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Calendar
          mode="range"
          selected={selectedRange}
          onSelect={handleSelect}
          disabled={isDateUnavailable}
          month={currentMonth}
          className="border rounded-md"
        />
        <Calendar
          mode="range"
          selected={selectedRange}
          onSelect={handleSelect}
          disabled={isDateUnavailable}
          month={addMonths(currentMonth, 1)}
          className="border rounded-md"
        />
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-200 border border-red-300 rounded"></div>
          <span>Unavailable</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary border rounded"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
