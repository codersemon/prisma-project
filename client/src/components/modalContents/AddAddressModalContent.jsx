// dependencies

import { useDispatch } from "react-redux";
import { addNewAddress } from "../../features/authAPISlice";
import useForm from "../../hooks/useForm";

const AddAddressModalContent = () => {
  /**
   * react-redux useDispatch hook init
   */
  const dispatch = useDispatch();

  /**
   * Form state
   */
  const { input, handleInputChange } = useForm({
    full_name: "",
    email: "",
    phone: "",
    street_address: "",
    street_address_2: "",
    district: "",
    country: "",
    zip_code: "",
  });

  /**
   * Handle form submission
   */
  const handleAddAddressFormSubmission = (e) => {
    e.preventDefault();

    dispatch(addNewAddress(input));
  };
  return (
    <form onSubmit={handleAddAddressFormSubmission}>
      <div className="form-floating mb-3 theme-form-floating">
        <input
          type="text"
          className="form-control"
          placeholder=""
          name="full_name"
          value={input.full_name}
          onChange={handleInputChange}
        />
        <label>Full Name</label>
      </div>
      <div className="form-floating mb-3 theme-form-floating">
        <input
          type="text"
          className="form-control"
          placeholder=""
          name="email"
          value={input.email}
          onChange={handleInputChange}
        />
        <label>Email</label>
      </div>
      <div className="form-floating mb-3 theme-form-floating">
        <input
          type="text"
          className="form-control"
          placeholder=""
          name="phone"
          value={input.phone}
          onChange={handleInputChange}
        />
        <label>Phone</label>
      </div>
      <div className="form-floating mb-3 theme-form-floating">
        <input
          type="text"
          className="form-control"
          placeholder=""
          name="street_address"
          value={input.street_address}
          onChange={handleInputChange}
        />
        <label>Address Line 1</label>
      </div>
      <div className="form-floating mb-3 theme-form-floating">
        <input
          type="text"
          className="form-control"
          placeholder=""
          name="street_address_2"
          value={input.street_address_2}
          onChange={handleInputChange}
        />
        <label>Address Line 2</label>
      </div>
      <div className="form-floating mb-3 theme-form-floating">
        <select
          className="form-select"
          name="district"
          value={input.district}
          onChange={handleInputChange}
        >
          <option value="">Please Select</option>
          <option value="Jhenaidah">Jhenaidah</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Khulna">Khulna</option>
        </select>
        <label>District</label>
      </div>
      <div className="form-floating mb-3 theme-form-floating">
        <select
          className="form-select"
          name="country"
          value={input.country}
          onChange={handleInputChange}
        >
          <option value="">Please Select</option>
          <option value="Bangladesh">Bangladesh</option>
        </select>
        <label>Country</label>
      </div>
      <div className="form-floating mb-3 theme-form-floating">
        <input
          type="text"
          className="form-control"
          placeholder=""
          name="zip_code"
          value={input.zip_code}
          onChange={handleInputChange}
        />
        <label>Zip Code</label>
      </div>

      <div>
        <button
          type="submit"
          className="btn theme-bg-color btn-md text-white ms-auto"
          data-bs-dismiss="modal"
        >
          Save changes
        </button>
      </div>
    </form>
  );
};

export default AddAddressModalContent;
