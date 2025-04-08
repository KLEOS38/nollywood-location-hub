
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Home, ArrowRight, DollarSign, Shield, Calendar, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ForPropertyOwners = () => {
  return (
    <>
      <Helmet>
        <title>For Property Owners | Nollywood Locations</title>
        <meta name="description" content="List your property as a filming location and earn income by renting to Nollywood production crews." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="relative py-20">
            <div className="absolute inset-0 bg-gradient-to-r from-nollywood-dark/90 to-nollywood-secondary/70 z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')" 
              }}
            ></div>
            
            <div className="container mx-auto px-4 relative z-20">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Turn Your Property Into a Film Set</h1>
                <p className="text-xl text-white/90 mb-8">Earn extra income by renting your home, office, or unique space to Nollywood film productions.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/list-property">
                    <Button size="lg" className="bg-nollywood-primary hover:bg-nollywood-primary/90">
                      List Your Property
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/60 hover:bg-white/20">
                    Learn How It Works
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Why List Your Property with Nollywood Locations?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="text-center">
                  <div className="bg-nollywood-primary/10 rounded-full p-4 inline-flex mb-4">
                    <DollarSign className="h-8 w-8 text-nollywood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Lucrative Income</h3>
                  <p className="text-muted-foreground">Earn significant income from daily bookings. Properties can earn ₦50,000 to ₦500,000 per day depending on size and location.</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-nollywood-primary/10 rounded-full p-4 inline-flex mb-4">
                    <Shield className="h-8 w-8 text-nollywood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Safety & Security</h3>
                  <p className="text-muted-foreground">All filmmakers are verified, and our Host Guarantee provides protection against property damage during shoots.</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-nollywood-primary/10 rounded-full p-4 inline-flex mb-4">
                    <Calendar className="h-8 w-8 text-nollywood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Full Control</h3>
                  <p className="text-muted-foreground">You decide your availability, pricing, and house rules. Screen filmmakers and approve bookings that work for you.</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-nollywood-primary/10 rounded-full p-4 inline-flex mb-4">
                    <Camera className="h-8 w-8 text-nollywood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Industry Connections</h3>
                  <p className="text-muted-foreground">Connect with Nollywood professionals and potentially see your property featured in Nigerian films and series.</p>
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
              <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                    alt="Film crew setting up in living room" 
                    className="rounded-lg shadow-lg"
                  />
                </div>
                
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold mb-6">How Hosting Works</h2>
                  
                  <ol className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="bg-nollywood-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">1</div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">List Your Property</h3>
                        <p className="text-muted-foreground">Create a detailed listing with photos, description, amenities, and house rules. Set your availability and pricing.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-4">
                      <div className="bg-nollywood-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">2</div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Receive Booking Requests</h3>
                        <p className="text-muted-foreground">Filmmakers will submit booking requests with their production details, dates, and crew size for your review.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-4">
                      <div className="bg-nollywood-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">3</div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Approve and Host</h3>
                        <p className="text-muted-foreground">Review requests and communicate with filmmakers. Approve bookings that work for you and prepare for the shoot day.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-4">
                      <div className="bg-nollywood-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">4</div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Get Paid</h3>
                        <p className="text-muted-foreground">Payments are released to you 24 hours after successful check-in. No hassle with invoices or chasing payments.</p>
                      </div>
                    </li>
                  </ol>
                  
                  <div className="mt-8">
                    <Link to="/list-property">
                      <Button className="bg-nollywood-primary hover:bg-nollywood-primary/90">
                        Start Listing Your Property
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">What Makes a Great Film Location</h2>
              
              <Tabs defaultValue="popular" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="popular">Most Popular</TabsTrigger>
                  <TabsTrigger value="residential">Residential</TabsTrigger>
                  <TabsTrigger value="commercial">Commercial</TabsTrigger>
                  <TabsTrigger value="unique">Unique Spaces</TabsTrigger>
                </TabsList>
                
                <TabsContent value="popular" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Modern Lagos Apartments</CardTitle>
                        <CardDescription>High in demand for contemporary dramas</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <img 
                          src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Modern apartment interior" 
                          className="h-40 w-full object-cover rounded-md mb-3"
                        />
                        <p className="text-sm text-muted-foreground">Contemporary apartments with open floor plans, large windows, and modern furniture earn up to ₦150,000 per day.</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Luxury Villas</CardTitle>
                        <CardDescription>Perfect for high-end productions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <img 
                          src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Luxury villa exterior" 
                          className="h-40 w-full object-cover rounded-md mb-3"
                        />
                        <p className="text-sm text-muted-foreground">Spacious homes with premium amenities like pools, gardens, and luxury interiors can earn ₦250,000-500,000 daily.</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Office Spaces</CardTitle>
                        <CardDescription>Essential for corporate scenes</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <img 
                          src="https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Modern office space" 
                          className="h-40 w-full object-cover rounded-md mb-3"
                        />
                        <p className="text-sm text-muted-foreground">Professional office settings with meeting rooms and work areas are frequently booked for business-themed content.</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="residential" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">What Filmmakers Look For:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                          <span><strong>Space and Light:</strong> Open floor plans and good natural lighting are highly valued</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                          <span><strong>Character:</strong> Distinctive features that make your home unique</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                          <span><strong>Versatility:</strong> Spaces that can represent different settings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                          <span><strong>Accessibility:</strong> Easy parking and loading areas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                          <span><strong>Electrical Capacity:</strong> Sufficient power for film equipment</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Popular Residential Types:</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="font-semibold">Large Family Homes</h4>
                          <p className="text-sm text-muted-foreground">Spacious living areas, multiple bedrooms, and compound spaces</p>
                        </div>
                        
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="font-semibold">Modern Apartments</h4>
                          <p className="text-sm text-muted-foreground">Contemporary designs with city views and stylish interiors</p>
                        </div>
                        
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="font-semibold">Traditional Nigerian Homes</h4>
                          <p className="text-sm text-muted-foreground">Authentic spaces with cultural elements and character</p>
                        </div>
                        
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="font-semibold">Luxury Villas & Estates</h4>
                          <p className="text-sm text-muted-foreground">High-end properties for wealthy character portrayals</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="commercial" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Commercial Space Benefits:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                          <span><strong>Higher Rates:</strong> Commercial spaces often command premium pricing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                          <span><strong>Weekend Availability:</strong> Ideal for businesses that close on weekends</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                          <span><strong>Professional Setup:</strong> Often already configured for human activity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                          <span><strong>Easier Access:</strong> Better parking and loading facilities</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">In-Demand Commercial Spaces:</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="font-semibold">Office Settings</h4>
                          <p className="text-sm text-muted-foreground">Modern offices, boardrooms, and corporate environments</p>
                        </div>
                        
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="font-semibold">Restaurants & Cafés</h4>
                          <p className="text-sm text-muted-foreground">Dining establishments that can be filmed during off-hours</p>
                        </div>
                        
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="font-semibold">Retail Spaces</h4>
                          <p className="text-sm text-muted-foreground">Shops, boutiques, and storefronts for commercial scenes</p>
                        </div>
                        
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="font-semibold">Event Spaces</h4>
                          <p className="text-sm text-muted-foreground">Halls, lounges, and venues for entertainment sequences</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="unique" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">The Value of Unique Spaces:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                          <span><strong>Premium Pricing:</strong> Unique spaces often earn the highest rates</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                          <span><strong>High Demand:</strong> Hard-to-find locations are frequently booked</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                          <span><strong>Less Competition:</strong> Fewer similar properties available</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                          <span><strong>Production Exposure:</strong> Often featured prominently in shows</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Sought-After Unique Spaces:</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="font-semibold">Industrial Settings</h4>
                          <p className="text-sm text-muted-foreground">Warehouses, factories, and workshop spaces</p>
                        </div>
                        
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="font-semibold">Historical Properties</h4>
                          <p className="text-sm text-muted-foreground">Colonial-era buildings and traditional architecture</p>
                        </div>
                        
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="font-semibold">Scenic Outdoor Areas</h4>
                          <p className="text-sm text-muted-foreground">Private beaches, gardens, or waterfront properties</p>
                        </div>
                        
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="font-semibold">Specialty Spaces</h4>
                          <p className="text-sm text-muted-foreground">Studios, gymnasiums, churches, or school settings</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Host Success Stories</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold">Adeola J.</h3>
                    <p className="text-sm text-muted-foreground">Ikoyi, Lagos</p>
                  </div>
                  <p className="italic mb-4">"My apartment has been booked over 15 times in the past year. I've earned over ₦1.5 million just by allowing film crews to use my space a few days each month."</p>
                  <p className="text-sm">Property: Modern 3-bedroom apartment</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold">Michael O.</h3>
                    <p className="text-sm text-muted-foreground">Victoria Island, Lagos</p>
                  </div>
                  <p className="italic mb-4">"My office space is rented during weekends when we're closed. It's additional income with zero impact on our business operations. The process has been seamless."</p>
                  <p className="text-sm">Property: Corporate office with conference room</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold">Funmi A.</h3>
                    <p className="text-sm text-muted-foreground">Lekki, Lagos</p>
                  </div>
                  <p className="italic mb-4">"My family home has been featured in three major Nollywood films. The income helped us renovate our property, and it's exciting to see our home on screen!"</p>
                  <p className="text-sm">Property: Traditional family compound with garden</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Hosting Questions</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">Do I need to be present during filming?</h4>
                        <p className="text-muted-foreground">It's your choice. Many hosts choose to be present for the first hour to do a walkthrough, then return for checkout. Others prefer to remain on-site throughout filming.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">How much can I really earn?</h4>
                        <p className="text-muted-foreground">Earnings vary based on your property's size, uniqueness, and location. Standard homes typically earn ₦50,000-150,000 per day, while premium or unique properties can command ₦200,000-500,000 daily.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">How often will my property be booked?</h4>
                        <p className="text-muted-foreground">Booking frequency depends on your location, availability, and the appeal of your property. Some hosts have multiple bookings monthly, while others may have seasonal demand.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Safety & Logistics</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">Is my property protected from damage?</h4>
                        <p className="text-muted-foreground">Yes. All bookings require a security deposit, and our Host Guarantee provides additional protection. Filmmakers must also have liability insurance for larger productions.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">How are payments handled?</h4>
                        <p className="text-muted-foreground">All payments are processed securely through our platform. Funds are released to you 24 hours after the filmmaker checks in, allowing time to ensure everything is in order.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">What if I need to cancel a booking?</h4>
                        <p className="text-muted-foreground">While we encourage hosts to honor all bookings, we understand emergencies happen. Our cancellation policy outlines the process and any applicable fees for host cancellations.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-nollywood-dark text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Host Nollywood Productions?</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8">List your property today and start earning from the growing Nigerian film industry.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/list-property">
                  <Button size="lg" className="bg-nollywood-primary hover:bg-nollywood-primary/90 text-white">
                    List Your Property Now
                  </Button>
                </Link>
                <Link to="/auth?tab=signup">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Create Host Account
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

export default ForPropertyOwners;
