import { PaymentType } from '@repo/utils/constants';
import { TPaymentTransaction } from '@repo/utils/types';
import { model, Schema } from 'mongoose';
type TTransaction = Omit<
  TPaymentTransaction,
  '_id' | 'createdAt' | 'updatedAt'
>;
const paymentTransactionSchema = new Schema<TTransaction>({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'order',
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
    enum: PaymentType,
    default: 'CARD',
  },
  transactionId: {
    type: String,
    required: true,
  },
});

const PaymentTransaction = model<TTransaction>(
  'paymentTransaction',
  paymentTransactionSchema,
);

export default PaymentTransaction;
