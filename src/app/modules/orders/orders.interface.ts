import { Schema } from 'mongoose';

export interface TOrderData {
  productId: Schema.Types.ObjectId;
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
  totalPrice: number;
  user: {
    name: string;
    email: string;
  };
  paymentStatus: string;
  paymentId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
