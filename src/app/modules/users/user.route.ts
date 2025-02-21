import express from 'express';
import { userController } from './user.controller';
import validationRequest from '../../middlewares/validateRequest';
import { UservalidationSchema } from './user.validation';

const router = express.Router();

router.post(
  '/auth/register',
  validationRequest(UservalidationSchema.createUserValidationSchema),
  userController.createUser,
);
router.get('/users', userController.getAllUsers);
router.get('/user/:userId', userController.getUserById);
router.patch('/user/:userId', userController.updateUser);
router.delete('/user/:userId', userController.deleteUser);


export const userRouter = router;
