import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createConnectivityValidationSchema } from './connectivity.validation';

import ConnectivityController from './connectivity.controller';

const router = Router();

// create PowerSource : POST
router.post(
  '/',
  validateRequest(createConnectivityValidationSchema),
  ConnectivityController.createConnectivity,
);
const ConnectivityRoutes = router;
export default ConnectivityRoutes;
