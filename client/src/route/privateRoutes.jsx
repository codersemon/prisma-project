// dependencies
import Address from "../components/userAccountPage/Address";
import Dashboard from "../components/userAccountPage/Dashboard";
import Order from "../components/userAccountPage/Order";
import OrderDetails from "../components/userAccountPage/OrderDetails";
import Profile from "../components/userAccountPage/Profile";
import Wishlist from "../components/userAccountPage/Wishlist";
import UserMyAccountPage from "../pages/accountpage/UserMyAccountPage";
import WishlistPage from "../pages/wishlistPage/WishlistPage";
import Layout from "./Layout";
import PrivateRouteGuard from "./PrivateRouteGuard";

const privateRoutes = [
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateRouteGuard />,
        children: [
          {
            path: "/my-account",
            element: <UserMyAccountPage />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: "orders",
                element: <Order />,
              },
              {
                path: "wishlist",
                element: <Wishlist />,
              },
              {
                path: "address",
                element: <Address />,
              },
              {
                path: "profile",
                element: <Profile />,
              },
              {
                path: "order/:id",
                element: <OrderDetails />,
              },
            ],
          },
          {
            path: "/wishlist",
            element: <WishlistPage />,
          },
        ],
      },
    ],
  },
];

// export public routes
export default privateRoutes;
