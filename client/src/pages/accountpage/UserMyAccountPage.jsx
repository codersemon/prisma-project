// dependencies
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/userAccountPage/Sidebar";
import { authSelect } from "../../features/authSlice";
import useDropdownPopupController from "../../hooks/useDropdownPopupController";
import "./UserMyAccountPage.css";

const UserMyAccountPage = () => {
  // auth context
  const { user } = useSelector(authSelect);

  /**
   * MOBILE SIDEBAR FOR MY ACCOUNT PAGE STATE
   */
  const { isOpen, handleToggler, openedWrapperRef } =
    useDropdownPopupController();

  return (
    <>
      <div className={`bg-overlay ${isOpen ? "show" : ""}`}></div>
      <section className="user-dashboard-section section-b-space">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-xxl-3 col-lg-4" ref={openedWrapperRef}>
              <Sidebar
                user={user}
                mobileSidebarIsOpen={isOpen}
                handleToggler={handleToggler}
              />
              <button
                className="btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none"
                onClick={handleToggler}
              >
                Show Menu
              </button>
            </div>

            <div className="col-xxl-9 col-lg-8">
              <div className="dashboard-right-sidebar">
                <div className="tab-content" id="pills-tabContent">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserMyAccountPage;
