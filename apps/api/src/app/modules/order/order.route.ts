import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createOrderValidationSchema } from '@repo/utils/zod-schemas';
import OrderController from './order.controller';
import auth from '../../middlewares/auth';

const router = Router();

// create order
router.post(
  '/',
  auth('USER', 'ADMIN'),
  validateRequest(createOrderValidationSchema),
  OrderController.createOrder,
);

// get all order
router.get('/', auth('ADMIN', 'USER'), OrderController.getAllOrder);
const OrderRoute = router;
export default OrderRoute;
