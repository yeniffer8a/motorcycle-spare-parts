import { Product } from './product.model';
import { User } from './User';

export interface Order {
  _id: string;
  user: User;
  products: [product: Product, quantity: number];
  total: number;
  shippingAdress: string;
  paymentMethod: string;
  __v: number;
}
export interface OrderProduct {
  product: Product;
  quantity: number;
  _id: string;
}
