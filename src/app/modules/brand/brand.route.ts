import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createBrandValidationSchema } from './brand.validation';
import BrandController from './brand.controller';

const router = Router();

// create brand : POST
router.post(
  '/',
  validateRequest(createBrandValidationSchema),
  BrandController.createBrand,
);
const BrandRoutes = router;
export default BrandRoutes;
