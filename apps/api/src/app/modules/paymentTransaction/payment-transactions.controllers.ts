import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import PaymentTransactionServices from './payment-transaction.services';

const createPaymentIntent = catchAsync(async (req, res) => {
  const { amount } = req.body;
  const result = await PaymentTransactionServices.createPaymentIntent(amount);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Payment intent created successfully.',
    data: result,
  });
});

const PaymentTransactionControllers = {
  createPaymentIntent,
};
export default PaymentTransactionControllers;
