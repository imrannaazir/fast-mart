import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createBrandValidationSchema } from './brand.validation';
import BrandController from './brand.controller';
import auth from '../../middlewares/auth';

const router = Router();

// create brand : POST
router.post(
  '/',
  auth('ADMIN', 'SUPER_ADMIN'),
  validateRequest(createBrandValidationSchema),
  BrandController.createBrand,
);

// get all brand : GET
router.get('/', BrandController.getAllBrands);

const BrandRoutes = router;
export default BrandRoutes;
