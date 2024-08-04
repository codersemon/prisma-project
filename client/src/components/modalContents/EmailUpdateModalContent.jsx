// dependencies
import FeatherIcon from "feather-icons-react";
import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";

const EmailUpdateModalContent = () => {
  /**
   * Redux useDispatch hook
   */
  const dispatch = useDispatch();

  /**
   * PASSWORD INPUT STATE
   * PASSWORD UPDATE HANDLER
   */
  const { input, handleInputChange } = useForm({
    email: "",
  });

  // handle passwordUpdateFormSubmission
  const passwordUpdateFormSubmission = (e) => {
    // remove default event
    e.preventDefault();

    // send form data to reducer
    dispatch();
  };
  return (
    <form onSubmit={passwordUpdateFormSubmission}>
      <div className="form-floating theme-form-floating log-in-form mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Name"
          name="email"
          value={input.email}
          onChange={handleInputChange}
        />
        <label>Type new email address</label>
      </div>

      <button
        className="btn btn-animation w-100 justify-content-center"
        type="submit"
      >
        Next step
        <FeatherIcon icon="arrow-right" />
      </button>
    </form>
  );
};

export default EmailUpdateModalContent;
