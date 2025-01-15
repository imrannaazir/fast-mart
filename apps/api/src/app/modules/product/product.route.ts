import {
  createProductValidationSchema,
  deleteBulkProductValidationSchema,
} from '@repo/utils/zod-schemas';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import ProductController from './product.controller';

const router = Router();

// create product : POST
router.post(
  '/',
  auth('ADMIN', 'SUPER_ADMIN'),
  validateRequest(createProductValidationSchema),
  ProductController.createProduct,
);

// get all product : GET
router.get('/', ProductController.getAllProduct);
// get top product : GET
router.get('/top-products', ProductController.getTopProducts);

//get highest product price
router.get('/highest-price', ProductController.getHighestProductPrice);

//get single product : GET
router.get(
  '/:id',

  ProductController.getSingleProductById,
);

// update single product : PATCH
router.patch(
  '/:id',
  auth('ADMIN', 'SUPER_ADMIN'),
  ProductController.updateProductById,
);

// delete bulk product : DELETE
router.delete(
  '/bulk-delete',
  auth('ADMIN', 'SUPER_ADMIN'),
  validateRequest(deleteBulkProductValidationSchema),
  ProductController.deleteBulkProduct,
);

// delete product : DELETE
router.delete(
  '/:id',
  auth('ADMIN', 'SUPER_ADMIN'),
  ProductController.deleteProductById,
);

const ProductRoutes = router;
export default ProductRoutes;
