import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createUserValidationSchema } from './user.validation';
import UserController from './user.controller';

const router = Router();

// create user : POST
router.get(
  '/:id',
  // validateRequest(createUserValidationSchema),
  UserController.createUser,
);
const UserRoutes = router;
export default UserRoutes;
