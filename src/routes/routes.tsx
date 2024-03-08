import App from "@/App";
import PublicRoute from "@/components/layout/PublicRoutes";
import AddProduct from "@/pages/AddProduct";
import LoginPage from "@/pages/Login";
import OrderList from "@/pages/OrderList";
import ProductDetails from "@/pages/ProductDetails";
import ProductList from "@/pages/ProductList";
import UpdateProduct from "@/pages/UpdateProduct";
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
      {
        path: "/update-product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/order-list",
        element: <OrderList />,
      },
    ],
  },
]);

export default router;
