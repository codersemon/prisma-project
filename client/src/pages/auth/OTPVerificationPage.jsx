// dependencies
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resendOTP, verifyAccountByOTP } from "../../features/authAPISlice";
import { authSelect, setStateEmpty } from "../../features/authSlice";
import { Toast } from "../../utils/Toast";

const OTPVerificationPage = ({ numberOfDigits = 5 }) => {
  // OTP form state
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));

  // OTP box ref
  const otpBoxReference = useRef([]);

  // handle otp input change
  function handleInputChange(value, index) {
    let newArr = [...otp];

    if (value.length > 1) {
      // Handle paste event
      value.split("").forEach((char, i) => {
        if (index + i < numberOfDigits) {
          newArr[index + i] = char;
        }
      });
      setOtp(newArr);
      if (index + value.length < numberOfDigits) {
        otpBoxReference.current[index + value.length].focus();
      }
    } else {
      // Handle single character input
      newArr[index] = value;
      setOtp(newArr);
      if (value && index < numberOfDigits - 1) {
        otpBoxReference.current[index + 1].focus();
      }
    }
  }

  // handle otp input key press
  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  // auth context
  const { status, message, error, user } = useSelector(authSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * HANDLE OTP VERIFICATION REQUEST SENDING
   * @param {*} e 
   */
  const handleOTPVerification = (e) => {
    // disable default event
    e.preventDefault();

    // send data to reducer
    dispatch(verifyAccountByOTP({ otp: otp.join("") }));
  };

  /**
   * HANDLE OTP RESEND REQUEST
   * @param {*} e 
   */
  const handleOTPResendRequest = (e) => {
    // disable default event
    e.preventDefault();

    // send data to reducer
    dispatch(resendOTP());

    // clear otp input field
    setOtp(new Array(numberOfDigits).fill(""));
  };

  useEffect(() => {
    if (message) {
      if (message == "jwt expired") {
        // show successful toaster message
        Toast.fire({ title: 'OTP expired, Resend OTP', icon: "error" });
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
    <section className="log-in-section otp-section section-b-space">
      <div className="container-fluid-lg">
        <div className="row">
          <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
            <div className="image-contain">
              <img
                src="../assets/images/inner-page/otp.png"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
          <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
            <div className="d-flex align-items-center justify-content-center h-100">
              <div className="log-in-box">
                <div className="log-in-title">
                  <h3 className="text-title">
                    Please enter the one time password to verify your account
                  </h3>
                  <h5 className="text-content">
                    A code has been sent to <span>{user?.email}</span>
                  </h5>
                </div>
                <div
                  id="otp"
                  className="inputs d-flex flex-row justify-content-center"
                >
                  {otp.map((data, index) => (
                    <input
                      className="text-center form-control rounded"
                      key={index}
                      type="text"
                      maxLength="1"
                      value={data}
                      ref={(el) => (otpBoxReference.current[index] = el)}
                      onChange={(e) => handleInputChange(e.target.value, index)}
                      onKeyDown={(e) => handleBackspaceAndEnter(e, index)}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pasteData = e.clipboardData.getData("text");
                        handleInputChange(pasteData, index);
                      }}
                    />
                  ))}
                </div>
                <div className="send-box pt-4">
                  <h5>
                    Didn&apos;t get the code or expired ? {" "}
                    <a href="" className="theme-color fw-bold" onClick={handleOTPResendRequest}>
                     Resend It
                    </a>
                  </h5>
                </div>
                <button
                  className="btn btn-animation w-100 mt-3"
                  onClick={handleOTPVerification}
                >
                  Validate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OTPVerificationPage;
