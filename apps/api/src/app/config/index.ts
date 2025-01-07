import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config();

// Fallback to .env file if process.env is empty
if (Object.keys(process.env).length === 0) {
  dotenv.config({ path: path.join(process.cwd(), '..', '..', '.env') });
}

export default {
  port: process.env.PORT,
  app_url: process.env.APP_URL,
  origin_url_1: process.env.ORIGIN_URL_1,
  origin_url_2: process.env.ORIGIN_URL_2,
  database_url: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  salt_rounds: process.env.SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_verify_secret: process.env.JWT_VERIFY_SECRET,
  jwt_access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  jwt_refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  jwt_verify_token_expires_in: process.env.JWT_VERIFY_TOKEN_EXPIRES_IN,
  data_limit: process.env.DATA_LIMIT,
  client_url: process.env.CLIENT_URL,
  super_admin: {
    email: process.env.SUPER_ADMIN_EMAIL,
    password: process.env.SUPER_ADMIN_PASSWORD,
    phone_number: process.env.SUPER_ADMIN_PHONE_NUMBER,
  },
  demo_user_email: process.env.DEMO_USER_EMAIL,
  shipping_amount: process.env.SHIPPING_AMOUNT,
  my_email_address: process.env.MY_EMAIL_ADDRESS,
  email_app_password: process.env.EMAIL_APP_PASSWORD,
  stripe_api_secret_key: process.env.STRIPE_API_SECRET_KEY,
};
