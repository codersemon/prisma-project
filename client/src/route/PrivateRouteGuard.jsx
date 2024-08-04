// dependencies
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { authSelect } from "../features/authSlice";

const PrivateRouteGuard = () => {
  /**
   * USER DATA FROM AUTH CONTEXT
   */
  const { user } = useSelector(authSelect);

  /**
   * IF HAVE USER, THEN SHOW OUTLET, OTHERWISE REDIRECT TO '/login' ROUTE
   */
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteGuard;
