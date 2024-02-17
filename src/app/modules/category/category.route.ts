import { Router } from 'express';
import CategoryController from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createCategoryValidationSchema } from './category.validation';

const router = Router();

// create category
router.post(
  '/',
  validateRequest(createCategoryValidationSchema),
  CategoryController.createCategory,
);
const CategoryRoutes = router;
export default CategoryRoutes;
