import Stripe from 'stripe';
import config from '../../config';
export const stripe = new Stripe(config.stripe_api_secret_key!);