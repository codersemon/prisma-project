// dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logOutUser } from "../../features/authAPISlice";
import { authSelect, setStateEmpty } from "../../features/authSlice";
import { Toast } from "../../utils/Toast";

const LogoutComponent = ({ children, ...rest }) => {
  // auth context
  const { status, message, error } = useSelector(authSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle logout link click
  const handleLogoutRequest = (e) => {
    // remove default event
    e.preventDefault();

    // take logout confirmation form user
    Swal.fire({
      title: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0da487",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // send logout request to reducer
        dispatch(logOutUser());
      }
    });
  };

  // show message & navigate based on api response result
  useEffect(() => {
    if (message) {
      // show successful toaster message
      Toast.fire({ title: message, icon: "success" });

      // send user to login page
      if (status === "success") {
        navigate("/");
      }

      // clear auth state message
      dispatch(setStateEmpty());
    }

    if (error) {
      // show erorr toaster message
      Toast.fire({ title: error, icon: "error" });

      // clear auth state message
      dispatch(setStateEmpty());
    }
  }, [status, message, error, dispatch, navigate]);

  return (
    <a href="/log-out" {...rest} onClick={handleLogoutRequest}>
      {children}
    </a>
  );
};

export default LogoutComponent;
