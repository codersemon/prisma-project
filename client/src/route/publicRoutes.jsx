// dependencies
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import LoginPage from "../pages/auth/LoginPage";
import OTPVerificationByURL from "../pages/auth/OTPVerificationByURL";
import OTPVerificationPage from "../pages/auth/OTPVerificationPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Homepage from "../pages/homepage/Homepage";
import ShopPage from "../pages/shop/ShopPage";
import ProductSinglePage from "../pages/productSinglePage/ProductSinglePage";
import Layout from "./Layout";
import CheckoutSuccessPage from "../pages/checkoutSuccessPage/CheckoutSuccessPage";

const publicRoutes = [
  {
    element: <Layout />,
    errorElement: <h1>Error Page</h1>,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/otp-verification",
        element: <OTPVerificationPage />,
      },
      {
        path: "/url-verification/:token/:otp",
        element: <OTPVerificationByURL />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/product/:slug",
        element: <ProductSinglePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/order-success",
        element: <CheckoutSuccessPage />
      }
    ],
  },
];

// export public routes
export default publicRoutes;
