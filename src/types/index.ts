export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  brand: string;
  brandSlug: string;
  flavor: string;
  flavors: string[];
  image: string;
  images?: string[];
  price: number;
  originalPrice?: number;
  description: string;
  tags: string[];
  featured: boolean;
  badge?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  weight?: string;
  servings?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  productCount: number;
  color: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  image: string;
  productCount: number;
  country: string;
  featured: boolean;
}

export interface FilterState {
  category: string;
  brand: string;
  flavor: string;
  search: string;
  minPrice: number;
  maxPrice: number;
}
