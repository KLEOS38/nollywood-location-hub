
import React from 'react';
import LocationCard from "@/components/LocationCard";
import { LocationProps } from "@/components/LocationCard";

interface SimilarLocationsProps {
  locations: LocationProps[];
}

const SimilarLocations = ({ locations }: SimilarLocationsProps) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Similar Locations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <LocationCard key={location.id} {...location} />
        ))}
      </div>
    </div>
  );
};

export default SimilarLocations;
