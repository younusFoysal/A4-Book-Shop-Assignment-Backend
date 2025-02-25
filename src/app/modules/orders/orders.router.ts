import express from 'express';
import { orderController } from './orders.controler';
import validationRequest from '../../middlewares/validateRequest';
import { orderValidationSchema } from './orders.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/orders', auth('user'), validationRequest(orderValidationSchema.CreateOrderValidationSchema) , orderController.createOrder);
router.get('/orders', orderController.getallOrder);
router.get('/orders/:orderId', orderController.getOrderById);
router.patch('/orders/:orderId', auth('admin'), validationRequest(orderValidationSchema.UpdateOrderValidationSchema), orderController.updateOrder);
router.delete('/orders/:orderId', auth('admin'), orderController.deleteOrder);

export const orderRouter = router;
