// Core listing interface for property listings
export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: {
    city: string;
    country: string;
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  host: {
    id: string;
    name: string;
    avatar?: string;
  };
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  guests: number;
  rating?: number;
  reviews?: number;
  available: boolean;
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinedDate: string;
}

// Booking interface
export interface Booking {
  id: string;
  listingId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// Filter options
export interface FilterOptions {
  priceRange?: {
    min: number;
    max: number;
  };
  bedrooms?: number;
  bathrooms?: number;
  guests?: number;
  amenities?: string[];
  location?: string;
}
