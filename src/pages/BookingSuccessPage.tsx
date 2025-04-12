
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronRight, CalendarDays, Clock } from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from '@/lib/supabase';
import { format, addDays } from 'date-fns';

const BookingSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('booking_id');
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) {
        navigate('/locations');
        return;
      }
      
      try {
        // Get booking details
        const { data: bookingData, error: bookingError } = await supabase
          .from('bookings')
          .select(`
            *,
            properties:property_id(
              title,
              address,
              neighborhood,
              city,
              property_images(url, is_primary)
            )
          `)
          .eq('id', bookingId)
          .single();
        
        if (bookingError) throw bookingError;
        
        // Update booking status if needed
        if (bookingData.status === 'pending' && bookingData.payment_status === 'pending') {
          const { error: updateError } = await supabase
            .from('bookings')
            .update({
              status: 'confirmed',
              payment_status: 'paid'
            })
            .eq('id', bookingId);
          
          if (updateError) throw updateError;
          
          // Update local booking data
          bookingData.status = 'confirmed';
          bookingData.payment_status = 'paid';
        }
        
        setBooking(bookingData);
        setProperty(bookingData.properties);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching booking details:", error);
        setIsLoading(false);
      }
    };
    
    fetchBookingDetails();
  }, [bookingId, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold">Loading booking details...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!booking || !property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Booking not found</h2>
            <Button onClick={() => navigate('/locations')}>Browse Locations</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Get the primary image or first available image
  const propertyImage = 
    property.property_images?.find((img: any) => img.is_primary)?.url || 
    (property.property_images?.[0]?.url) || 
    '/placeholder.svg';
  
  return (
    <>
      <Helmet>
        <title>Booking Confirmed | Film Loca</title>
        <meta name="description" content="Your booking has been confirmed. Thank you for using Film Loca!" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow py-12">
          <div className="container max-w-4xl mx-auto px-4">
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="text-center bg-green-50 border-b border-green-100">
                <div className="flex justify-center mb-4">
                  <CheckCircle size={60} className="text-green-500" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl">Booking Confirmed!</CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Your booking at {property.title} has been confirmed and paid
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <img 
                      src={propertyImage} 
                      alt={property.title} 
                      className="w-full h-48 object-cover rounded-md"
                    />
                    
                    <div>
                      <h3 className="font-semibold text-lg">{property.title}</h3>
                      <p className="text-muted-foreground">{property.address}, {property.neighborhood}, {property.city}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="text-primary" size={20} />
                      <div>
                        <p className="font-medium">Booking Dates</p>
                        <p className="text-muted-foreground">
                          {format(new Date(booking.start_date), 'MMM d, yyyy')} to {format(new Date(booking.end_date), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="text-primary" size={20} />
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-muted-foreground">
                          {Math.ceil((new Date(booking.end_date).getTime() - new Date(booking.start_date).getTime()) / (1000 * 60 * 60 * 24))} days
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Team Size</span>
                        <span>{booking.team_size} people</span>
                      </div>
                      
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Booking Status</span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Payment Status</span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                        <span>Total Paid</span>
                        <span>₦{booking.total_price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-md border border-blue-100">
                  <h3 className="font-semibold mb-2">What's Next?</h3>
                  <p>The property owner will contact you shortly with additional details about your booking. You can view all your bookings in your profile dashboard.</p>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between">
                <Button onClick={() => navigate('/profile')} variant="outline" className="w-full sm:w-auto">
                  Go to Profile
                </Button>
                
                <Button onClick={() => navigate(`/locations/${booking.property_id}`)} className="w-full sm:w-auto">
                  View Property <ChevronRight size={16} className="ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default BookingSuccessPage;
