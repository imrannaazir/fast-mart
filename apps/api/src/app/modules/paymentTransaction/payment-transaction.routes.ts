import { createPaymentIntentValidationSchema } from '@repo/utils/zod-schemas';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import PaymentTransactionControllers from './payment-transactions.controllers';

const router = Router();

router.post(
  '/create-payment-intent',
  auth('USER'),
  validateRequest(createPaymentIntentValidationSchema),
  PaymentTransactionControllers.createPaymentIntent,
);

const PaymentTransactionRoutes = router;
export default PaymentTransactionRoutes;
