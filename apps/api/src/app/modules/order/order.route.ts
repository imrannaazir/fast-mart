import { placeOrderValidation } from '@repo/utils/zod-schemas';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import OrderControllers from './order.controller';

const router = Router();

// create order
router.post(
  '/place',
  auth('USER'),
  validateRequest(placeOrderValidation),
  OrderControllers.placeOrder,
);

// get my orders
router.get('/me/all', auth('USER'), OrderControllers.getMyOrders);

// get my order by id
router.get('/me/:orderId', auth('USER'), OrderControllers.getMyOrderById);

// get admin all orders
router.get(
  '/admin/all',
  auth('SUPER_ADMIN', 'ADMIN'),
  OrderControllers.getAllAdminOrders,
);

router.get(
  '/admin/:orderId',
  auth('ADMIN', 'SUPER_ADMIN'),
  OrderControllers.getAdminOrderById,
);
const OrderRoute = router;
export default OrderRoute;
