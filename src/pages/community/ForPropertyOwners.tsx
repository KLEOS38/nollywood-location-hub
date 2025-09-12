
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Home, DollarSign, Camera, Shield, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const ForPropertyOwners = () => {
  return (
    <>
      <Helmet>
        <title>For Property Owners | Film Loca</title>
        <meta name="description" content="List your property as a filming location and earn extra income with Film Loca." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <div 
              className="h-[400px] bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')" 
              }}
            ></div>
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Earn Income from Your Property</h1>
                  <p className="text-xl text-white mb-8">Turn your home, business, or unique space into a filming location and generate additional revenue.</p>
                  <Link to="/list-property">
                    <Button size="lg" className="bg-nollywood-primary hover:bg-nollywood-primary/90 text-white">
                      List Your Property
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          {/* Benefits Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why List Your Property With Us</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nollywood-primary/10 p-4 rounded-full mb-4">
                      <DollarSign className="h-8 w-8 text-nollywood-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Significant Income</h3>
                    <p className="text-muted-foreground">
                      Earn more in a day of filming than you might in a month of traditional rentals.
                    </p>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nollywood-secondary/10 p-4 rounded-full mb-4">
                      <Shield className="h-8 w-8 text-nollywood-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Property Protection</h3>
                    <p className="text-muted-foreground">
                      Film crews are required to have insurance, and we help verify proper coverage is in place.
                    </p>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nollywood-accent/20 p-4 rounded-full mb-4">
                      <Camera className="h-8 w-8 text-nollywood-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">See Your Space on Screen</h3>
                    <p className="text-muted-foreground">
                      Experience the excitement of seeing your property featured in films and productions.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </section>
          
          {/* How It Works */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1560518883-729e1bfc7a76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                      alt="Modern home interior" 
                      className="rounded-lg shadow-xl"
                    />
                  </div>
                  
                  <div>
                    <ol className="relative border-l border-nollywood-primary">
                      <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-nollywood-primary rounded-full -left-4 text-white">1</span>
                        <h3 className="text-lg font-semibold mb-1">Create Your Listing</h3>
                        <p className="text-muted-foreground">
                          Sign up and create a detailed listing with professional photos, property features, and available dates.
                        </p>
                      </li>
                      <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-nollywood-primary rounded-full -left-4 text-white">2</span>
                        <h3 className="text-lg font-semibold mb-1">Set Your Rates</h3>
                        <p className="text-muted-foreground">
                          Determine your daily rates, minimum booking requirements, and any special conditions.
                        </p>
                      </li>
                      <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-nollywood-primary rounded-full -left-4 text-white">3</span>
                        <h3 className="text-lg font-semibold mb-1">Review Booking Requests</h3>
                        <p className="text-muted-foreground">
                          Receive notifications when filmmakers are interested in your property. Review details and approve bookings.
                        </p>
                      </li>
                      <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-nollywood-primary rounded-full -left-4 text-white">4</span>
                        <h3 className="text-lg font-semibold mb-1">Get Paid</h3>
                        <p className="text-muted-foreground">
                          Receive secure payments through our platform after the filming is completed.
                        </p>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Property Types */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Properties in Demand</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="relative overflow-hidden rounded-lg group h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                    alt="Modern home" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-background/70"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-semibold text-white">Modern Homes</h3>
                    <p className="text-white/80 text-sm">Popular for contemporary dramas</p>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-lg group h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                    alt="Luxury villa" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-background/70"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-semibold text-white">Luxury Villas</h3>
                    <p className="text-white/80 text-sm">Highly sought for upscale productions</p>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-lg group h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                    alt="Traditional homes" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-background/70"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-semibold text-white">Traditional Homes</h3>
                    <p className="text-white/80 text-sm">Perfect for cultural and historical films</p>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-lg group h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                    alt="Office spaces" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-background/70"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-semibold text-white">Office Spaces</h3>
                    <p className="text-white/80 text-sm">Essential for corporate scenes</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Rates & Earnings */}
          <section className="py-16 bg-nollywood-primary/5">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Potential Earnings</h2>
              
              <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-4 font-semibold">Property Type</th>
                        <th className="text-right pb-4 font-semibold">Average Daily Rate</th>
                        <th className="text-right pb-4 font-semibold">Potential Monthly (4 days)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-4">Apartment</td>
                        <td className="text-right py-4">₦50,000 - ₦150,000</td>
                        <td className="text-right py-4">₦200,000 - ₦600,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-4">Urban Home</td>
                        <td className="text-right py-4">₦100,000 - ₦250,000</td>
                        <td className="text-right py-4">₦400,000 - ₦1,000,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-4">Luxury Villa</td>
                        <td className="text-right py-4">₦250,000 - ₦500,000</td>
                        <td className="text-right py-4">₦1,000,000 - ₦2,000,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-4">Office Space</td>
                        <td className="text-right py-4">₦150,000 - ₦300,000</td>
                        <td className="text-right py-4">₦600,000 - ₦1,200,000</td>
                      </tr>
                      <tr>
                        <td className="py-4">Unique/Specialty Location</td>
                        <td className="text-right py-4">₦200,000 - ₦800,000</td>
                        <td className="text-right py-4">₦800,000 - ₦3,200,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 bg-nollywood-primary/5 p-4 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-nollywood-primary mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      <strong>Note:</strong> Rates vary based on property size, condition, uniqueness, location, and demand. Film Loca charges a 3% commission on successful bookings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Testimonials */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">What Property Owners Say</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <blockquote className="flex-grow mb-4 italic text-muted-foreground">
                      "I've made more from 3 days of filming than a month of traditional rental. The Film Loca team handles everything professionally and the crews have been respectful of my property."
                    </blockquote>
                    <div className="mt-auto">
                      <p className="font-semibold">Michael Adeyemi</p>
                      <p className="text-sm text-muted-foreground">Luxury Villa Owner, Ikoyi</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <blockquote className="flex-grow mb-4 italic text-muted-foreground">
                      "As a business owner, I was hesitant to have filming in my office space. But Film Loca made sure everything went smoothly, and it was a great source of additional income."
                    </blockquote>
                    <div className="mt-auto">
                      <p className="font-semibold">Amina Bello</p>
                      <p className="text-sm text-muted-foreground">Office Space Owner, Victoria Island</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <blockquote className="flex-grow mb-4 italic text-muted-foreground">
                      "It's exciting to see my home in films and TV shows! The platform is easy to use, and I've had multiple bookings within the first month of listing."
                    </blockquote>
                    <div className="mt-auto">
                      <p className="font-semibold">James Okafor</p>
                      <p className="text-sm text-muted-foreground">Apartment Owner, Lekki</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 bg-nollywood-primary text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to List Your Property?</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8">
                Join hundreds of property owners earning significant income by hosting film productions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/auth?tab=signup">
                  <Button size="lg" variant="outline" className="border-white hover:bg-white/20 text-white">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/list-property">
                  <Button size="lg" className="bg-white text-nollywood-primary hover:bg-white/90">
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

export default ForPropertyOwners;
