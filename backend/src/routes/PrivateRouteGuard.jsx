// dependencies
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { authSelect } from "../feature/authSlice";

const PrivateRouteGuard = () => {
  // auth context 
  const {c_user} = useSelector(authSelect);

  return c_user && c_user?.meta?.role === 'administrator' ? <Outlet /> : <Navigate to="/admin-login" />;
};

export default PrivateRouteGuard;
