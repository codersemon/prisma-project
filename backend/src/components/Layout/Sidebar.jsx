// dependencies
import { BiSupport } from "react-icons/bi";
import { FaAngleLeft } from "react-icons/fa";
import {
  RiAppsLine,
  RiArchiveLine,
  RiFileChartLine,
  RiHomeLine,
  RiListCheck2,
  RiPriceTag3Line,
  RiSettingsLine,
  RiStarLine,
  RiStore3Line,
  RiUser3Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import SidebarNavItem from "./components/SidebarNavItem";

const Sidebar = ({ minimalSidebar, sidebarToggler }) => {
  return (
    <div className={`sidebar-wrapper ${minimalSidebar ? "close_icon" : ""}`}>
      {/* <div id="sidebarEffect" /> */}
      <div>
        <div className="logo-wrapper logo-wrapper-center">
          <Link to="/" data-bs-original-title="" title="">
            <img
              className="img-fluid for-white"
              src="assets/images/logo/full-white.png"
              alt="logo"
            />
          </Link>
          <div className="back-btn">
            <FaAngleLeft />
          </div>
          <div className="toggle-sidebar" onClick={sidebarToggler}>
            <RiAppsLine
              fill="#fff"
              className="status_toggle middle sidebar-toggle text-white"
            />
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <Link to="/">
            <img
              className="img-fluid main-logo main-white"
              src="assets/images/logo/logo.png"
              alt="logo"
            />
            <img
              className="img-fluid main-logo main-dark"
              src="assets/images/logo/logo-white.png"
              alt="logo"
            />
          </Link>
        </div>
        <nav className="sidebar-main">
          <div className="left-arrow" id="left-arrow">
            <i data-feather="arrow-left" />
          </div>
          <div id="sidebar-menu">
            <ul className="sidebar-links" id="simple-bar">
              <li className="back-btn" />
              <li className="sidebar-list">
                <Link
                  className="sidebar-link sidebar-title link-nav active"
                  to="/"
                >
                  <RiHomeLine />
                  <span>Dashboard</span>
                </Link>
              </li>
              <SidebarNavItem icon={RiStore3Line} title="Product">
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/add-new-product">Add New Product</Link>
                </li>
              </SidebarNavItem>

              <SidebarNavItem icon={RiListCheck2} title="Category">
                <li>
                  <Link to="/categories">Category List</Link>
                </li>
                <li>
                  <Link to="/add-new-category">Add New Category</Link>
                </li>
              </SidebarNavItem>

              {/* <SidebarNavItem icon={RiListSettingsLine} title="Attributes">
                <li>
                  <a href="attributes.html">Attributes</a>
                </li>
                <li>
                  <a href="add-new-attributes.html">Add Attributes</a>
                </li>
              </SidebarNavItem> */}

              <SidebarNavItem icon={RiUser3Line} title="Users">
                <li>
                  <Link to="/users">All Users</Link>
                </li>
                <li>
                  <Link to="/add-new-user">Add New User</Link>
                </li>
              </SidebarNavItem>

              {/* <SidebarNavItem icon={RiUser3Line} title="Roles">
                <li>
                  <a href="role.html">All roles</a>
                </li>
                <li>
                  <a href="create-role.html">Create Role</a>
                </li>
              </SidebarNavItem> */}

              <li className="sidebar-list">
                <Link
                  className="sidebar-link sidebar-title link-nav"
                  to="/media"
                >
                  <RiPriceTag3Line />
                  <span>Media</span>
                </Link>
              </li>

              <SidebarNavItem icon={RiArchiveLine} title="Orders">
                <li>
                  <Link to="/orders">Order List</Link>
                </li>
                <li>
                  <Link to="/create-order">Create Order</Link>
                </li>
              </SidebarNavItem>

              <SidebarNavItem icon={RiPriceTag3Line} title="Coupons">
                <li>
                  <a href="coupon-list.html">Coupon List</a>
                </li>
                <li>
                  <a href="create-coupon.html">Create Coupon</a>
                </li>
              </SidebarNavItem>

              <li className="sidebar-list">
                <Link
                  className="sidebar-link sidebar-title link-nav"
                  to="/product-reviews"
                >
                  <RiStarLine />
                  <span>Product Reviews</span>
                </Link>
              </li>
              <li className="sidebar-list">
                <a
                  className="sidebar-link sidebar-title link-nav"
                  href="support-ticket.html"
                >
                  <BiSupport />
                  <span>Support Ticket</span>
                </a>
              </li>

              <li className="sidebar-list">
                <a
                  className="sidebar-link sidebar-title link-nav"
                  href="reports.html"
                >
                  <RiFileChartLine />
                  <span>Reports</span>
                </a>
              </li>

              <SidebarNavItem icon={RiSettingsLine} title="Settings">
                <li>
                  <a href="profile-setting.html">Tax Setting</a>
                </li>
                <li>
                  <a href="profile-setting.html">Profile Setting</a>
                </li>
              </SidebarNavItem>

              {/* <li className="sidebar-list">
                <a
                  className="sidebar-link sidebar-title link-nav"
                  href="list-page.html"
                >
                  <RiListCheck />
                  <span>List Page</span>
                </a>
              </li> */}
            </ul>
          </div>
          <div className="right-arrow" id="right-arrow">
            <i data-feather="arrow-right" />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
