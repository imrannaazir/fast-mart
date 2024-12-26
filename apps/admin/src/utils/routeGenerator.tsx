import { TPath } from "@/types";
import { RouteObject } from "react-router-dom";

const routeGenerator = (items: TPath[]) => {
  const generateRoute = (item: TPath): RouteObject => {
    const route: RouteObject = {
      path: item.path,
      element: item.element,
    };

    if (item.children?.length) {
      route.children = item.children.map((child) => {
        if (child.index) {
          return {
            index: true,
            element: child.element,
          };
        } else {
          return generateRoute(child);
        }
      });
    }

    return route;
  };
  const routes = items.map(generateRoute);

  return routes;
};
export default routeGenerator;
