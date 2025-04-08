
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Clapperboard, Camera, ArrowRight, Star, MessageSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const ForFilmmakers = () => {
  return (
    <>
      <Helmet>
        <title>For Filmmakers | Nollywood Locations</title>
        <meta name="description" content="Resources, guides and tips for Nollywood filmmakers looking for perfect filming locations in Lagos." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="relative py-20">
            <div className="absolute inset-0 bg-gradient-to-r from-nollywood-dark/90 to-nollywood-dark/70 z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1533927857203-9f96f58e8624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')" 
              }}
            ></div>
            
            <div className="container mx-auto px-4 relative z-20">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">For Nollywood Filmmakers</h1>
                <p className="text-xl text-white/90 mb-8">Discover perfect filming locations and resources to bring your Nollywood productions to life.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/locations">
                    <Button size="lg" className="bg-nollywood-primary hover:bg-nollywood-primary/90">
                      Browse Locations
                    </Button>
                  </Link>
                  <Link to="/resources">
                    <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/60 hover:bg-white/20">
                      Filmmaker Resources
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">How Nollywood Locations Works for Filmmakers</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="bg-nollywood-primary/10 rounded-full p-4 inline-flex mb-4">
                    <Clapperboard className="h-8 w-8 text-nollywood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Discover Locations</h3>
                  <p className="text-muted-foreground">Browse our extensive collection of verified filming locations across Lagos. Filter by location type, area, price, and amenities to find the perfect match for your production.</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-nollywood-primary/10 rounded-full p-4 inline-flex mb-4">
                    <Camera className="h-8 w-8 text-nollywood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Book with Confidence</h3>
                  <p className="text-muted-foreground">Secure your location with transparent pricing, verified photos, and reviews from other filmmakers. Our booking system handles payments and agreements securely.</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-nollywood-primary/10 rounded-full p-4 inline-flex mb-4">
                    <Star className="h-8 w-8 text-nollywood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Film Successfully</h3>
                  <p className="text-muted-foreground">Get the support you need during your shoot. After wrapping, share your experience with our community through reviews to help fellow filmmakers.</p>
                </div>
              </div>
              
              <div className="text-center">
                <Link to="/how-it-works">
                  <Button variant="outline" className="mt-4">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Find the Perfect Location for Your Production</h2>
              
              <Tabs defaultValue="residential" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="residential">Residential</TabsTrigger>
                  <TabsTrigger value="commercial">Commercial</TabsTrigger>
                  <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
                  <TabsTrigger value="specialized">Specialized</TabsTrigger>
                </TabsList>
                
                <TabsContent value="residential" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1558442074-3c19857bc1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Modern apartment living room" 
                        className="rounded-lg mb-4 h-60 w-full object-cover"
                      />
                      <h3 className="text-xl font-semibold mb-2">Homes & Apartments</h3>
                      <p className="text-muted-foreground mb-4">From luxury penthouses to traditional family homes, find the perfect residential setting for your scene.</p>
                      <Link to="/locations?type=residential">
                        <Button variant="outline" size="sm">Browse Residential</Button>
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Modern Apartment</h4>
                        <p className="text-sm text-muted-foreground">High-rise apartments with city views and contemporary interiors.</p>
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Luxury Villas</h4>
                        <p className="text-sm text-muted-foreground">Spacious homes with premium amenities and distinctive architecture.</p>
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Traditional Homes</h4>
                        <p className="text-sm text-muted-foreground">Authentic Nigerian family homes with cultural elements.</p>
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Unique Living Spaces</h4>
                        <p className="text-sm text-muted-foreground">Creative and unusual residential spaces with character.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="commercial" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Modern office space" 
                        className="rounded-lg mb-4 h-60 w-full object-cover"
                      />
                      <h3 className="text-xl font-semibold mb-2">Commercial Spaces</h3>
                      <p className="text-muted-foreground mb-4">Office buildings, retail spaces, restaurants, and more to create authentic business environments.</p>
                      <Link to="/locations?type=commercial">
                        <Button variant="outline" size="sm">Browse Commercial</Button>
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Modern Offices</h4>
                        <p className="text-sm text-muted-foreground">Contemporary work environments from startups to corporate headquarters.</p>
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Restaurants & Cafés</h4>
                        <p className="text-sm text-muted-foreground">Dining establishments with various atmospheres and styles.</p>
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Retail Spaces</h4>
                        <p className="text-sm text-muted-foreground">Shops, boutiques, and storefronts available during off-hours.</p>
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Hotels & Lobbies</h4>
                        <p className="text-sm text-muted-foreground">Elegant hospitality spaces for upscale scene settings.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="outdoor" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1596465203915-ef2c9c9b0474?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Beautiful garden space" 
                        className="rounded-lg mb-4 h-60 w-full object-cover"
                      />
                      <h3 className="text-xl font-semibold mb-2">Outdoor Locations</h3>
                      <p className="text-muted-foreground mb-4">Natural landscapes, gardens, streets, and outdoor urban spaces for exterior shots.</p>
                      <Link to="/locations?type=outdoor">
                        <Button variant="outline" size="sm">Browse Outdoor</Button>
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Private Gardens</h4>
                        <p className="text-sm text-muted-foreground">Lush green spaces with controlled access for uninterrupted filming.</p>
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Rooftops & Terraces</h4>
                        <p className="text-sm text-muted-foreground">Elevated outdoor spaces with skyline or city views.</p>
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Private Streets</h4>
                        <p className="text-sm text-muted-foreground">Gated communities and private roads for street scenes.</p>
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Waterfront Properties</h4>
                        <p className="text-sm text-muted-foreground">Locations with beach access, pools, or water features.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="specialized" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1604014137308-73e16d7d6f2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Hospital set" 
                        className="rounded-lg mb-4 h-60 w-full object-cover"
                      />
                      <h3 className="text-xl font-semibold mb-2">Specialized Settings</h3>
                      <p className="text-muted-foreground mb-4">Unique locations with specific themes, purposes, or atmospheres for specialized scenes.</p>
                      <Link to="/locations?type=specialized">
                        <Button variant="outline" size="sm">Browse Specialized</Button>
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Industrial Spaces</h4>
                        <p className="text-sm text-muted-foreground">Warehouses, factories, and workshops for gritty or technical settings.</p>
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Professional Sets</h4>
                        <p className="text-sm text-muted-foreground">Medical offices, courtrooms, or classrooms for institutional scenes.</p>
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Historical Locations</h4>
                        <p className="text-sm text-muted-foreground">Properties with vintage architecture and period features.</p>
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1">Creative Spaces</h4>
                        <p className="text-sm text-muted-foreground">Art studios, theaters, and uniquely designed interiors.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold mb-6">Benefits for Filmmakers</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-nollywood-primary/10 p-2 rounded-full mt-1">
                        <Star className="h-5 w-5 text-nollywood-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Verified Locations</h3>
                        <p className="text-muted-foreground">Every premium location is physically verified to ensure the photos and descriptions match reality.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-nollywood-primary/10 p-2 rounded-full mt-1">
                        <MessageSquare className="h-5 w-5 text-nollywood-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Direct Communication</h3>
                        <p className="text-muted-foreground">Message property owners directly to discuss specific needs, scout visits, or special arrangements.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-nollywood-primary/10 p-2 rounded-full mt-1">
                        <Users className="h-5 w-5 text-nollywood-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Filmmaker Community</h3>
                        <p className="text-muted-foreground">Connect with other Nollywood professionals, share experiences, and learn from their location reviews.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1612971599718-6e622565f65f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                    alt="Film crew on set" 
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-nollywood-primary/5">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">What Filmmakers Are Saying</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-nollywood-primary text-nollywood-primary" />
                        ))}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">"Nollywood Locations saved our production when we needed a last-minute replacement for a mansion scene. We found the perfect property within hours and the owner was incredibly accommodating."</p>
                  </CardContent>
                  <CardFooter>
                    <div>
                      <p className="font-semibold">Chioma A.</p>
                      <p className="text-sm text-muted-foreground">Director, "Lagos Nights"</p>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-nollywood-primary text-nollywood-primary" />
                        ))}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">"The location scouting feature saved us weeks of work. We were able to virtually narrow down our options before doing in-person visits. The property was exactly as described."</p>
                  </CardContent>
                  <CardFooter>
                    <div>
                      <p className="font-semibold">Emmanuel O.</p>
                      <p className="text-sm text-muted-foreground">Producer, "Family Ties"</p>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-nollywood-primary text-nollywood-primary" />
                        ))}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">"As an independent filmmaker with a limited budget, Nollywood Locations helped me find affordable yet professional-looking spaces. The transparent pricing meant no surprises."</p>
                  </CardContent>
                  <CardFooter>
                    <div>
                      <p className="font-semibold">Blessing K.</p>
                      <p className="text-sm text-muted-foreground">Independent Filmmaker</p>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-nollywood-dark text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Filming Location?</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8">Join hundreds of Nollywood filmmakers discovering ideal shooting locations today.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/auth?tab=signup">
                  <Button size="lg" className="bg-nollywood-primary hover:bg-nollywood-primary/90 text-white">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/locations">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Browse Locations
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ForFilmmakers;
