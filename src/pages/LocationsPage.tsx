
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterBar from "@/components/FilterBar";
import LocationCard from "@/components/LocationCard";
import { MOCK_LOCATIONS } from "@/data/mockLocations";
import { Helmet } from 'react-helmet-async';

const LocationsPage = () => {
  return (
    <>
      <Helmet>
        <title>Browse Filming Locations in Lagos | Nollywood Locations</title>
        <meta name="description" content="Find the perfect house, apartment, or studio for your next Nollywood film production in Lagos. All locations verified with filmmaker reviews." />
        <link rel="canonical" href="https://www.nollywoodlocations.com/locations" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <FilterBar />
        
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            <section aria-labelledby="locations-heading">
              <div className="mb-6">
                <h1 id="locations-heading" className="text-2xl font-bold mb-2">Filming Locations in Lagos</h1>
                <p className="text-muted-foreground">
                  {MOCK_LOCATIONS.length} verified locations available for your next production
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {MOCK_LOCATIONS.map((location) => (
                  <LocationCard key={location.id} {...location} />
                ))}
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default LocationsPage;
