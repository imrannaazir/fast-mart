import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import TagController from './tag.controller';
import { createTagValidationSchema } from './tag.validation';

const router = Router();

// create Tag : POST
router.post(
  '/',
  validateRequest(createTagValidationSchema),
  TagController.createTag,
);
const TagRoutes = router;
export default TagRoutes;
