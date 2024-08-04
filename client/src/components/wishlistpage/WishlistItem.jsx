// dependencies
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../features/cartAPISlice";
import { deleteWishlistItem } from "../../features/wishlistAPISlice";

const WishlistItem = ({ item, wrapClass, boxClass }) => {
  /**
   * react-redux dispatch hook init
   */
  const dispatch = useDispatch();

  return (
    <div className={wrapClass}>
      <div className={boxClass}>
        <div className="product-header">
          <div className="product-image">
            <Link to={`/product/${item?.product?.slug}`}>
              <img
                src={item?.product?.thumbnail?.url}
                className="img-fluid blur-up lazyloaded"
                alt=""
              />
            </Link>

            <div className="product-header-top">
              <button
                className="btn wishlist-button close_button"
                onClick={() => dispatch(deleteWishlistItem(item?.id))}
              >
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
                  className="feather feather-x"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="product-footer">
          <div className="product-detail">
            <span className="span-name">
              {item?.product?.categories
                ?.map((cat) => cat?.category?.name)
                .join(", ")}
            </span>
            <Link to={`/product/${item?.product?.slug}`}>
              <h5 className="name">{item?.product?.name}</h5>
            </Link>
            <h5 className="price">
              <span className="theme-color">${item?.product?.price}</span>
              {item?.product?.sale_price && (
                <del>${item?.product?.sale_price}</del>
              )}
            </h5>

            <div className="add-to-cart-box bg-white mt-2">
              <button
                className="btn btn-add-cart addcart-button"
                onClick={() =>
                  dispatch(
                    addItemToCart({
                      productId: item?.product?.id,
                      quantity: 1,
                    })
                  )
                }
              >
                Add to cart
                <span className="add-icon bg-light-gray">
                  <MdOutlineShoppingCart size={18} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
