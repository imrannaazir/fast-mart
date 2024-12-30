import { Router } from 'express';
import auth from '../../middlewares/auth';
import DashboardControllers from './dashboard-controllers';

const router = Router();

router.get(
  '/insights',
  auth('ADMIN', 'SUPER_ADMIN'),
  DashboardControllers.getDashboardInsights,
);

const DashboardRoutes = router;
export default DashboardRoutes;
