import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  // sidebar controller
  const [minimalSidebar, setMinimalSidebar] = useState(false);

  return (
    <>
      <div className="page-wrapper compact-wrapper" id="pageWrapper">
        <Header minimalSidebar={minimalSidebar} />
        <div className="page-body-wrapper">
          <Sidebar
            minimalSidebar={minimalSidebar}
            sidebarToggler={() => setMinimalSidebar(!minimalSidebar)}
          />
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
