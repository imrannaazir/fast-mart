import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import OperatingSystemController from './operatingSystem.controller';
import { createOperatingSystemValidationSchema } from './operatingSystem.validation';

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
