import { Router } from 'express';
import auth from '../../middlewares/auth';
import CartItemControllers from './cart-item.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { updateProductToCartValidation } from '@repo/utils/zod-schemas';

const router = Router();

// update product to cart
router.put(
  '/update',
  auth(),
  validateRequest(updateProductToCartValidation),
  CartItemControllers.updateProductToCart,
);

const CartItemRoute = router;
export default CartItemRoute;
