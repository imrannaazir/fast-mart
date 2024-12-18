import { profileUpdateValidationSchema } from '@repo/utils/zod-schemas';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
const router = Router();

router.patch(
  '/update-me',
  auth(),
  validateRequest(profileUpdateValidationSchema),
);

const UserRoutes = router;
export default UserRoutes;
