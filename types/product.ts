export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  sizes?: string[];
  inStock: boolean;
  featured: boolean;
}