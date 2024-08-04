// dependencies
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Breadcrumb from "../components/layouts/Breadcrumb";
import Footer from "../components/layouts/footer/Footer";
import Header from "../components/layouts/header/Header";

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Breadcrumb />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
