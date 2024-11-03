import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { addressValidationSchema } from '@repo/utils/zod-schemas';
import AddressControllers from './address.controllers';

const router = Router();

// add address
router.post(
  '/',
  auth(),
  validateRequest(addressValidationSchema),
  AddressControllers.addAddress,
);

// get addresses
router.get('/', auth(), AddressControllers.getMyAddresses);
const AddressRoutes = router;
export default AddressRoutes;
