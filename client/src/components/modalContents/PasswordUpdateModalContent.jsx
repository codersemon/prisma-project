// dependencies
import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";
import { updateUserPassword } from "../../features/authAPISlice";

const PasswordUpdateModalContent = () => {
  /**
   * Redux useDispatch hook
   */
  const dispatch = useDispatch();

  /**
   * PASSWORD INPUT STATE
   * PASSWORD UPDATE HANDLER
   */
  const { input, handleInputChange } = useForm({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // handle passwordUpdateFormSubmission
  const passwordUpdateFormSubmission = (e) => {
    // remove default event
    e.preventDefault();

    // send form data to reducer
    dispatch(updateUserPassword(input));
  };
  return (
    <form onSubmit={passwordUpdateFormSubmission}>
      <div className="form-floating theme-form-floating log-in-form mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Name"
          name="oldPassword"
          value={input.oldPassword}
          onChange={handleInputChange}
        />
        <label>Old Password</label>
      </div>
      <div className="form-floating theme-form-floating log-in-form mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Phone"
          name="newPassword"
          value={input.newPassword}
          onChange={handleInputChange}
        />
        <label>New password</label>
      </div>
      <div className="form-floating theme-form-floating log-in-form mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Phone"
          name="confirmPassword"
          value={input.confirmPassword}
          onChange={handleInputChange}
        />
        <label>Confirm password</label>
      </div>

      <button
        className="btn btn-animation w-100 justify-content-center"
        type="submit"
      >
        Update Password
      </button>
    </form>
  );
};

export default PasswordUpdateModalContent;
