export interface Merchant {
  id: string;
  name: string;
  logo: string;
  logoBg: string;
  category: string;
  location: {
    city: string;
    region: string;
  };
  address: string;
  phone: string;
  website: string;
  hours: string;
  rating: number;
  reviews: number;
  description: string;
  services: string[];
  workingHours: {
    [key: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
  verified: boolean;
  featured?: boolean;
  delivery?: boolean;
  pickup?: boolean;
  theme?: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
}

export interface Review {
  id: string;
  merchantId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'consumer' | 'merchant' | 'admin';
  avatar?: string;
  verified: boolean;
}

export interface SearchFilters {
  category: string;
  location: string;
  rating: number;
  verified: boolean;
}