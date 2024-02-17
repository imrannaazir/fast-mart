import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createOperatingSystemValidationSchema } from './operatingSystem.validation';
import OperatingSystemController from './operatingSystem.controller';

const router = Router();

// create Operating System : POST
router.post(
  '/',
  validateRequest(createOperatingSystemValidationSchema),
  OperatingSystemController.createOperatingSystem,
);
const OperatingSystemRoutes = router;
export default OperatingSystemRoutes;
