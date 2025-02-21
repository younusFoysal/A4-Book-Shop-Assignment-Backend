import express from 'express';
import { BlockController } from './admin.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.patch(
  '/admin/users/:userId/block',
  auth('admin'),
  BlockController.BlockUser,
);

export const AdminRouter = router;
