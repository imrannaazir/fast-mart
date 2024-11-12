import { wishlistItemValidationSchema } from '@repo/utils/zod-schemas';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import WishlistControllers from './wishlist-item.controllers';

const router = Router();

// add product to wishlist  : POST
router.post(
  '/toggle',
  auth(),
  validateRequest(wishlistItemValidationSchema),
  WishlistControllers.toggleProductInWishlist,
);

// get all user's wishlist items : GET
router.get('/', auth(), WishlistControllers.getAllUserWishlistItems);

const WishListRoutes = router;
export default WishListRoutes;
