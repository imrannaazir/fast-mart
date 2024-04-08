import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {
  createManyImageValidationSchema,
  createSingleImageValidationSchema,
} from './image.validations';
import ImageControllers from './image.controllers';

const router = Router();

// create single image : POST
router.post(
  '/single',
  auth(),
  validateRequest(createSingleImageValidationSchema),
  ImageControllers.createSingleImage,
);

// create many images : POST
router.post(
  '/many',
  auth(),
  validateRequest(createManyImageValidationSchema),
  ImageControllers.createManyImage,
);

// get all images : GET
router.get('/', ImageControllers.getAllImages);

const ImageRoutes = router;
export default ImageRoutes;
