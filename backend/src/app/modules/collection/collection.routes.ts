import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { createCollectionValidationSchema } from './collection.validations';
import CollectionControllers from './collection.controllers';

const router = Router();

// create collection  : POST
router.post(
  '/',
  auth('ADMIN', 'SUPER_ADMIN'),
  validateRequest(createCollectionValidationSchema),
  CollectionControllers.createCollection,
);

// get all collection
router.get('/', CollectionControllers.getAllCollections);

const CollectionRoutes = router;
export default CollectionRoutes;
