// API endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// App configuration
export const APP_CONFIG = {
  name: 'ALX Listing App',
  description: 'Find and book unique places to stay',
  defaultCurrency: 'USD',
  itemsPerPage: 12,
};

// Common amenities
export const AMENITIES = [
  'WiFi',
  'Kitchen',
  'Air Conditioning',
  'Heating',
  'Parking',
  'Pool',
  'Gym',
  'TV',
  'Washer',
  'Dryer',
  'Hot Tub',
  'Workspace',
  'Pet Friendly',
  'Smoking Allowed',
] as const;

// Sort options
export const SORT_OPTIONS = [
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
] as const;

// Price ranges for filters
export const PRICE_RANGES = [
  { min: 0, max: 50, label: 'Under $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 200, label: '$100 - $200' },
  { min: 200, max: 500, label: '$200 - $500' },
  { min: 500, max: Infinity, label: '$500+' },
] as const;

// Booking status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
} as const;

// Route paths
export const ROUTES = {
  HOME: '/',
  LISTINGS: '/listings',
  LISTING_DETAIL: '/listings/:id',
  PROFILE: '/profile',
  BOOKINGS: '/bookings',
} as const;
