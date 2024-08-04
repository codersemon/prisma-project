// dependencies
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../../features/authAPISlice";
import { authSelect, setStateEmpty } from "../../features/authSlice";
import useForm from "../../hooks/useForm";
import { Toast } from "../../utils/Toast";

const LoginPage = () => {
  /**
   * AUTH CONTEXT USING REDUX
   * FUNCTIONAL NAVIGATOR FORM REACT-ROUTER-DOM
   */
  const { status, message, error, user } = useSelector(authSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * LOGIN FORM STATE
   */
  const { input, handleInputChange } = useForm({
    email: "",
    password: "",
    remember_login: "",
  });

  /**
   * HANDLE LOGIN FORM SUBMISSION
   * @param {*} e
   */
  const handleLoginFormSubmission = (e) => {
    // remove default event
    e.preventDefault();

    // send data to reducer
    dispatch(loginUser(input));
  };

  /**
   * SHOW MESSAGE & NAVIGATE BASED ON API RESPONSE RESULT USING REDUX
   */
  useEffect(() => {
    if (message) {
      // show successful toaster message
      Toast.fire({ title: message, icon: "success" });

      // send user to login page
      if (status === "success") {
        navigate("/my-account");
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

  /**
   * IF USER NOT-LOGGED IN, SHOW LOGIN FORM
   */
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className="log-in-section background-image-2 section-b-space">
        <div className="container-fluid-lg w-100">
          <div className="row">
            <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div className="image-contain">
                <img
                  src="../assets/images/inner-page/log-in.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
              <div className="log-in-box">
                <div className="log-in-title">
                  <h3>Welcome To Greenkart</h3>
                  <h4>Log In Your Account</h4>
                </div>
                <div className="input-box">
                  <form
                    className="row g-4"
                    onSubmit={handleLoginFormSubmission}
                  >
                    <div className="col-12">
                      <div className="form-floating theme-form-floating log-in-form">
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Email Address"
                          name="email"
                          value={input.email}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="email">Email Address</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating theme-form-floating log-in-form">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                          name="password"
                          value={input.password}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="forgot-box">
                        <div className="form-check ps-0 m-0 remember-box">
                          <input
                            className="checkbox_animated check-box"
                            type="checkbox"
                            id="flexCheckDefault"
                            name="remember_login"
                            value={input.remember_login}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Remember me
                          </label>
                        </div>
                        <Link to="/forgot-password" className="forgot-password">
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-animation w-100 justify-content-center"
                        type="submit"
                      >
                        Log In
                      </button>
                    </div>
                  </form>
                </div>
                <div className="other-log-in">
                  <h6>or</h6>
                </div>
                <div className="log-in-button">
                  <ul>
                    <li>
                      <a
                        href="https://www.google.com/"
                        className="btn google-button w-100"
                      >
                        <img
                          src="../assets/images/inner-page/google.png"
                          className="blur-up lazyload"
                          alt=""
                        />{" "}
                        Log In with Google
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.facebook.com/"
                        className="btn google-button w-100"
                      >
                        <img
                          src="/assets/images/inner-page/facebook.png"
                          className="blur-up lazyload"
                          alt=""
                        />{" "}
                        Log In with Facebook
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="other-log-in">
                  <h6 />
                </div>
                <div className="sign-up-box">
                  <h4>Don&apos;t have an account?</h4>
                  <Link to="/register">Create account</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
