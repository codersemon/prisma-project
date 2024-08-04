// dependencies
import FeatherIcon from "feather-icons-react";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutComponent from "../common/LogoutComponent";
import WebcamComponent from "../common/WebcamComponent";

const Sidebar = ({ user, mobileSidebarIsOpen, handleToggler }) => {
  const location = useLocation();
  const currentPathName = useMemo(() => {
    const paths = location.pathname.split("/").filter((path) => path !== "");
    return paths[paths.length - 1];
  }, [location.pathname]);

  return (
    <div
      className={`dashboard-left-sidebar ${mobileSidebarIsOpen ? "show" : ""}`}
    >
      <div className="close-button d-flex d-lg-none" onClick={handleToggler}>
        <button className="close-sidebar">
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
      <div className="profile-box">
        <div className="cover-image">
          <img
            src="/assets/images/inner-page/cover-img.jpg"
            className="img-fluid blur-up lazyload"
            alt=""
          />
        </div>
        <div className="profile-contain">
          <div className="profile-image">
            <div className="position-relative">
              <img
                src={user?.meta?.photo}
                className="blur-up lazyload update_img"
                alt=""
              />
              <div className="cover-icon">
                <i className="fa-solid fa-pen">
                  <input type="file" />
                </i>
              </div>
            </div>
          </div>
          <div className="profile-name">
            <h3>{user?.meta?.name}</h3>
            <h6 className="text-content">{user?.email}</h6>
          </div>
        </div>
      </div>
      <ul className="nav nav-pills user-nav-pills" id="pills-tab">
        <li className="nav-item">
          <Link
            className={`nav-link ${
              currentPathName === "my-account" ? "active" : ""
            }`}
            to="/my-account/"
          >
            <FeatherIcon icon="home" />
            DashBoard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              currentPathName === "orders" ? "active" : ""
            }`}
            to="/my-account/orders/"
          >
            <FeatherIcon icon="shopping-bag" />
            Orders
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              currentPathName === "wishlist" ? "active" : ""
            }`}
            to="/my-account/wishlist"
          >
            <FeatherIcon icon="heart" />
            Wishlist
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              currentPathName === "address" ? "active" : ""
            }`}
            to="/my-account/address"
          >
            <FeatherIcon icon="map-pin" />
            Address
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              currentPathName === "profile" ? "active" : ""
            }`}
            to="/my-account/profile"
          >
            <FeatherIcon icon="edit" />
            Edit Profile
          </Link>
        </li>
        <li className="nav-item">
          <LogoutComponent className="nav-link">
            <FeatherIcon icon="log-out" />
            Logout
          </LogoutComponent>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
