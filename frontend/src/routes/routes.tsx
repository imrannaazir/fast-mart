import App from "@/App";
import PublicRoute from "@/components/layout/PublicRoutes";
import AddProduct from "@/pages/AddProduct";
import CartPage from "@/pages/CartPage";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import OrderList from "@/pages/OrderList";
import ProductTable from "@/pages/Playground";
import ProductDetails from "@/pages/ProductDetails";
import ProductList from "@/pages/ProductList";
import UpdateProduct from "@/pages/UpdateProduct";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/playground",
    element: <ProductTable />,
  },
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
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        children: [
          {
            path: "new",
            element: <AddProduct />,
          },
          {
            path: "list",
            element: <ProductList />,
          },
          {
            path: "update/:id",
            element: <UpdateProduct />,
          },
          {
            path: "details/:id",
            element: <ProductDetails />,
          },
        ],
      },

      {
        path: "orders",
        children: [
          {
            path: "list",
            element: <OrderList />,
          },
        ],
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

export default router;
