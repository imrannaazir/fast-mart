import { wishlistItemValidationSchema } from '@repo/utils/zod-schemas';
import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import WishlistControllers from './wishlist-item.controllers';
import auth from '../../middlewares/auth';

const router = Router();

// add product to wishlist  : POST
router.post(
  '/add',
  auth(),
  validateRequest(wishlistItemValidationSchema),
  WishlistControllers.addProductToWishlist,
);

const WishListRoutes = router;
export default WishListRoutes;
