// dependencis
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { authSelect, setStateEmpty } from "../../features/authSlice";
import { Toast } from "../../utils/Toast";
import { verifyAccountByURL } from "../../features/authAPISlice";

const OTPVerificationByURL = () => {
  // getting token & otp from parameter
  const { token, otp } = useParams();

  // auth context
  const { status, message, error } = useSelector(authSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // send verification request 
  useEffect(() => {
    dispatch(verifyAccountByURL({token, otp}));
  }, [token, otp, dispatch]);

  // show message & navigate based on api response result 
  useEffect(() => {
    if (message) {
      if (message == "jwt expired") {
        // show successful toaster message
        Toast.fire({ title: "OTP expired, Resend OTP", icon: "error" });

        // send to otp resend page
        navigate("/otp-verification");
      } else {
        // show successful toaster message
        Toast.fire({ title: message, icon: "success" });
      }

      // clear auth state message
      dispatch(setStateEmpty());

      // send user to login page
      if (status === "success") {
        navigate("/login");
      }
    }

    if (error) {
      // show erorr toaster message
      Toast.fire({ title: error, icon: "error" });

      // clear auth state message
      dispatch(setStateEmpty());
    }
  }, [status, message, error, dispatch, navigate]);

  return (
    <section className="section-b-space">
      <div className="container-fluid-lg">
        <div className="d-flex flex-column align-items-center">
          <h2 className="mb-2 text-center">
            Verification in progress, please wait a while
          </h2>
          <div className="loader"></div>
        </div>
      </div>
    </section>
  );
};

export default OTPVerificationByURL;
