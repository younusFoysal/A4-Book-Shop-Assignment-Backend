import { model, Schema } from 'mongoose';
import { TOrderData } from './orders.interface';

const OrderSchema = new Schema<TOrderData>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required'],
  },
  productName: String,
  productImage: String,
  productPrice: Number,
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Total price must be a positive number'],
  },
  user: {
    name: String,
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Please provide a valid email address',
      },
    },
  },
  paymentStatus: String,
  paymentId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export const OrderModel = model<TOrderData>('orders', OrderSchema);
