import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { createVariantValidationSchema } from './variant.validations';
import VariantControllers from './variant.controllers';

const router = Router();

// create variant : POST
router.post(
  '/',
  auth('ADMIN', 'SUPER_ADMIN'),
  validateRequest(createVariantValidationSchema),
  VariantControllers.createVariant,
);

// get all variants : GET
router.get('/', VariantControllers.getAllVariant);

const VariantRoutes = router;
export default VariantRoutes;
