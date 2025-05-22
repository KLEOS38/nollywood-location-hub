
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import PropertyAvailabilityManager from "@/components/property/PropertyAvailabilityManager";
import { format } from 'date-fns';
import { toast } from 'sonner';

const PropertyManagementPage = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("properties");
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/auth');
      return;
    }

    // Load owner's properties and bookings
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get properties owned by the user
        const { data: propertyData, error: propertyError } = await supabase
          .from('properties')
          .select(`
            id,
            title,
            price,
            address,
            neighborhood,
            city,
            is_verified,
            is_published,
            property_images(url, is_primary)
          `)
          .eq('owner_id', user.id);

        if (propertyError) throw propertyError;
        
        // Set the first property as selected by default if available
        if (propertyData && propertyData.length > 0 && !selectedProperty) {
          setSelectedProperty(propertyData[0].id);
        }
        
        setProperties(propertyData || []);

        // Get bookings for properties owned by the user
        const { data: bookingData, error: bookingError } = await supabase
          .from('bookings')
          .select(`
            id,
            status,
            payment_status,
            start_date,
            end_date,
            total_price,
            team_size,
            notes,
            property_id,
            properties:property_id(title),
            profiles:user_id(name, email)
          `)
          .in(
            'property_id',
            propertyData?.map(p => p.id) || []
          )
          .order('created_at', { ascending: false });

        if (bookingError) throw bookingError;
        setBookings(bookingData || []);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load your property data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;

      // Update the local state
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.id === bookingId
            ? { ...booking, status: newStatus }
            : booking
        )
      );

      toast.success(`Booking status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'canceled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPaymentStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'unpaid':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'refunded':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-medium">Loading your properties...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Property Management</h1>
          <Button onClick={() => navigate("/list-property")}>
            + Add New Property
          </Button>
        </div>

        <Tabs
          defaultValue="properties"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full max-w-md mx-auto mb-6">
            <TabsTrigger value="properties" className="flex-1">
              My Properties ({properties.length})
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex-1">
              Bookings ({bookings.length})
            </TabsTrigger>
            <TabsTrigger value="availability" className="flex-1">
              Availability
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="properties" className="mt-4">
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => {
                  const primaryImage = property.property_images?.find((img: any) => img.is_primary)?.url;
                  const firstImage = property.property_images?.[0]?.url;
                  const imageUrl = primaryImage || firstImage || '/placeholder.svg';
                  
                  return (
                    <Card key={property.id} className="overflow-hidden">
                      <div className="relative h-48">
                        <img
                          src={imageUrl}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        {property.is_verified && (
                          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                            Verified
                          </div>
                        )}
                        {!property.is_published && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                            Not Published
                          </div>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <h3 className="font-bold text-lg truncate">{property.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {property.neighborhood}, {property.city}
                        </p>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="font-medium">₦{property.price.toLocaleString()} / day</p>
                      </CardContent>
                      <CardFooter className="flex gap-2 pt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedProperty(property.id);
                            setActiveTab("availability");
                          }}
                        >
                          Manage Availability
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => navigate(`/locations/${property.id}`)}
                        >
                          View
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-4">You haven't listed any properties yet</h3>
                <p className="mb-6 text-muted-foreground">
                  Start earning by listing your property on Film Loca
                </p>
                <Button onClick={() => navigate("/list-property")}>
                  List Your Property
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="bookings" className="mt-4">
            {bookings.length > 0 ? (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <h3 className="font-bold text-lg">
                          {booking.properties?.title || "Property"}
                        </h3>
                        <div className="flex gap-2 mt-2 md:mt-0">
                          <span className={`px-2 py-1 text-xs border rounded-full ${getStatusBadgeClass(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                          <span className={`px-2 py-1 text-xs border rounded-full ${getPaymentStatusBadgeClass(booking.payment_status)}`}>
                            {booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Booked by:</p>
                          <p className="font-medium">{booking.profiles?.name || "User"}</p>
                          <p className="text-sm">{booking.profiles?.email || ""}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Booking period:</p>
                          <p className="font-medium">
                            {format(new Date(booking.start_date), 'MMM d, yyyy')} - 
                            {format(new Date(booking.end_date), 'MMM d, yyyy')}
                          </p>
                          <p className="text-sm">Team size: {booking.team_size} people</p>
                        </div>
                      </div>
                      
                      {booking.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-muted-foreground">Notes:</p>
                          <p className="text-sm">{booking.notes}</p>
                        </div>
                      )}
                      
                      <div className="mt-3">
                        <p className="text-sm text-muted-foreground">Total payment:</p>
                        <p className="font-bold">₦{booking.total_price.toLocaleString()}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 pt-3 flex-wrap">
                      {booking.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}
                          >
                            Confirm Booking
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateBookingStatus(booking.id, 'canceled')}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateBookingStatus(booking.id, 'completed')}
                        >
                          Mark as Completed
                        </Button>
                      )}
                      <Link to={`/locations/${booking.property_id}`} className="ml-auto">
                        <Button
                          size="sm"
                          variant="ghost"
                        >
                          View Property
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-4">No bookings yet</h3>
                <p className="text-muted-foreground">
                  When users book your properties, they'll appear here
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="availability" className="mt-4">
            <div className="mb-6">
              <label className="font-medium mb-2 block">Select Property:</label>
              {properties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {properties.map((property) => (
                    <Button
                      key={property.id}
                      variant={selectedProperty === property.id ? "default" : "outline"}
                      className="justify-start overflow-hidden"
                      onClick={() => setSelectedProperty(property.id)}
                    >
                      <span className="truncate">{property.title}</span>
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="mb-4">You need to add a property first</p>
                  <Button onClick={() => navigate("/list-property")}>
                    List Your Property
                  </Button>
                </div>
              )}
            </div>
            
            {selectedProperty && (
              <PropertyAvailabilityManager propertyId={selectedProperty} />
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyManagementPage;
