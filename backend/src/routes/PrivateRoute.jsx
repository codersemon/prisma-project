// dependencies
import Layout from "../components/Layout/Layout";
import AddNewCategory from "../pages/categories/AddNewCategory";
import CategoryList from "../pages/categories/CategoryList";
import EditCategory from "../pages/categories/EditCategory";
import Homepage from "../pages/homepage/Homepage";
import MediaPage from "../pages/media/MediaPage";
import CreateOrder from "../pages/orders/CreateOrder";
import EditOrder from "../pages/orders/EditOrder";
import OrdersList from "../pages/orders/OrdersList";
import ProductReviewsList from "../pages/productReviews/ProductReviewsList";
import AddNewProduct from "../pages/products/AddNewProduct";
import EditProductPage from "../pages/products/EditProductPage";
import ProductList from "../pages/products/ProductList";
import AddNewUser from "../pages/users/AddNewUser";
import EditUserAccount from "../pages/users/EditUserAccount";
import UsersList from "../pages/users/UsersList";
import PrivateRouteGuard from "./PrivateRouteGuard";

export const privateRoute = [
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateRouteGuard />,
        children: [
          {
            path: "/",
            element: <Homepage />,
          },
          {
            path: "/add-new-product",
            element: <AddNewProduct />,
          },
          {
            path: "/products",
            element: <ProductList />,
          },
          {
            path: "/add-new-category",
            element: <AddNewCategory />,
          },
          {
            path: "/edit-product/:slug",
            element: <EditProductPage />,
          },
          {
            path: "/categories",
            element: <CategoryList />,
          },
          {
            path: "/category-edit/:slug",
            element: <EditCategory />,
          },
          {
            path: "/users",
            element: <UsersList />,
          },
          {
            path: "/add-new-user",
            element: <AddNewUser />,
          },
          {
            path: "/user-edit/:id",
            element: <EditUserAccount />
          },
          {
            path: "/media",
            element: <MediaPage />,
          },
          {
            path: "/orders",
            element: <OrdersList />,
          },
          {
            path: "/create-order",
            element: <CreateOrder />,
          },
          {
            path: "/edit-order/:id",
            element: <EditOrder />,
          },
          {
            path: "/product-reviews",
            element: <ProductReviewsList />
          }
        ],
      },
    ],
  },
];
