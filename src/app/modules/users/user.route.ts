import express from 'express';
import { userController } from './user.controller';
import validationRequest from '../../middlewares/validateRequest';
import { UservalidationSchema } from './user.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/auth/register',
  validationRequest(UservalidationSchema.createUserValidationSchema),
  userController.createUser,
);
router.get('/users', auth('admin'), userController.getAllUsers);
router.get('/user/:userId', userController.getUserById);
router.patch('/user/:userId', userController.updateUser);
router.delete('/user/:userId', auth('admin'), userController.deleteUser);


export const userRouter = router;
