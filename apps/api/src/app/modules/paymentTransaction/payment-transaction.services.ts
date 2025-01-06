import { stripe } from './payment-transaction.utils';

const createPaymentIntent = async (amount: number) => {
  const intent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  return { clientSecret: intent.client_secret };
};

const PaymentTransactionServices = {
  createPaymentIntent,
};
export default PaymentTransactionServices;
