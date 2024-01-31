import { CartItem } from '../context/CartContext';
import { Currency } from './currency';

export interface IOrderData {
  products: CartItem[];
  totalPrice: number;
  shippingAddress: object;
  paymentMethod: string;
  paymentProvider?: string;
  transactionId?: number;
  currency?: Currency;
}

export interface Order {
  user: string;
  products: CartItem[];
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  totalPrice: number;
  shippingAddress: object;
  paymentMethod: 'Credit Card' | 'PayPal' | 'Cash on Delivery';
  transactionId: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
