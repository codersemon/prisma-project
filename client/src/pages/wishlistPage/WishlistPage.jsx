// dependencies
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WishlistItem from "../../components/wishlistpage/WishlistItem";
import { wishlistSelect } from "../../features/wishlistSlice";

const WishlistPage = () => {
  /**
   * wishlist context
   */
  const { wishlist } = useSelector(wishlistSelect);
  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>

      <section className="wishlist-section section-b-space">
        <div className="container-fluid-lg">
          <div className="row g-sm-3 g-2">
            {wishlist?.length > 0 ? (
              wishlist?.map((item) => (
                <WishlistItem
                  key={item?.id}
                  item={item}
                  wrapClass="col-xxl-2 col-lg-3 col-md-4 col-6 product-box-contain"
                  boxClass="product-box-3 h-100"
                />
              ))
            ) : (
              <div className="container">
                <div className="row ">
                  <div className="col-md-8 offset-md-2 cart-table">
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
      </section>
    </>
  );
};

export default WishlistPage;
