export interface Listing {
  id: string;
  title: string;
  price: number;
  address: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
}

export interface AuthUser {
  name: string;
  email: string;
}
