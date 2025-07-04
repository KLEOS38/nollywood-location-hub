
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const GuestDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchGuestData();
    }
  }, [user]);

  const fetchGuestData = async () => {
    try {
      // Fetch bookings
      const { data: bookingData } = await supabase
        .from('bookings')
        .select(`
          *,
          properties:property_id(title, address, price, property_images(url, is_primary))
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      // Fetch favorites
      const { data: favoriteData } = await supabase
        .from('favorites')
        .select(`
          *,
          properties:property_id(
            id, title, address, price, neighborhood, 
            property_images(url, is_primary)
          )
        `)
        .eq('user_id', user?.id);

      setBookings(bookingData || []);
      setFavorites(favoriteData || []);
    } catch (error) {
      console.error('Error fetching guest data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.start_date) > new Date() && booking.status === 'confirmed'
  );

  const pastBookings = bookings.filter(booking => 
    new Date(booking.end_date) < new Date() || booking.status === 'completed'
  );

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Upcoming Trips</p>
                <p className="text-2xl font-bold">{upcomingBookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Past Trips</p>
                <p className="text-2xl font-bold">{pastBookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Saved Properties</p>
                <p className="text-2xl font-bold">{favorites.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Trips */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Trips</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src={booking.properties?.property_images?.find((img: any) => img.is_primary)?.url || '/placeholder.svg'}
                      alt={booking.properties?.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{booking.properties?.title}</h3>
                      <p className="text-sm text-muted-foreground">{booking.properties?.address}</p>
                      <p className="text-sm">
                        {format(new Date(booking.start_date), 'MMM d')} - {format(new Date(booking.end_date), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                    <p className="text-sm font-medium mt-1">₦{booking.total_price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No upcoming trips</p>
          )}
        </CardContent>
      </Card>

      {/* Saved Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((favorite) => (
                <Link key={favorite.id} to={`/locations/${favorite.properties.id}`}>
                  <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={favorite.properties?.property_images?.find((img: any) => img.is_primary)?.url || '/placeholder.svg'}
                      alt={favorite.properties?.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold truncate">{favorite.properties?.title}</h3>
                      <p className="text-sm text-muted-foreground">{favorite.properties?.neighborhood}</p>
                      <p className="font-medium">₦{favorite.properties?.price.toLocaleString()}/day</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No saved properties</p>
          )}
        </CardContent>
      </Card>

      {/* Past Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Past Trips</CardTitle>
        </CardHeader>
        <CardContent>
          {pastBookings.length > 0 ? (
            <div className="space-y-4">
              {pastBookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src={booking.properties?.property_images?.find((img: any) => img.is_primary)?.url || '/placeholder.svg'}
                      alt={booking.properties?.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{booking.properties?.title}</h3>
                      <p className="text-sm text-muted-foreground">{booking.properties?.address}</p>
                      <p className="text-sm">
                        {format(new Date(booking.start_date), 'MMM d')} - {format(new Date(booking.end_date), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Button variant="outline" size="sm">
                      <Star className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                    <p className="text-sm font-medium mt-1">₦{booking.total_price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No past trips</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestDashboard;
