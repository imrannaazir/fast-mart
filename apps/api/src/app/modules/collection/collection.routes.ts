import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {
  createCollectionValidationSchema,
  deleteManyValidationSchema,
} from '@repo/utils/zod-schemas';
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

// delete many collection
router.delete(
  '/',
  auth('ADMIN', 'SUPER_ADMIN'),
  validateRequest(deleteManyValidationSchema),
  CollectionControllers.deleteManyCollection,
);

// delete single collection  : DELETE
router.delete(
  '/:id',
  auth('ADMIN', 'SUPER_ADMIN'),
  CollectionControllers.deleteSingleCollection,
);

const CollectionRoutes = router;
export default CollectionRoutes;
