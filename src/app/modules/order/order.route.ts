import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createOrderValidationSchema } from './order.validation';
import OrderController from './order.controller';

const router = Router();

// create order
router.post(
  '/',
  validateRequest(createOrderValidationSchema),
  OrderController.createOrder,
);

// get all order
router.get('/', OrderController.getAllOrder);
const OrderRoute = router;
export default OrderRoute;
