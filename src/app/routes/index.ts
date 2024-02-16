import { Router } from 'express';
import UserRoutes from '../modules/user/user.route';

const router = Router();

type TRouteModule = {
  path: string;
  route: Router;
};
const routerModules: TRouteModule[] = [
  {
    path: '/user',
    route: UserRoutes,
  },
];
routerModules.forEach(routerModule => {
  router.use(routerModule.path, routerModule.route);
});
export default router;
