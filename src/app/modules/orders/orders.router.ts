import express from 'express';
import { orderController } from './orders.controler';
import validationRequest from '../../middlewares/validateRequest';
import { orderValidationSchema } from './orders.validation';

const router = express.Router();

router.post('/orders', validationRequest(orderValidationSchema.CreateOrderValidationSchema) , orderController.createOrder);
router.get('/orders', orderController.getallOrder);
router.get('/orders/:orderId', orderController.getOrderById);
router.patch('/orders/:orderId',validationRequest(orderValidationSchema.UpdateOrderValidationSchema), orderController.updateOrder);
router.delete('/orders/:orderId', orderController.deleteOrder);

export const orderRouter = router;
