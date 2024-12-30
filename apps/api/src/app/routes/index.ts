import { Router } from 'express';
import AddressRoutes from '../modules/address/address.routes';
import AuthRoutes from '../modules/auth/auth.route';
import BrandRoutes from '../modules/brand/brand.route';
import CartItemRoute from '../modules/cart-item/cart-item.routes';
import CategoryRoutes from '../modules/category/category.route';
import CollectionRoutes from '../modules/collection/collection.routes';
import DashboardRoutes from '../modules/dashboard/dashboard.routes';
import ImageRoutes from '../modules/image/image.routes';
import OrderRoute from '../modules/order/order.route';
import ProductRoutes from '../modules/product/product.route';
import TagRoutes from '../modules/tag/tag.route';
import UserRoutes from '../modules/user/user.routes';
import VariantRoutes, { OptionRoutes } from '../modules/variant/variant.routes';
import WishListRoutes from '../modules/wishlist-item/wishlist-item.routes';

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
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/brands',
    route: BrandRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/collections',
    route: CollectionRoutes,
  },

  {
    path: '/tags',
    route: TagRoutes,
  },
  {
    path: '/orders',
    route: OrderRoute,
  },
  {
    path: '/images',
    route: ImageRoutes,
  },
  {
    path: '/variants',
    route: VariantRoutes,
  },
  {
    path: '/options',
    route: OptionRoutes,
  },
  {
    path: '/wishlist-items',
    route: WishListRoutes,
  },
  {
    path: '/cart-items',
    route: CartItemRoute,
  },
  {
    path: '/addresses',
    route: AddressRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/dashboard',
    route: DashboardRoutes,
  },
];

routerModules.forEach((routerModule) => {
  router.use(routerModule.path, routerModule.route);
});
export default router;
