// dependencies
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { wishlistSelect } from "../../features/wishlistSlice";
import WishlistItem from "../wishlistpage/WishlistItem";

const Wishlist = () => {
  /**
   * wishlist context
   */
  const { wishlist } = useSelector(wishlistSelect);

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <div className="dashboard-wishlist">
        <div className="title">
          <h2>My Wishlist History</h2>
          <span className="title-leaf title-leaf-gray">
            <svg className="icon-width bg-gray">
              <use xlinkHref="../assets/svg/leaf.svg#leaf" />
            </svg>
          </span>
        </div>

        <div className="row g-sm-3 g-2">
          {wishlist?.length > 0 ? (
            wishlist?.map((item) => (
              <WishlistItem
                key={item?.id}
                item={item}
                wrapClass="col-xxl-3 col-lg-6 col-md-4 col-sm-6"
                boxClass="product-box-3 theme-bg-white h-100"
              />
            ))
          ) : (
            <div className="container">
              <div className="row ">
                <div className="col-md-8 offset-md-2 cart-table bg-white">
                  <div className="d-flex  justify-content-between align-items-center">
                    <p
                      style={{
                        fontSize: "20px",
                        margin: "0",
                        textAlign: "center",
                      }}
                    >
                      No product in wishlist
                    </p>
                    <Link to="/shop" className="btn theme-color">
                      <i className="fa-solid fa-arrow-left-long me-2" />
                      Return To Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
