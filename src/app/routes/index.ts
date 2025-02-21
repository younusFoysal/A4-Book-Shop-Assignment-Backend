import { Router } from 'express';
import { userRouter } from '../modules/users/user.route';
import { authRouter } from '../modules/auth/auth.router';
import { AdminRouter } from '../modules/admin/admin.route';
import { porductRouter } from '../modules/product/product.router';
import { stripeRouter } from '../modules/stripe/Stripe.router';
import { orderRouter } from '../modules/orders/orders.router';

const router = Router();

const moduleRoutes = [
  { path: '/', route: userRouter, },
  { path: '/', route: authRouter, },
  { path: '/', route: AdminRouter, },
  { path: '/', route: porductRouter, },
  { path: '/', route: stripeRouter, },
  { path: '/', route: orderRouter, },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
