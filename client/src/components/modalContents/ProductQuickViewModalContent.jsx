// dependencies
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../features/cartAPISlice";

const ProductQuickViewModalContent = ({ productDetails }) => {
  console.log(productDetails);
  /**
   * react-redux dispatch hook init
   */
  const dispatch = useDispatch();

  return (
    <div className="row g-sm-4 g-2">
      <div className="col-lg-6">
        <div className="slider-image">
          <img
            src={productDetails?.thumbnail?.url}
            className="img-fluid blur-up lazyloaded"
            alt=""
          />
        </div>
      </div>

      <div className="col-lg-6">
        <div className="right-sidebar-modal">
          <h4 className="title-name">{productDetails?.name}</h4>
          <h4 className="price">
            ${productDetails?.price}{" "}
            {productDetails?.sale_price && (
              <del style={{ fontSize: "14px" }}>
                {productDetails?.sale_price}
              </del>
            )}
          </h4>
          <div className="product-rating">
            <ul className="rating">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-star fill"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-star fill"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-star fill"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-star fill"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-star"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </li>
            </ul>
            <span className="ms-2">8 Reviews</span>
            <span className="ms-2 text-danger">6 sold in last 16 hours</span>
          </div>

          <div className="product-detail">
            <h4>Product Details :</h4>
            <p>{productDetails?.short_description}</p>
          </div>
          <div className="product-detail">
            {productDetails?.stock_status === "in_stock" && (
              <p className="theme-color">
                Available: {productDetails?.stock_quantity}
              </p>
            )}
            {productDetails?.stock_status === "on_waitlist_order" && (
              <p className="theme-color">
                Taking waitlist order. You will get delivery, when product
                become available.
              </p>
            )}
          </div>

          <div className="modal-button">
            {productDetails?.stock_status === "out_of_stock" ? (
              <button
                disabled
                className="btn bg-danger view-button icon text-white fw-bold btn-md ms-0"
              >
                Out of stock
              </button>
            ) : (
              <button
                className="btn btn-md add-cart-button icon"
                onClick={() =>
                  dispatch(
                    addItemToCart({
                      productId: productDetails?.id,
                      quantity: 1,
                    })
                  )
                }
              >
                Add To Cart
              </button>
            )}

            <Link
              to={`/product/${productDetails?.slug}`}
              className="btn theme-bg-color view-button icon text-white fw-bold btn-md"
            >
              View More Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModalContent;
