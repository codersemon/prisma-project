// dependencies
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUploadedFileStateEmpty } from "../../feature/mediaSlice";
import { createUserAccount } from "../../feature/userAPISlice";
import {
  setUsersStateMessageEmpty,
  usersSelect,
} from "../../feature/userSlice";
import useForm from "../../hooks/useForm";
import useMediaUploader from "../../hooks/useMediaUploader";
import { Toast } from "../../utils/sweetAlert";

const AddNewUser = () => {
  /**
   * react-redux dispatch hook init
   */
  const dispatch = useDispatch();

  /**
   * users context
   */
  const { status, error } = useSelector(usersSelect);

  /**
   * react-router-dom usenavaigate hook init
   */
  const navigate = useNavigate();

  /**
   * Media uploader hook init
   */
  const { MediaUploader, uploadedFiles, uploaderIsLoading } =
    useMediaUploader();

  /**
   * user form state
   */
  const { input, handleInputChange } = useForm({
    email: "",
    password: "",
    name: "",
    phone: "",
    role: "",
    isVerified: true,
  });

  /**
   * hanlde user account creation form submission
   */
  const handleAccountCreationFormSubmission = (e) => {
    // remvoe default event
    e.preventDefault();

    // send user data to action
    dispatch(createUserAccount(input));
  };

  // send to users list page after account creation
  useEffect(() => {
    if (status == "success") {
      // send user to users list page
      navigate("/users");

      // set user_photo uploader state empty
      dispatch(setUploadedFileStateEmpty("user_photo"));
    }

    // show create account error message
    if (error) {
      Toast.fire({ title: error, icon: "error" });

      // set product message, error, status empty
      dispatch(setUsersStateMessageEmpty());
    }
  }, [status, navigate, dispatch, error]);

  return (
    <>
      <Helmet>
        <title>Add New User</title>
      </Helmet>

      <div className="page-body">
        {/* New Product Add Start */}
        <form
          className="theme-form theme-form-2 mega-form"
          onSubmit={handleAccountCreationFormSubmission}
          encType="multipart/form-data"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-8 m-auto">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-header-2">
                          <h5>Login Information</h5>
                          <p className="text-danger">
                            <span className="text-warning">⚠</span> Email,
                            password & role are required only.
                          </p>
                        </div>

                        <div className="mb-4 row align-items-center">
                          <label className="form-label-title col-sm-3 mb-0">
                            Email
                          </label>
                          <div className="col-sm-9">
                            <input
                              className={`form-control ${
                                input.email === "" ? "border-danger" : ""
                              }`}
                              type="text"
                              placeholder="Type user email"
                              name="email"
                              value={input.email}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="mb-4 row align-items-center">
                          <label className="col-sm-3 col-form-label form-label-title">
                            Password
                          </label>
                          <div className="col-sm-9">
                            <input
                              className={`form-control ${
                                input.password === "" ? "border-danger" : ""
                              }`}
                              type="password"
                              placeholder="Type secure password"
                              name="password"
                              value={input.password}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="mb-4 row align-items-center">
                          <label className="form-label-title col-sm-3 mb-0">
                            Role
                          </label>
                          <div className="col-sm-9">
                            <select
                              name="role"
                              value={input.role}
                              onChange={handleInputChange}
                              className={`form-select ${
                                input.role === "" ? "border-danger" : ""
                              }`}
                            >
                              <option value="">Select Role</option>
                              <option value="customer">Customer</option>
                              <option value="administrator">
                                Administrator
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-body">
                        <div className="card-header-2">
                          <h5>Meta Information</h5>
                        </div>

                        <div className="row mb-4">
                          <div className="col-12">
                            <div className="row">
                              <label className="form-label-title col-sm-3 mb-0">
                                Name
                              </label>
                              <div className="col-sm-9">
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Type full name"
                                  name="name"
                                  value={input.name}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-12">
                            <div className="row">
                              <label className="form-label-title col-sm-3 mb-0">
                                Phone
                              </label>
                              <div className="col-sm-9">
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Type phone number"
                                  name="phone"
                                  value={input.phone}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-body">
                        <div className="card-header-2">
                          <h5>Photo</h5>
                        </div>
                        <div className="row mb-4 align-items-center">
                          <label className="col-sm-3 col-form-label form-label-title">
                            Profile photo
                          </label>
                          <div className="col-sm-9">
                            <MediaUploader uploaderId="user_photo" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-animation justify-content-center mb-4"
                        type="submit"
                        disabled={
                          uploaderIsLoading?.user_photo ||
                          input.email === "" ||
                          input.password === "" ||
                          input.role === ""
                        }
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* New Product Add End */}
      </div>
    </>
  );
};

export default AddNewUser;
