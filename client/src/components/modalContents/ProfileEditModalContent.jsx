// dependencies
import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";
import { updateUserMeta } from "../../features/authAPISlice";

const ProfileEditModalContent = ({ name, phone }) => {
  /**
   * Redux useDispatch hook
   */
  const dispatch = useDispatch();

  /**
   * PROFILE INPUT STATE
   * PROFILE UPDATE HANDLER
   */
  const { input, handleInputChange } = useForm({
    name: name,
    phone: phone,
  });

  // handle profileUpdateFormSubmission
  const profileUpdateFormSubmission = async(e) => {
    // remove default event
    e.preventDefault();


    dispatch(updateUserMeta(input));

  };
  return (
    <form onSubmit={profileUpdateFormSubmission}>
      <div className="form-floating theme-form-floating log-in-form mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          name="name"
          value={input.name}
          onChange={handleInputChange}
        />
        <label>Full name</label>
      </div>
      <div className="form-floating theme-form-floating log-in-form mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Phone"
          name="phone"
          value={input.phone}
          onChange={handleInputChange}
        />
        <label>Phone</label>
      </div>
      <button
        className="btn btn-animation w-100 justify-content-center"
        type="submit"
      >
        Update profile
      </button>
    </form>
  );
};

export default ProfileEditModalContent;
