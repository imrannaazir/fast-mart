import { placeOrderValidation } from '@repo/utils/zod-schemas';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import OrderController from './order.controller';

const router = Router();

// create order
router.post(
  '/place',
  auth(),
  validateRequest(placeOrderValidation),
  OrderController.placeOrder,
);

const OrderRoute = router;
export default OrderRoute;
