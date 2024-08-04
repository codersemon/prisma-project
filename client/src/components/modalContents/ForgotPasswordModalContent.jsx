import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";
import { sendForgotPasswordRequestAccept } from "../../features/authAPISlice";

const ForgotPasswordModalContent = ({ numberOfDigits = 5 }) => {
  /**
   * OTP INPUTs CONTROLLER STATE & FUNCTIONS
   */
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

  /**
   *
   */
  const dispatch = useDispatch();

  const { input, handleInputChange: handleFormInputChange } = useForm({
    password: "",
    confirmPassword: "",
  });

  // handle forgot password request accept
  const handleForgotPasswordRequestAccept = (e) => {
    // remove default event
    e.preventDefault();

    dispatch(sendForgotPasswordRequestAccept({...input, otp: otp.join('')}));
  };

  return (
    <>
      <form onSubmit={handleForgotPasswordRequestAccept}>
        <div className="log-in-box">
          <div className="form-floating theme-form-floating log-in-form mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={handleFormInputChange}
              value={input.password}
            />
            <label htmlFor="password">New password</label>
          </div>

          <div className="form-floating theme-form-floating log-in-form mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="confirmPassword"
              onChange={handleFormInputChange}
              value={input.confirmPassword}
            />
            <label htmlFor="password">Confirm password</label>
          </div>
          <div className="log-in-title">
            <h5 className="text-content mb-2">
              A code has been sent to your email, type below
            </h5>
          </div>
          <div className="inputs d-flex flex-row justify-content-center">
            {otp.map((data, index) => (
              <input
                className="text-center form-control rounded otp-input"
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

          <button className="btn btn-animation w-100 mt-3" type="submit">
            Update Password
          </button>
        </div>
      </form>
    </>
  );
};

export default ForgotPasswordModalContent;
