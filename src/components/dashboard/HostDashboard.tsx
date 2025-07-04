
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Calendar, DollarSign, MessageSquare, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const HostDashboard = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [earnings, setEarnings] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchHostData();
    }
  }, [user]);

  const fetchHostData = async () => {
    try {
      // Fetch properties
      const { data: propertyData } = await supabase
        .from('properties')
        .select(`
          *,
          property_images(url, is_primary)
        `)
        .eq('owner_id', user?.id);

      // Fetch bookings for host's properties
      const propertyIds = propertyData?.map(p => p.id) || [];
      const { data: bookingData } = await supabase
        .from('bookings')
        .select(`
          *,
          properties:property_id(title),
          profiles:user_id(name, email)
        `)
        .in('property_id', propertyIds)
        .order('created_at', { ascending: false });

      // Calculate earnings
      const totalEarnings = bookingData?.reduce((total, booking) => {
        if (booking.status === 'completed' && booking.payment_status === 'paid') {
          return total + Number(booking.total_price);
        }
        return total;
      }, 0) || 0;

      setProperties(propertyData || []);
      setBookings(bookingData || []);
      setEarnings(totalEarnings);
    } catch (error) {
      console.error('Error fetching host data:', error);
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

  const pendingBookings = bookings.filter(booking => booking.status === 'pending');
  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.start_date) > new Date() && booking.status === 'confirmed'
  );

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Properties</p>
                <p className="text-2xl font-bold">{properties.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold">₦{earnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
                <p className="text-2xl font-bold">{pendingBookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link to="/list-property">
              <Button>Add New Property</Button>
            </Link>
            <Link to="/manage-properties">
              <Button variant="outline">Manage Properties</Button>
            </Link>
            <Button variant="outline">View Analytics</Button>
            <Button variant="outline">Manage Calendar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Pending Booking Requests */}
      {pendingBookings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Booking Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{booking.properties?.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Requested by: {booking.profiles?.name || booking.profiles?.email}
                    </p>
                    <p className="text-sm">
                      {format(new Date(booking.start_date), 'MMM d')} - {format(new Date(booking.end_date), 'MMM d, yyyy')}
                    </p>
                    <p className="text-sm">Team size: {booking.team_size} people</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-medium">₦{booking.total_price.toLocaleString()}</p>
                    <div className="space-x-2">
                      <Button size="sm">Accept</Button>
                      <Button size="sm" variant="outline">Decline</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Your Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {properties.slice(0, 6).map((property) => (
                <Link key={property.id} to={`/locations/${property.id}`}>
                  <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={property.property_images?.find((img: any) => img.is_primary)?.url || '/placeholder.svg'}
                      alt={property.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold truncate">{property.title}</h3>
                      <p className="text-sm text-muted-foreground">{property.neighborhood}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-medium">₦{property.price.toLocaleString()}/day</p>
                        <div className="flex items-center space-x-1">
                          {property.is_verified && (
                            <Badge variant="secondary" className="text-xs">Verified</Badge>
                          )}
                          {!property.is_published && (
                            <Badge variant="destructive" className="text-xs">Draft</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You haven't listed any properties yet</p>
              <Link to="/list-property">
                <Button>List Your First Property</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{booking.properties?.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Guest: {booking.profiles?.name || booking.profiles?.email}
                    </p>
                    <p className="text-sm">
                      {format(new Date(booking.start_date), 'MMM d')} - {format(new Date(booking.end_date), 'MMM d, yyyy')}
                    </p>
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
            <p className="text-center text-muted-foreground py-8">No upcoming bookings</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HostDashboard;
