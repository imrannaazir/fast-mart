import App from "@/App";
import PublicRoute from "@/components/layout/PublicRoutes";
import LoginPage from "@/pages/login-page";
import { ThemePage } from "@/pages/theme-page";
import routeGenerator from "@/utils/routeGenerator";
import { createBrowserRouter } from "react-router-dom";
import paths from "./admin.routes";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/theme",
    element: <ThemePage />,
  },
  {
    path: "/",
    element: <App />,
    children: routeGenerator(paths),
  },
]);

export default router;
