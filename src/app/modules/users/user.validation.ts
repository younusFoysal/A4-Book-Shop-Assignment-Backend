import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
});
const UpdateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    role: z.enum(['user', 'admin']).optional().default('user'),
    isBlocked: z.boolean().optional().default(false),
  }),
});

export const UservalidationSchema = {
  createUserValidationSchema,
  UpdateUserValidationSchema,
};
