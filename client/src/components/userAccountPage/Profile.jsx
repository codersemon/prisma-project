// dependencies
import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authSelect } from "../../features/authSlice";
import ModalLayout from "../common/ModalLayout";
import EmailUpdateModalContent from "../modalContents/EmailUpdateModalContent";
import PasswordUpdateModalContent from "../modalContents/PasswordUpdateModalContent";
import ProfileEditModalContent from "../modalContents/ProfileEditModalContent";

const Profile = () => {
  /**
   * AUTH CONTEXT
   */
  const { user } = useSelector(authSelect);
  // const navigate = useNavigate();

  /**
   * PROFILE EDIT MODAL
   * WILL EDIT (NAME & PHONE)
   */
  const [profileEditOpen, setProfileEditOpen] = useState(false);

  /**
   * EMAIL EDIT MODAL
   */
  const [emailUpdaterOpen, setEmailUpdaterOpen] = useState(false);

  /**
   * PASSWORD EDIT MODAL
   */
  const [passwordUpdaterOpen, setPasswordUpdaterOpen] = useState(false);

  // useEffect(() => {
  //   console.log("Profile component mounted or updated");
  //   console.log("Current user state:", user);

  //   if (!user) {
  //     console.log("User state is null, redirecting to home");
  //     navigate('/');
  //   }

  //   return () => {
  //     console.log("Profile component unmounted");
  //   };
  // }, [user, navigate]);

  return (
    <>
      <Helmet>
        <title>Profile Details</title>
      </Helmet>

      <div className="dashboard-profile">
        <div className="title">
          <h2>My Profile</h2>
          <span className="title-leaf">
            <svg className="icon-width bg-gray">
              <use xlinkHref="../assets/svg/leaf.svg#leaf" />
            </svg>
          </span>
        </div>
        <div className="profile-detail dashboard-bg-box">
          <div className="dashboard-title">
            <h3>Profile Details</h3>
          </div>
          <div className="profile-name-detail">
            <div className="d-sm-flex align-items-center d-block">
              <h3>{user?.meta?.name}</h3>
              <div className="product-rating profile-rating">
                <ul className="rating">
                  <li>
                    <FeatherIcon icon="star" className="fill" />
                  </li>
                  <li>
                    <FeatherIcon icon="star" className="fill" />
                  </li>
                  <li>
                    <FeatherIcon icon="star" className="fill" />
                  </li>
                  <li>
                    <FeatherIcon icon="star" />
                  </li>
                  <li>
                    <FeatherIcon icon="star" />
                  </li>
                </ul>
              </div>
            </div>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                setProfileEditOpen(true);
              }}
            >
              Edit
            </a>
          </div>
          <div className="location-profile border-0">
            <ul>
              <li>
                <div className="location-box">
                  <FeatherIcon icon="map-pin" />
                  <h6>Downers Grove, IL</h6>
                </div>
              </li>
              <li>
                <div className="location-box">
                  <FeatherIcon icon="mail" />
                  <h6>{user?.email}</h6>
                </div>
              </li>
              <li>
                <div className="location-box">
                  <FeatherIcon icon="phone" />
                  <h6>{user?.meta?.phone}</h6>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile-about dashboard-bg-box">
          <div className="row">
            <div className="col-xxl-7">
              <div className="dashboard-title mb-3">
                <h3>Login Details</h3>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Email :</td>
                      <td className="d-flex">
                        <Link to={`mailto:${user?.email}`}>{user?.email}</Link>
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            setEmailUpdaterOpen(true);
                          }}
                        >
                          <span>Edit</span>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Password :</td>
                      <td>
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            setPasswordUpdaterOpen(true);
                          }}
                        >
                          ●●●●●●●●
                          <span>Edit</span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-xxl-3">
              <div className="profile-image">
                <img
                  src="/assets/images/inner-page/dashboard-profile.png"
                  className="img-fluid blur-up lazyload"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile edit modal  */}
      <ModalLayout
        showModal={profileEditOpen}
        closeModal={() => setProfileEditOpen(false)}
        title="Edit profile details"
        className="theme-modal location-modal"
      >
        <ProfileEditModalContent
          name={user?.meta?.name}
          phone={user?.meta?.phone}
        />
      </ModalLayout>

      {/* password update modal  */}
      <ModalLayout
        showModal={passwordUpdaterOpen}
        closeModal={() => setPasswordUpdaterOpen(false)}
        title="Update password"
        className="theme-modal location-modal"
      >
        <PasswordUpdateModalContent />
      </ModalLayout>

      {/* email update modal  */}
      <ModalLayout
        showModal={emailUpdaterOpen}
        closeModal={() => setEmailUpdaterOpen(false)}
        title="Update email"
        className="theme-modal location-modal"
      >
        <EmailUpdateModalContent />
      </ModalLayout>
    </>
  );
};

export default Profile;
