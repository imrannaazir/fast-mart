import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createOperatingSystemValidationSchema } from './operatingSystem.validation';
import OperatingSystemController from './operatingSystem.controller';
import auth from '../../middlewares/auth';

const router = Router();

// create Operating System : POST
router.post(
  '/',
  auth('user'),
  validateRequest(createOperatingSystemValidationSchema),
  OperatingSystemController.createOperatingSystem,
);

// create Operating system : GET
router.get('/', OperatingSystemController.getAllOperatingSystem);
const OperatingSystemRoutes = router;
export default OperatingSystemRoutes;
