import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import FeatureNameController from './featureName.controller';
import { createFeatureNameValidationSchema } from './featureName.validation';
import auth from '../../middlewares/auth';

const router = Router();

// create FeatureName : POST
router.post(
  '/',
  auth('user'),
  validateRequest(createFeatureNameValidationSchema),
  FeatureNameController.createFeatureName,
);

// get all feature name : GET
router.get('/', FeatureNameController.getAllFeatureNames);
const FeatureNameRoutes = router;
export default FeatureNameRoutes;
