export interface Product {
  readonly id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  discount: number;
  discountedPrice: number;
}