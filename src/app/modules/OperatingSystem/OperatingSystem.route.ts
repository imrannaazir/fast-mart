import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createOperatingSystemValidationSchema } from './OperatingSystem.validation';
import OperatingSystemController from './OperatingSystem.controller';

const router = Router();

// create Operating System : POST
router.post(
  '/',
  validateRequest(createOperatingSystemValidationSchema),
  OperatingSystemController.createOperatingSystem,
);
const OperatingSystemRoutes = router;
export default OperatingSystemRoutes;
