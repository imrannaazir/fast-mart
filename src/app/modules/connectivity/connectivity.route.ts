import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createConnectivityValidationSchema } from './connectivity.validation';

import ConnectivityController from './connectivity.controller';
import auth from '../../middlewares/auth';

const router = Router();

// create connectivity : POST
router.post(
  '/',
  auth('user'),
  validateRequest(createConnectivityValidationSchema),
  ConnectivityController.createConnectivity,
);

// get all connectivity : GET
router.get('/', ConnectivityController.getAllConnectivity);
const ConnectivityRoutes = router;
export default ConnectivityRoutes;
