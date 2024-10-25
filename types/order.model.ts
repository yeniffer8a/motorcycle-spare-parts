import { Product } from './product.model';
import { User } from './User';

export interface Order {
  _id: string;
  user: string;
  products: [product: string, quantity: number];
  total: number;
  shippingAdress: string;
  paymentMethod: string;
  __v: number;
}
