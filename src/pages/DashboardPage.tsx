
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Heart, Home, MessageSquare, Star, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useFavorites } from '@/hooks/useFavorites';
import FavoriteButton from '@/components/FavoriteButton';
import StarRating from '@/components/StarRating';

interface Booking {
  id: string;
  start_date: string;
  end_date: string;
  status: string;
  total_price: number;
  property: {
    title: string;
    imageUrl: string;
  };
}

interface Property {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  status: string;
  bookings: number;
}

const DashboardPage = () => {
  const { user, profile } = useAuth();
  const { favorites } = useFavorites();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [favoriteProperties, setFavoriteProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch user's bookings with property data
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select(`
          *,
          properties:property_id (
            title,
            property_images!property_images_property_id_fkey (url)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      // Transform bookings data to match interface
      const transformedBookings = bookingsData?.map((booking: any) => ({
        id: booking.id,
        start_date: booking.start_date,
        end_date: booking.end_date,
        status: booking.status,
        total_price: booking.total_price,
        property: {
          title: booking.properties?.title || 'Unknown Property',
          imageUrl: booking.properties?.property_images?.[0]?.url || '/placeholder.svg'
        }
      })) || [];

      // Fetch user's properties if they're a host
      const { data: propertiesData } = await supabase
        .from('properties')
        .select(`
          *,
          property_images!property_images_property_id_fkey (url)
        `)
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      // Transform properties data to match interface
      const transformedProperties = propertiesData?.map((property: any) => ({
        id: property.id,
        title: property.title,
        price: property.price,
        imageUrl: property.property_images?.[0]?.url || '/placeholder.svg',
        status: property.is_published ? 'published' : 'draft',
        bookings: 0 // This would need a separate query to count bookings
      })) || [];

      // Fetch favorite properties
      const { data: favoritesData } = await supabase
        .from('favorites')
        .select(`
          property_id,
          properties:property_id (
            *,
            property_images!property_images_property_id_fkey (url)
          )
        `)
        .eq('user_id', user.id);

      setBookings(transformedBookings);
      setProperties(transformedProperties);
      setFavoriteProperties(favoritesData?.map(f => f.properties) || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | Nollywood Locations</title>
        <meta name="description" content="Manage your bookings, properties, and account on Nollywood Locations." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {profile?.name || user?.email}!
              </h1>
              <p className="text-muted-foreground">
                Manage your bookings, properties, and account from your dashboard.
              </p>
            </div>

            <Tabs defaultValue="bookings" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="properties">My Properties</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{bookings.length}</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {bookings.filter(b => new Date(b.start_date) > new Date() && b.status === 'confirmed').length}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Favorite Properties</CardTitle>
                      <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{favorites.length}</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {bookings.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No bookings yet. <a href="/locations" className="text-nollywood-primary hover:underline">Start exploring properties!</a>
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {bookings.map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <img 
                                src={booking.property?.imageUrl || '/placeholder.svg'} 
                                alt={booking.property?.title}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div>
                                <h4 className="font-medium">{booking.property?.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                                </p>
                                <p className="text-sm font-medium">₦{booking.total_price.toLocaleString()}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="properties" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Properties</h2>
                  <Button onClick={() => window.location.href = '/list-property'}>
                    <Home className="w-4 h-4 mr-2" />
                    Add Property
                  </Button>
                </div>

                {properties.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No properties listed yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start earning by listing your property for film productions
                      </p>
                      <Button onClick={() => window.location.href = '/list-property'}>
                        List Your Property
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                      <Card key={property.id}>
                        <CardContent className="p-4">
                          <img 
                            src={property.imageUrl || '/placeholder.svg'} 
                            alt={property.title}
                            className="w-full h-48 rounded-lg object-cover mb-4"
                          />
                          <h3 className="font-medium mb-2">{property.title}</h3>
                          <p className="text-lg font-bold text-nollywood-primary mb-2">
                            ₦{property.price.toLocaleString()}/day
                          </p>
                          <Badge variant={property.status === 'published' ? 'default' : 'secondary'}>
                            {property.status}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="favorites" className="space-y-6">
                <h2 className="text-2xl font-bold">Favorite Properties</h2>
                
                {favoriteProperties.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Save properties you love to view them later
                      </p>
                      <Button onClick={() => window.location.href = '/locations'}>
                        Explore Properties
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteProperties.map((property) => (
                      <Card key={property.id} className="relative">
                        <div className="absolute top-3 right-3 z-10">
                          <FavoriteButton propertyId={property.id} />
                        </div>
                        <CardContent className="p-4">
                          <img 
                            src={property.property_images?.[0]?.url || '/placeholder.svg'} 
                            alt={property.title}
                            className="w-full h-48 rounded-lg object-cover mb-4"
                          />
                          <h3 className="font-medium mb-2">{property.title}</h3>
                          <p className="text-lg font-bold text-nollywood-primary mb-2">
                            ₦{property.price.toLocaleString()}/day
                          </p>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => window.location.href = `/locations/${property.id}`}
                          >
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <h2 className="text-2xl font-bold">My Reviews</h2>
                <Card>
                  <CardContent className="text-center py-12">
                    <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
                    <p className="text-muted-foreground">
                      Reviews from your bookings will appear here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;
