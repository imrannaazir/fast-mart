import { profileUpdateValidationSchema } from '@repo/utils/zod-schemas';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import UserControllers from './user.controllers';
const router = Router();

router.patch(
  '/update-me',
  auth(),
  validateRequest(profileUpdateValidationSchema),
  UserControllers.updateUserDetails,
);

router.get('/me', auth(), UserControllers.getMyData);
router.get('/all', auth('ADMIN', 'SUPER_ADMIN'), UserControllers.getAllUser);
const UserRoutes = router;
export default UserRoutes;
