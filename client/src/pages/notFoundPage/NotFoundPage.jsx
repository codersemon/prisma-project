// dependencies
import FeatherIcon from "feather-icons-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/layouts/Breadcrumb";
import Footer from "../../components/layouts/footer/Footer";
import Header from "../../components/layouts/header/Header";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <Header />
      <Breadcrumb />
      <section className="section-404 section-lg-space">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="image-404">
                <img
                  src="/assets/images/inner-page/404.png"
                  className="img-fluid blur-up lazyload"
                  alt=""
                />
              </div>
            </div>
            <div className="col-12">
              <div className="contain-404">
                <h3 className="text-content">
                  The page you are looking for could not be found. The link to
                  this address may be outdated or we may have moved the since
                  you last bookmarked it.
                </h3>
                <Link
                  to="/"
                  className="btn btn-md text-white theme-bg-color mt-4 mx-auto d-inline-block"
                >
                  <FeatherIcon
                    icon="home"
                    style={{ transform: "translateY(-3px)" }}
                  />
                  <span className="ms-2 d-inline-block">Back To Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default NotFoundPage;
