import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { authvalidationSchema } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/auth/login',
  validationRequest(authvalidationSchema.loginValidationSchema),
  AuthController.loginUser,
);

export const authRouter = router;
