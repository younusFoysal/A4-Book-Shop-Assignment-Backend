import { z } from 'zod';

const CreateOrderValidationSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: 'Product ID is required' }).min(1, 'Product ID cannot be empty'),
    productName: z.string(),
    productImage: z.string().url(),
    productPrice: z.number().nonnegative(),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    totalPrice: z.number().nonnegative({ message: 'Total price must be a positive number' }),
    user: z.object({
      name: z.string(),
      email: z.string().email({ message: 'Please provide a valid email address' }),
    }),
    paymentStatus: z.string().optional(),
    paymentId: z.string().optional(),
    createdAt: z.date().optional(),
  }),
});

const UpdateOrderValidationSchema = z.object({
  body: z.object({
    productId: z.string().min(1, 'Product ID cannot be empty').optional(),
    productName: z.string().optional(),
    productImage: z.string().url().optional(),
    productPrice: z.number().nonnegative().optional(),
    quantity: z.number().min(1, 'Quantity must be at least 1').optional(),
    totalPrice: z.number().nonnegative({ message: 'Total price must be a positive number' }).optional(),
    user: z.object({
      name: z.string().optional(),
      email: z.string().email({ message: 'Please provide a valid email address' }).optional(),
    }).optional(),
    paymentStatus: z.string().optional(),
    paymentId: z.string().optional(),
    createdAt: z.date().optional(),
  }),
});

export const orderValidationSchema = {
  CreateOrderValidationSchema,
  UpdateOrderValidationSchema,
};