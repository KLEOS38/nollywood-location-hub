
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationCard from "@/components/LocationCard";
import { MOCK_LOCATIONS } from "@/data/mockLocations";
import { ArrowRight, Clapperboard, Home, ThumbsUp, Shield } from 'lucide-react';

const Index = () => {
  const featuredLocations = MOCK_LOCATIONS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="h-[600px] bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1613545325268-9265e1609167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')" 
          }}
        ></div>
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Find Perfect Locations for Your Film Production</h1>
              <p className="text-xl text-white mb-8">The marketplace that connects filmmakers with verified filming locations across Lagos.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/locations">
                  <Button size="lg" className="bg-nollywood-primary hover:bg-nollywood-primary/90 text-white">
                    Browse Locations
                  </Button>
                </Link>
                <Link to="/list-property">
                  <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                    List Your Property
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Locations */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Locations</h2>
            <Link to="/locations" className="flex items-center text-nollywood-primary hover:underline">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLocations.map((location) => (
              <LocationCard key={location.id} {...location} />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-nollywood-primary/10 p-4 rounded-full mb-4">
                <Clapperboard className="h-8 w-8 text-nollywood-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Your Location</h3>
              <p className="text-muted-foreground">Browse verified homes, studios, and unique spaces for your next film production.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-nollywood-secondary/10 p-4 rounded-full mb-4">
                <Home className="h-8 w-8 text-nollywood-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Book With Confidence</h3>
              <p className="text-muted-foreground">Check ratings, amenities, and real reviews from other filmmakers before you book.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-nollywood-accent/20 p-4 rounded-full mb-4">
                <ThumbsUp className="h-8 w-8 text-nollywood-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Shoot Your Film</h3>
              <p className="text-muted-foreground">Get support during your shoot and leave reviews to help the film community.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust & Safety */}
      <section className="py-16 bg-nollywood-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">We've Got Your Back</h2>
              <p className="text-lg mb-6">At Film Loca, we understand the importance of reliable and truthful property listings for your production.</p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-nollywood-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Verified Listings</h3>
                    <p className="text-muted-foreground">All premium listings are physically verified by our team to ensure accuracy.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-nollywood-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Filmmaker Reviews</h3>
                    <p className="text-muted-foreground">Real reviews from film professionals who have filmed at the locations.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-nollywood-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Secure Payments</h3>
                    <p className="text-muted-foreground">Your booking payments are secure and only released to hosts after check-in.</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8">
                <Link to="/safety">
                  <Button>Learn More About Our Process</Button>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                alt="Film production" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-no-repeat bg-cover bg-center relative">
        <div className="absolute inset-0 bg-nollywood-dark/90 z-0"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')" 
          }}
        ></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Find Your Next Filming Location?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-white">Join hundreds of filmmakers who are discovering perfect filming locations across Lagos.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth?tab=signup">
              <Button size="lg" className="bg-nollywood-primary hover:bg-nollywood-primary/90 text-white">
                Sign Up as Filmmaker
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
      
      <Footer />
    </div>
  );
};

export default Index;
