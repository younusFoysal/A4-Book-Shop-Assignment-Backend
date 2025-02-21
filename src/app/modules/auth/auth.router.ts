import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { authvalidationSchema } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/auth/login',
  validationRequest(authvalidationSchema.loginValidationSchema),
  AuthController.loginUser,
);

router.post('/change-password', auth('user'), AuthController.changePassword);

export const authRouter = router;
