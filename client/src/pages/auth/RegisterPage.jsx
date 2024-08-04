import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { authSelect, setStateEmpty } from "../../features/authSlice";
import useForm from "../../hooks/useForm";
import { registerUser } from "../../features/authAPISlice";
import { useEffect } from "react";
import { Toast } from "../../utils/Toast";
import { Helmet } from "react-helmet";


const RegisterPage = () => {
  // auth context
  const { status, message, error, user } = useSelector(authSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Destructures the input state and handleInputChange function from the useForm hook.
   *
   * Initializes the form state with email, password, and consent fields.
   *
   * @constant {Object} input - The current state of the form inputs.
   * @constant {Function} handleInputChange - Function to handle changes in the form inputs.
   */
  const { input, handleInputChange } = useForm({
    email: "",
    password: "",
    consent: "",
  });

  /**
   * Handles the submission of the registration form.
   *
   * Prevents the default form submission behavior and dispatches
   * the registerUser action with the current input state.
   *
   * @param {Event} e - The event object from the form submission.
   */
  const handleRegisterFormSubmission = (e) => {
    e.preventDefault();

    dispatch(registerUser(input));
  };

  useEffect(() => {
    if (message) {
      // show successful toaster message
      Toast.fire({ title: message, icon: "success" });

      // clear auth state message
      dispatch(setStateEmpty());

      if (status === "success") {
        // send user to OTP verification page
        navigate("/otp-verification");
      }
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
        <title>Register</title>
      </Helmet>
      <section className="log-in-section section-b-space">
        <div className="container-fluid-lg w-100">
          <div className="row">
            <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div className="image-contain">
                <img
                  src="/assets/images/inner-page/sign-up.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
              <div className="log-in-box">
                <div className="log-in-title">
                  <h3>Welcome To Greenkart</h3>
                  <h4>Create New Account</h4>
                </div>
                <div className="input-box">
                  <form
                    className="row g-4"
                    onSubmit={handleRegisterFormSubmission}
                  >
                    <div className="col-12">
                      <div className="form-floating theme-form-floating">
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
                      <div className="form-floating theme-form-floating">
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
                            name="consent"
                            value={input.consent}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            I agree with
                            <Link to="#"> Terms</Link> and{" "}
                            <Link to="#"> Privacy Policy</Link>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-animation w-100" type="submit">
                        Sign Up
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
                        href="https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin"
                        className="btn google-button w-100"
                      >
                        <img
                          src="../assets/images/inner-page/google.png"
                          className="blur-up lazyload"
                          alt=""
                        />
                        Sign up with Google
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.facebook.com/"
                        className="btn google-button w-100"
                      >
                        <img
                          src="../assets/images/inner-page/facebook.png"
                          className="blur-up lazyload"
                          alt=""
                        />{" "}
                        Sign up with Facebook
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="other-log-in">
                  <h6 />
                </div>
                <div className="sign-up-box">
                  <h4>Already have an account?</h4>
                  <Link to="/login">Log In</Link>
                </div>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-6 col-lg-6" />
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
