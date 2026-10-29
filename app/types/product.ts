export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
  images: string[];
}
export interface Category {
  slug: string;
  name: string;
  url: string;
}
