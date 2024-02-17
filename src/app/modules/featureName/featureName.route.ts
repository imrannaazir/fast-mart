import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import FeatureNameController from './featureName.controller';
import { createFeatureNameValidationSchema } from './featureName.validation';

const router = Router();

// create FeatureName : POST
router.post(
  '/',
  validateRequest(createFeatureNameValidationSchema),
  FeatureNameController.createFeatureName,
);
const FeatureNameRoutes = router;
export default FeatureNameRoutes;
