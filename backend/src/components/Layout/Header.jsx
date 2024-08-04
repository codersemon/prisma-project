import { BiSupport } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import { LuArchive, LuLogOut, LuSettings, LuUsers } from "react-icons/lu";
import {
  RiArrowDownSLine,
  RiMoonLine,
  RiNotificationLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import { authSelect } from "../../feature/authSlice";
import { Link } from "react-router-dom";
import defaultUserImg from "../../assets/img/default-profile.png"

const Header = ({ minimalSidebar }) => {
  // auth context
  const { c_user } = useSelector(authSelect);

  return (
    <div className={`page-header ${minimalSidebar ? "close_icon" : ""}`}>
      <div className="header-wrapper m-0">
        <div className="header-logo-wrapper p-0">
          <div className="logo-wrapper">
            <a href="index.html">
              <img
                className="img-fluid main-logo"
                src="assets/images/logo/1.png"
                alt="logo"
              />
              <img
                className="img-fluid white-logo"
                src="assets/images/logo/1-white.png"
                alt="logo"
              />
            </a>
          </div>
          <div className="toggle-sidebar">
            <i
              className="status_toggle middle sidebar-toggle"
              data-feather="align-center"
            />
            <a href="index.html">
              <img
                src="assets/images/logo/1.png"
                className="img-fluid"
                alt=""
              />
            </a>
          </div>
        </div>
        <form className="form-inline search-full" action="" method="get">
          <div className="form-group w-100">
            <div className="Typeahead Typeahead--twitterUsers">
              <div className="u-posRelative">
                <input
                  className="demo-input Typeahead-input form-control-plaintext w-100"
                  type="text"
                  placeholder="Search Fastkart .."
                  name="q"
                  title=""
                  autoFocus=""
                />
                <i className="close-search" data-feather="x" />
                <div className="spinner-border Typeahead-spinner" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
              <div className="Typeahead-menu" />
            </div>
          </div>
        </form>
        <div className="nav-right col-6 pull-right right-header p-0">
          <ul className="nav-menus">
            <li>
              <span className="header-search">
                <i className="ri-search-line" />
              </span>
            </li>
            <li className="onhover-dropdown">
              <div className="notification-box">
                <RiNotificationLine />
                <span className="badge rounded-pill badge-theme">4</span>
              </div>
              <ul className="notification-dropdown onhover-show-div">
                <li>
                  <i>
                    <RiNotificationLine style={{ width: "auto" }} fill="#fff" />
                  </i>
                  <h6 className="f-18 mb-0">Notitications</h6>
                </li>
                <li>
                  <p>
                    <FaCircle className="me-2" fill="#0da487" />
                    Delivery processing{" "}
                    <span className="pull-right">10 min.</span>
                  </p>
                </li>
                <li>
                  <p>
                    <FaCircle fill="#9e65c2" className="me-2" />
                    Order Complete<span className="pull-right">1 hr</span>
                  </p>
                </li>
                <li>
                  <p>
                    <FaCircle fill="#a927f9" className="me-2" />
                    Tickets Generated<span className="pull-right">3 hr</span>
                  </p>
                </li>
                <li>
                  <p>
                  <FaCircle fill="#6670bd" className="me-2" />
                    Delivery Complete<span className="pull-right">6 hr</span>
                  </p>
                </li>
                <li>
                  <a className="btn btn-primary" href="">
                    Check all notification
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <div className="mode">
                <RiMoonLine />
              </div>
            </li>
            <li className="profile-nav onhover-dropdown pe-0 me-0">
              <div className="media profile-media">
                <img
                  className="user-profile rounded-circle"
                  src={c_user?.meta?.photo? c_user?.meta?.photo : defaultUserImg}
                  alt=""
                />
                <div className="user-name-hide media-body">
                  <span>{c_user?.meta?.name}</span>
                  <p className="mb-0 font-roboto text-capitalize">
                    {c_user?.meta?.role}
                    <RiArrowDownSLine className="middle" size={16} />
                  </p>
                </div>
              </div>
              <ul className="profile-dropdown onhover-show-div">
                <li>
                  <Link to="/users">
                    <LuUsers size={18} />
                    <span>Users</span>
                  </Link>
                </li>
                <li>
                  <Link to="/orders">
                    <LuArchive size={18} />
                    <span>Orders</span>
                  </Link>
                </li>
                <li>
                  <Link to="/support-ticket">
                    <BiSupport />
                    <span>Spports Tickets</span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile-setting">
                    <LuSettings size={18} />
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <a
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    href=""
                  >
                    <LuLogOut size={18} />
                    <span>Log out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
