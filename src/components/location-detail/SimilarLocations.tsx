
import React from 'react';
import LocationCard from "@/components/LocationCard";
import { LocationProps } from "@/components/LocationCard";

interface SimilarLocationsProps {
  locations: LocationProps[];
}

const SimilarLocations = ({ locations }: SimilarLocationsProps) => {
  if (locations.length === 0) {
    return null;
  }
  
  return (
    <section className="mt-16" aria-labelledby="similar-locations-heading">
      <h2 id="similar-locations-heading" className="text-2xl font-bold mb-6">Similar Filming Locations in Lagos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <LocationCard key={location.id} {...location} />
        ))}
      </div>
    </section>
  );
};

export default SimilarLocations;
