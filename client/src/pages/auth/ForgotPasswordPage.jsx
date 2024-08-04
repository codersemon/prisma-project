import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ModalLayout from "../../components/common/ModalLayout";
import ForgotPasswordModalContent from "../../components/modalContents/ForgotPasswordModalContent";
import { sendForgotPasswordRequest } from "../../features/authAPISlice";
import { authSelect, setStateEmpty } from "../../features/authSlice";
import { Toast } from "../../utils/Toast";

const ForgotPasswordPage = () => {
  /**
   * AUTH CONTEXT USING REDUX
   * FUNCTIONAL NAVIGATOR FORM REACT-ROUTER-DOM
   */
  const { status, message, error, user } = useSelector(authSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * SEND FORGOT PASSWORD REQUEST THROUGH REDUX
   * @param {*} e
   */
  const [email, setEmail] = useState("");
  const handleForgotPasswordRequestFormSubmssion = (e) => {
    // remove default event
    e.preventDefault();

    dispatch(sendForgotPasswordRequest({ email }));
  };

  /**
   *
   */
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  /**
   * SHOW MESSAGE & NAVIGATE BASED ON API RESPONSE RESULT USING REDUX
   */
  useEffect(() => {
    if (message) {
      // show successful toaster message
      Toast.fire({ title: message, icon: "success" });

      // show password update form
      if (status === "success") {
        setShowPasswordModal(true);
      }

      // when password will updated, status will be 'ok'. then popup will be close and redirect to login page
      if (status === "ok") {
        // close modal
        sendForgotPasswordRequest(false);

        // redirect to login page
        navigate("/login");
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

  /**
   * IF USER LOGGED IN, REDIRECT TO MY-ACCOUNT PAGE
   */
  if (user) {
    return <Navigate to="/my-account" />;
  }

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <section className="log-in-section section-b-space forgot-section">
        <div className="container-fluid-lg w-100">
          <div className="row">
            <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div className="image-contain">
                <img
                  src="/assets/images/inner-page/forgot.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="log-in-box">
                  <div className="log-in-title">
                    <h3>Welcome To Greenkart</h3>
                    <h4>Forgot your password</h4>
                  </div>
                  <div className="input-box">
                    <form
                      className="row g-4"
                      onSubmit={handleForgotPasswordRequestFormSubmssion}
                    >
                      <div className="col-12">
                        <div className="form-floating theme-form-floating log-in-form">
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label htmlFor="email">Email Address</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-animation w-100"
                          type="submit"
                        >
                          Forgot Password
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="sign-up-box">
                    <h4>Rembered password?</h4>
                    <Link to="/login">Log In</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* update password form modal  */}
      <ModalLayout
        showModal={showPasswordModal}
        closeModal={() => setShowPasswordModal(false)}
        className="location-modal"
        title="Set new password for your account"
        subtitle="Type new password and provide OTP from your email"
      >
        <ForgotPasswordModalContent />
      </ModalLayout>
    </>
  );
};

export default ForgotPasswordPage;
