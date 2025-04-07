
import { LocationProps } from "@/components/LocationCard";

export const MOCK_LOCATIONS: LocationProps[] = [
  {
    id: "1",
    title: "Luxury Waterfront Villa in Lekki",
    type: "Villa",
    neighborhood: "Lekki Phase 1",
    price: 250000,
    rating: 4.9,
    reviewCount: 48,
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    amenities: ["Generator", "AC", "Security", "Pool", "Home Theater", "Parking"],
    isVerified: true,
  },
  {
    id: "2",
    title: "Contemporary Studio with Professional Lighting",
    type: "Studio",
    neighborhood: "Victoria Island",
    price: 180000,
    rating: 4.7,
    reviewCount: 36,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    amenities: ["Professional Lighting", "AC", "WiFi", "Generator", "Makeup Room"],
    isVerified: true,
  },
  {
    id: "3",
    title: "Traditional Lagos Home with Colonial Architecture",
    type: "Home",
    neighborhood: "Ikoyi",
    price: 120000,
    rating: 4.5,
    reviewCount: 23,
    imageUrl: "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    amenities: ["Generator", "Garden", "Security", "Parking"],
    isVerified: false,
  },
  {
    id: "4",
    title: "Modern High-Rise Apartment with City Views",
    type: "Apartment",
    neighborhood: "Eko Atlantic",
    price: 220000,
    rating: 4.8,
    reviewCount: 42,
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    amenities: ["AC", "Generator", "Security", "Wifi", "Parking", "Elevator"],
    isVerified: true,
  },
  {
    id: "5",
    title: "Rustic Warehouse Space for Industrial Scenes",
    type: "Warehouse",
    neighborhood: "Apapa",
    price: 150000,
    rating: 4.3,
    reviewCount: 17,
    imageUrl: "https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    amenities: ["High Ceilings", "Generator", "Loading Dock", "Parking"],
    isVerified: false,
  },
  {
    id: "6",
    title: "Spacious Mansion with Exotic Garden",
    type: "Mansion",
    neighborhood: "Banana Island",
    price: 350000,
    rating: 5.0,
    reviewCount: 29,
    imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    amenities: ["Pool", "Garden", "Generator", "AC", "Security", "Home Theater", "Parking"],
    isVerified: true,
  },
  {
    id: "7",
    title: "Cozy Bungalow in Quiet Neighborhood",
    type: "Home",
    neighborhood: "Surulere",
    price: 85000,
    rating: 4.4,
    reviewCount: 31,
    imageUrl: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    amenities: ["Generator", "AC", "Parking", "Garden"],
    isVerified: false,
  },
  {
    id: "8",
    title: "Penthouse with Panoramic Lagos Lagoon View",
    type: "Apartment",
    neighborhood: "Victoria Island",
    price: 280000,
    rating: 4.9,
    reviewCount: 45,
    imageUrl: "https://images.unsplash.com/photo-1494526585095-c41cabfe98bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    amenities: ["AC", "Generator", "Security", "Pool", "Gym", "Parking", "Elevator"],
    isVerified: true,
  }
];

export const getLocationById = (id: string): LocationProps | undefined => {
  return MOCK_LOCATIONS.find(location => location.id === id);
};

export function getRelatedLocations(currentId: string, count = 3): LocationProps[] {
  return MOCK_LOCATIONS
    .filter(location => location.id !== currentId)
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}
