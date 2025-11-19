export interface Auction {
  id: string;
  facilityName: string;
  address: string;
  city: string;
  state: string;
  date: string;
  time: string;
  lienAmount: number;
  distance: number;
  lat: number;
  lng: number;
  unitNumber: string;
  description: string;
}

export interface ValuationResult {
  itemName: string;
  minValue: number;
  maxValue: number;
  confidence: number;
  comparables: Comparable[];
  isIrreplaceable: boolean;
  flagReason?: string;
}

export interface Comparable {
  title: string;
  price: number;
  source: string;
  imageUrl: string;
}

export interface User {
  id: string;
  email: string;
  tier: 'free' | 'premium';
  scansRemaining: number;
  violations: number;
  agreedToTerms: boolean;
}
