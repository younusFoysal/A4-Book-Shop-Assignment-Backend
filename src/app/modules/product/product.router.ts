import express from 'express';
import { productController } from './product.controller';
import validationRequest from '../../middlewares/validateRequest';
import { productValidationSchema } from './product.validation';

const router = express.Router();

router.post('/add-product', validationRequest(productValidationSchema.CreateProductValidationSchema), productController.createProduct,);
router.get('/allproducts', productController.getallproduct);
router.get('/product/:id', productController.getSingleProduct);
router.put('/product/:productId', validationRequest(productValidationSchema.UpdateProductValidationSchema), productController.updateProduct,);
router.delete('/product/:productId', productController.DeleteProduct);

export const porductRouter = router;
