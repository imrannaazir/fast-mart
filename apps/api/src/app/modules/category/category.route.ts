import { Router } from 'express';
import CategoryController from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  createCategoryValidationSchema,
  deleteManyValidationSchema,
} from '@repo/utils/zod-schemas';
import auth from '../../middlewares/auth';

const router = Router();

// create category
router.post(
  '/',
  auth('SUPER_ADMIN', 'ADMIN'),
  validateRequest(createCategoryValidationSchema),
  CategoryController.createCategory,
);

// get all categories
router.get('/', CategoryController.getAllCategory);

// delete single category : DELETE
router.delete('/:id', auth(), CategoryController.deleteSingleCategory);

// delete many categories : DELETE
router.delete(
  '/',
  auth(),
  validateRequest(deleteManyValidationSchema),
  CategoryController.deleteManyCategories,
);

const CategoryRoutes = router;
export default CategoryRoutes;
