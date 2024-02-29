import App from "@/App";
import PublicRoute from "@/components/layout/PublicRoutes";
import AddProduct from "@/pages/AddProduct";
import LoginPage from "@/pages/Login";
import ProductList from "@/pages/ProductList";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        {" "}
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "product-list",
        element: <ProductList />,
      },
    ],
  },
]);

export default router;
