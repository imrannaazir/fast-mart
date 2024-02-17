import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createProductValidationSchema } from './product.validation';
import ProductController from './product.controller';

const router = Router();

// create product : POST
router.post(
  '/',
  validateRequest(createProductValidationSchema),
  ProductController.createProduct,
);

// get all product : POST
router.get('/', ProductController.getAllProduct);
const ProductRoutes = router;
export default ProductRoutes;
