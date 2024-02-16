import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { registrationValidationSchema } from './auth.validation';
import AuthController from './auth.controller';

const router = Router();

// register : POST
router.post(
  '/register',
  validateRequest(registrationValidationSchema),
  AuthController.register,
);
const AuthRoutes = router;
export default AuthRoutes;
