import {
  loginValidationSchema,
  refreshTokenValidationSchema,
  registrationValidationSchema,
  resentVerificationEmailSchema,
  verifyAccountValidationSchema,
} from '@repo/utils/zod-schemas';
import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AuthController from './auth.controller';

const router = Router();

// register : POST
router.post(
  '/register',
  validateRequest(registrationValidationSchema),
  AuthController.register,
);

router.post(
  '/resent-verification-link',
  validateRequest(resentVerificationEmailSchema),
  AuthController.resentVerificationEmail,
);

router.post(
  '/verify-account',
  validateRequest(verifyAccountValidationSchema),
  AuthController.verifyAccount,
);
// login : POST
router.post(
  '/login',
  validateRequest(loginValidationSchema),
  AuthController.login,
);

// refresh token : POST
router.post(
  '/refresh-token',

  validateRequest(refreshTokenValidationSchema),
  AuthController.refreshToken,
);

// logout
router.post('/logout', AuthController.logout);
const AuthRoutes = router;
export default AuthRoutes;
