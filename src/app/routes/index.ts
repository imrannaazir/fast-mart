import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.route';
import ProductRoutes from '../modules/product/product.route';
import BrandRoutes from '../modules/brand/brand.route';
import CategoryRoutes from '../modules/category/category.route';
import OperatingSystemRoutes from '../modules/OperatingSystem/OperatingSystem.route';
import PowerSourceRoutes from '../modules/powerSource/powerSource.route';
import ConnectivityRoutes from '../modules/connectivity/connectivity.route';

const router = Router();

type TRouteModule = {
  path: string;
  route: Router;
};
const routerModules: TRouteModule[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/brand',
    route: BrandRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/operating-system',
    route: OperatingSystemRoutes,
  },
  {
    path: '/power-source',
    route: PowerSourceRoutes,
  },
  {
    path: '/connectivity',
    route: ConnectivityRoutes,
  },
];
routerModules.forEach(routerModule => {
  router.use(routerModule.path, routerModule.route);
});
export default router;
