import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.route';
import ProductRoutes from '../modules/product/product.route';
import BrandRoutes from '../modules/brand/brand.route';
import CategoryRoutes from '../modules/category/category.route';
import PowerSourceRoutes from '../modules/powerSource/powerSource.route';
import ConnectivityRoutes from '../modules/connectivity/connectivity.route';
import TagRoutes from '../modules/tag/tag.route';
import FeatureNameRoutes from '../modules/featureName/featureName.route';
import OperatingSystemRoutes from '../modules/operatingSystem/operatingSystem.route';
import OrderRoute from '../modules/order/order.route';

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
  {
    path: '/tag',
    route: TagRoutes,
  },
  {
    path: '/feature-name',
    route: FeatureNameRoutes,
  },
  {
    path: '/order',
    route: OrderRoute,
  },
];

routerModules.forEach(routerModule => {
  router.use(routerModule.path, routerModule.route);
});
export default router;
