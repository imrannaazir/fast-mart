import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  loginValidationSchema,
  registrationValidationSchema,
} from './auth.validation';
import AuthController from './auth.controller';

const router = Router();

// register : POST
router.post(
  '/register',
  validateRequest(registrationValidationSchema),
  AuthController.register,
);

// login : POST
router.post(
  '/login',
  validateRequest(loginValidationSchema),
  AuthController.login,
);
const AuthRoutes = router;
export default AuthRoutes;
