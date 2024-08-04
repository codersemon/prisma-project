// dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../feature/authAPISlice";
import { authSelect, setAuthStateMessageEmpty } from "../../feature/authSlice";
import useForm from "../../hooks/useForm";

const Login = () => {
  /**
   * Auth Context & Dispatcher
   *
   * Navigator For Redirection Handle
   */
  const { status } = useSelector(authSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Login Form State
   */
  const { input, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  /**
   * Handle Login Form Submission
   */
  const handleLoginFormSubmission = (e) => {
    // remove default event
    e.preventDefault();

    // dispatch login action
    dispatch(loginUser(input));
  };

  /**
   * Effect Handler For Showing Message & Redirection
   */
  useEffect(() => {
    if (status === "success") {
      navigate("/");

      dispatch(setAuthStateMessageEmpty());
    }
  }, [dispatch, navigate, status]);

  return (
    <section className="log-in-section section-b-space">
      <Link href="/login" className="logo-login">
        <img src="assets/images/logo/1.png" className="img-fluid" />
      </Link>
      <div className="container w-100">
        <div className="row">
          <div className="col-xl-5 col-lg-6 me-auto">
            <div className="log-in-box">
              <div className="log-in-title">
                <h3>Welcome To Greenkart</h3>
                <h4>Log In With Your Admin Account</h4>
              </div>
              <div className="input-box">
                <form className="row g-4" onSubmit={handleLoginFormSubmission}>
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
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Remember me
                        </label>
                      </div>
                      <a href="forgot.html" className="forgot-password">
                        Forgot Password?
                      </a>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
