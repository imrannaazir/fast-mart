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
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

export default router;
