// dependencies
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  /**
   * GETTING CURRENT PATHNAME USING 'react-router-dom' PACKAGE
   */
  const { pathname } = useLocation();

  /**
   * GET PATH ARRAY TO CREATE BREADCRUMB LINK STACK
   * REMOVING EMPTY PATH, LIKE ROOT ROUTE, EXTRA SLASH ROUT AT THE PATH END
   */
  const pathArray = pathname.split("/").filter((path) => path !== "");

  /**
   * GET "<title>" TAG CONTENT, TO SHOW ON BREADCRUMB.
   * WILL EXECUTE THIS CODE WHEN RENDER IS DONE AND 'setTimeout'  WILL EXCUTE AND 'pageTitle' STATE WILL UPDATED
   */
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageTitle(document.title);
    }, 10);

    // cleanup function
    return () => clearTimeout(timer);
  }, [pathname]);

  /**
   * LIST OF PATHNAMES, WHERE BREADCRUMB WILL NOT VISIBLE
   */
  const excludedPathList = ["/", "/order-success"];

  /**
   * IF CURRENT PATH MATCH WITH "excludedPathList", THEN RETURN TO HIDE BREADCRUMB
   */
  if (excludedPathList.includes(pathname)) {
    return;
  }

  return (
    <section className="breadscrumb-section pt-0">
      <div className="container-fluid-lg">
        <div className="row">
          <div className="col-12">
            <div className="breadscrumb-contain">
              <h2>{pageTitle}</h2>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/">
                      <i className="fa-solid fa-house" />
                    </Link>
                  </li>

                  {pathArray.length > 1 &&
                    pathArray.slice(0, -1).map((path, index) => {
                      // Construct the link for the current breadcrumb item
                      const to = `/${pathArray.slice(0, index + 1).join("/")}`;

                      return (
                        <li key={to} className="breadcrumb-item">
                          <Link className="text-capitalize" to={to}>{path.replace(/-/g, ' ')}</Link>
                        </li>
                      );
                    })}

                  <li className="breadcrumb-item active">{pageTitle}</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
