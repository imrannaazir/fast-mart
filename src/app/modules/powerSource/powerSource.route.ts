import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createPowerSourceValidationSchema } from './powerSource.validation';
import PowerSourceController from './powerSource.controller';

const router = Router();

// create PowerSource : POST
router.post(
  '/',
  validateRequest(createPowerSourceValidationSchema),
  PowerSourceController.createPowerSource,
);

// get all power source : GET
router.get('/', PowerSourceController.getAllPowerSource);
const PowerSourceRoutes = router;
export default PowerSourceRoutes;
