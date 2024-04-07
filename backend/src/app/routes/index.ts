import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.route';
import ProductRoutes from '../modules/product/product.route';
import BrandRoutes from '../modules/brand/brand.route';
import CategoryRoutes from '../modules/category/category.route';
import TagRoutes from '../modules/tag/tag.route';
import OrderRoute from '../modules/order/order.route';
import IconRoutes from '../modules/icon/icon.routes';

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
    path: '/tag',
    route: TagRoutes,
  },
  {
    path: '/order',
    route: OrderRoute,
  },
  {
    path: '/icons',
    route: IconRoutes,
  },
];

routerModules.forEach(routerModule => {
  router.use(routerModule.path, routerModule.route);
});
export default router;
