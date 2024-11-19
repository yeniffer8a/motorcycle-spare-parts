export interface Product {
  _id?: string;
  cod: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  model: string;
  category: string;
  dimensions: string;
  stock: number;
  image: string;
  __v?: number;
}
