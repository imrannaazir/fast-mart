import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createProductValidationSchema,
  deleteBulkProductValidationSchema,
} from './product.validation';
import ProductController from './product.controller';
import auth from '../../middlewares/auth';

const router = Router();

// create product : POST
router.post(
  '/',
  auth('user'),
  validateRequest(createProductValidationSchema),
  ProductController.createProduct,
);

// get all product : POST
router.get('/', ProductController.getAllProduct);

//get highest product price
router.get('/highest-price', ProductController.getHighestProductPrice);

//get single product : GET
router.get('/:id', ProductController.getSingleProductById);

// update single product : PATCH
router.patch('/:id', auth('user'), ProductController.updateProductById);

// delete bulk product : DELETE
router.delete(
  '/bulk-delete',
  auth('user'),
  validateRequest(deleteBulkProductValidationSchema),
  ProductController.deleteBulkProduct,
);

// delete product : DELETE
router.delete('/:id', auth('user'), ProductController.deleteProductById);

const ProductRoutes = router;
export default ProductRoutes;
