import AddProduct from "@/pages/AddProduct";
import HomePage from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import ProductList from "@/pages/ProductList";
// import UpdateProduct from "@/pages/UpdateProduct";
import AddBrandsPage from "@/pages/AddBrand";
import AddCategoryPage from "@/pages/AddCategory";
import AddCollectionPage from "@/pages/AddCollection";
import AddImagePage from "@/pages/AddImage";
import BrandDetailsPage from "@/pages/brand-details-page";
import BrandListPage from "@/pages/BrandList";
import CategoryDetailsPage from "@/pages/category-details-page";
import CategoryListPage from "@/pages/CategoryList";
import CollectionDetailsPage from "@/pages/collection-details-page";
import CollectionListPage from "@/pages/CollectionList";
import CustomerListPage from "@/pages/CustomerList";
import ImageListPage from "@/pages/ImageList";
import OrderListPage from "@/pages/order-list-page";
import Playground from "@/pages/playground";
import SettingPage from "@/pages/settings-page";
import { TPath } from "@/types";
import { BarChart2, Home, Images, ShoppingBag, User } from "lucide-react";
import { IoMdPricetag } from "react-icons/io";

const paths: TPath[] = [
  {
    path: "/",
    icon: <Home className="mr-2 h-4 w-4" />,
    element: <HomePage />,
  },
  {
    path: "/playground",
    element: <Playground />,
  },
  {
    icon: <Home className="mr-2 h-4 w-4" />,
    path: "home",
    element: <HomePage />,
    label: "Home",
  },
  {
    icon: <ShoppingBag className="mr-2 h-4 w-4" />,
    label: "Orders",
    path: "orders",
    element: <OrderListPage />,
  },
  {
    icon: <User className="mr-2 h-4 w-4" />,
    label: "Customers",
    path: "customers",
    element: <CustomerListPage />,
  },
  {
    icon: <IoMdPricetag className="mr-2 h-4 w-4" />,
    label: "Product",
    path: "products",
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: `list`,
        label: "List",
        element: <ProductList />,
      },
      {
        path: `new`,
        label: "Add",
        element: <AddProduct />,
      },

      {
        path: ":id",
        element: <ProductDetails />,
      },
    ],
  },

  {
    icon: <Images className="mr-2 h-4 w-4" />,
    label: "Contents",
    path: "contents",
    children: [
      {
        index: true,
        element: <ImageListPage />,
      },

      {
        label: "Images",
        path: "images",
        children: [
          {
            index: true,
            element: <ImageListPage />,
          },
          {
            path: "add-image",
            element: <AddImagePage />,
          },
        ],
      },

      {
        label: "Collections",
        path: "collections",
        children: [
          {
            index: true,
            element: <CollectionListPage />,
          },
          {
            path: "add-collection",
            element: <AddCollectionPage />,
          },
          {
            path: ":id",
            element: <CollectionDetailsPage />,
          },
        ],
      },

      {
        label: "Categories",
        path: "categories",
        children: [
          {
            index: true,
            element: <CategoryListPage />,
          },
          {
            path: "add-category",
            element: <AddCategoryPage />,
          },
          {
            path: ":id",
            element: <CategoryDetailsPage />,
          },
        ],
      },
      {
        label: "Brands",
        path: "brands",
        children: [
          {
            index: true,
            element: <BrandListPage />,
          },
          {
            path: "add-brand",
            element: <AddBrandsPage />,
          },
          {
            path: ":id",
            element: <BrandDetailsPage />,
          },
        ],
      },
    ],
  },
  {
    icon: <BarChart2 className="mr-2 h-4 w-4" />,
    label: "Analytics",
    path: "analytics",
    element: <HomePage />,
  },
  {
    path: "settings",
    element: <SettingPage />,
  },
];
export default paths;
