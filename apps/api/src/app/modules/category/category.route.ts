import {
  createCategoryValidationSchema,
  deleteManyValidationSchema,
} from '@repo/utils/zod-schemas';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import CategoryController from './category.controller';

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
router.get('/:id', CategoryController.getSingleCategory);

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
