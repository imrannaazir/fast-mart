import { postReviewApiValidator } from '@repo/utils/zod-schemas';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import ReviewControllers from './review.controllers';

const router = Router();

router.post(
  '/post',
  auth('USER'),
  validateRequest(postReviewApiValidator),
  ReviewControllers.postReview,
);

const ReviewRoutes = router;
export default ReviewRoutes;
