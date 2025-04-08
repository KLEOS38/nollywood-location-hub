
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Clapperboard, Home, Calendar, CreditCard, Camera, Star, Users, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <>
      <Helmet>
        <title>How It Works | Nollywood Locations</title>
        <meta name="description" content="Learn how Nollywood Locations connects filmmakers with perfect filming locations across Lagos and how our platform works for both parties." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="bg-nollywood-primary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">How Nollywood Locations Works</h1>
                <p className="text-lg text-muted-foreground mb-6">Our platform connects filmmakers with perfect locations while giving property owners a way to earn from their spaces</p>
              </div>
            </div>
          </section>
          
          <section className="py-16">
            <div className="container mx-auto px-4">
              <Tabs defaultValue="filmmakers" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 mb-12">
                  <TabsTrigger value="filmmakers" className="text-lg py-3">For Filmmakers</TabsTrigger>
                  <TabsTrigger value="hosts" className="text-lg py-3">For Property Owners</TabsTrigger>
                </TabsList>
                
                <TabsContent value="filmmakers" className="mt-0">
                  <div className="space-y-16">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                      <div className="md:w-1/2">
                        <div className="bg-nollywood-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                          <Clapperboard className="h-8 w-8 text-nollywood-primary" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">1. Search for Locations</h2>
                        <p className="text-lg text-muted-foreground mb-6">Browse our extensive database of verified filming locations. Filter by location type, area, budget, amenities, and more to find spaces that match your production needs.</p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Search by neighborhood, property type, or specific features</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>View high-quality photos of each space</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Read detailed descriptions and amenities lists</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Check reviews from other filmmakers</span>
                          </li>
                        </ul>
                      </div>
                      <div className="md:w-1/2">
                        <img 
                          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Searching for filming locations" 
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                      <div className="md:w-1/2 order-2 md:order-1">
                        <img 
                          src="https://images.unsplash.com/photo-1551184451-76b792384f93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Booking a filming location" 
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                      <div className="md:w-1/2 order-1 md:order-2">
                        <div className="bg-nollywood-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                          <Calendar className="h-8 w-8 text-nollywood-primary" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">2. Book Your Location</h2>
                        <p className="text-lg text-muted-foreground mb-6">Once you find the perfect location, submit a booking request with your filming details. Our streamlined process makes securing locations quick and efficient.</p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Select your filming dates and times</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Share details about your production and crew size</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Message hosts with specific questions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Request scouting visits if needed</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                      <div className="md:w-1/2">
                        <div className="bg-nollywood-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                          <CreditCard className="h-8 w-8 text-nollywood-primary" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">3. Secure Payment Process</h2>
                        <p className="text-lg text-muted-foreground mb-6">When your booking is approved, complete the reservation with our secure payment system. Payments are held until check-in to ensure your satisfaction.</p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Transparent pricing with no hidden fees</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Secure payment processing</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Funds held in escrow until successful check-in</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Digital location agreement and receipts</span>
                          </li>
                        </ul>
                      </div>
                      <div className="md:w-1/2">
                        <img 
                          src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Secure payment for booking" 
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                      <div className="md:w-1/2 order-2 md:order-1">
                        <img 
                          src="https://images.unsplash.com/photo-1532800783378-1bed60adaf58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Film crew shooting" 
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                      <div className="md:w-1/2 order-1 md:order-2">
                        <div className="bg-nollywood-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                          <Camera className="h-8 w-8 text-nollywood-primary" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">4. Shoot Your Production</h2>
                        <p className="text-lg text-muted-foreground mb-6">Arrive at your location and start filming with confidence. Our team is available to assist with any issues that may arise during your shoot.</p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Smooth check-in process with the property owner</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>24/7 support for urgent issues</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Option to extend booking if needed (subject to availability)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Clear communication channels with the host</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                      <div className="md:w-1/2">
                        <div className="bg-nollywood-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                          <Star className="h-8 w-8 text-nollywood-primary" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">5. Share Your Experience</h2>
                        <p className="text-lg text-muted-foreground mb-6">After your shoot, leave a review to help other filmmakers and strengthen our community. Your feedback improves our platform for everyone.</p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Rate your experience with the location and host</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Share specific feedback about filming conditions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Help other filmmakers make informed decisions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                            <span>Build your profile and reputation in the community</span>
                          </li>
                        </ul>
                      </div>
                      <div className="md:w-1/2">
                        <img 
                          src="https://images.unsplash.com/photo-1622290319146-7b63df48a635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Sharing feedback after filming" 
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12 text-center">
                    <Link to="/locations">
                      <Button size="lg" className="bg-nollywood-primary hover:bg-nollywood-primary/90">
                        Start Browsing Locations
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
                
                <TabsContent value="hosts" className="mt-0">
                  <div className="space-y-16">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                      <div className="md:w-1/2">
                        <div className="bg-nollywood-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                          <Home className="h-8 w-8 text-nollywood-secondary" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">1. List Your Property</h2>
                        <p className="text-lg text-muted-foreground mb-6">Create a detailed listing for your property, showcasing its features and unique aspects that would appeal to filmmakers.</p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Upload high-quality photos of your space</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Write detailed descriptions highlighting filming advantages</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>List amenities, specifications, and house rules</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Set your availability calendar and pricing</span>
                          </li>
                        </ul>
                      </div>
                      <div className="md:w-1/2">
                        <img 
                          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Listing a property for filming" 
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                      <div className="md:w-1/2 order-2 md:order-1">
                        <img 
                          src="https://images.unsplash.com/photo-1616587226157-48e49175ee20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Reviewing booking requests" 
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                      <div className="md:w-1/2 order-1 md:order-2">
                        <div className="bg-nollywood-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                          <Calendar className="h-8 w-8 text-nollywood-secondary" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">2. Receive Booking Requests</h2>
                        <p className="text-lg text-muted-foreground mb-6">Review and respond to booking requests from filmmakers. You have full control over which productions you approve for your space.</p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Get notified when filmmakers are interested in your property</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Review production details and crew size</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Communicate directly with filmmakers to answer questions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Accept or decline requests based on your preference</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                      <div className="md:w-1/2">
                        <div className="bg-nollywood-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                          <Users className="h-8 w-8 text-nollywood-secondary" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">3. Prepare for Filming</h2>
                        <p className="text-lg text-muted-foreground mb-6">Once a booking is confirmed, prepare your property for the production crew's arrival. We provide guidelines to help ensure a smooth experience.</p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Receive a preparation checklist from our team</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Coordinate check-in details with the filmmaker</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Secure or remove valuables if desired</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Prepare any specific areas mentioned in the booking</span>
                          </li>
                        </ul>
                      </div>
                      <div className="md:w-1/2">
                        <img 
                          src="https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Preparing home for filming" 
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                      <div className="md:w-1/2 order-2 md:order-1">
                        <img 
                          src="https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Host welcoming film crew" 
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                      <div className="md:w-1/2 order-1 md:order-2">
                        <div className="bg-nollywood-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                          <Camera className="h-8 w-8 text-nollywood-secondary" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">4. Host the Production</h2>
                        <p className="text-lg text-muted-foreground mb-6">Welcome the film crew to your property and provide access as agreed. You can choose to be present during filming or give the crew their space.</p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Conduct a property walkthrough with the production manager</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Review house rules and important information</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Decide whether to remain on-site or return later</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Ensure smooth communication during the shoot</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                      <div className="md:w-1/2">
                        <div className="bg-nollywood-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                          <CreditCard className="h-8 w-8 text-nollywood-secondary" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">5. Get Paid and Leave Reviews</h2>
                        <p className="text-lg text-muted-foreground mb-6">Receive payment after the successful check-in, and share your experience with other hosts by reviewing the filmmaker and production team.</p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Payment is released 24 hours after successful check-in</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Funds deposited directly to your bank account</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Share your experience by reviewing the filmmaker</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-nollywood-secondary flex-shrink-0 mt-0.5" />
                            <span>Build your reputation as a reliable host</span>
                          </li>
                        </ul>
                      </div>
                      <div className="md:w-1/2">
                        <img 
                          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                          alt="Getting paid for property rental" 
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12 text-center">
                    <Link to="/list-property">
                      <Button size="lg" className="bg-nollywood-primary hover:bg-nollywood-primary/90">
                        List Your Property
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Nollywood Locations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="bg-nollywood-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Star className="h-6 w-6 text-nollywood-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Verified Listings</h3>
                    <p className="text-muted-foreground">All premium listings are physically verified to ensure accuracy and quality. What you see is what you get.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="bg-nollywood-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <CreditCard className="h-6 w-6 text-nollywood-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
                    <p className="text-muted-foreground">Our secure escrow payment system protects both parties and ensures transparent transactions.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="bg-nollywood-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-nollywood-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Community Trust</h3>
                    <p className="text-muted-foreground">Our review system and verification process creates accountability and builds trust within the Nollywood community.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-nollywood-dark text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8">Join our growing community of filmmakers and property owners revolutionizing location scouting in Nigeria.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/locations">
                  <Button size="lg" className="bg-nollywood-primary hover:bg-nollywood-primary/90 text-white">
                    Browse Locations
                  </Button>
                </Link>
                <Link to="/list-property">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    List Your Property
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

export default HowItWorks;
