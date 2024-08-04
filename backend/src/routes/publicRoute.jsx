// dependencies
import { lazy } from "react";
const Login = lazy(() => import("../pages/auth/Login"));

export const publicRoute = [
  {
    path: "/admin-login",
    element: <Login />,
  },
];
