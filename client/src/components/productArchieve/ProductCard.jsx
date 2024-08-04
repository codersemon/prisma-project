// dependencies
import FeatherIcon from "feather-icons-react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../features/cartAPISlice";
import ProductCardOptions from "../common/ProductCardOptions";

const ProductCard = ({ productDetails }) => {
  /**
   * react-redux useDispatch hook init
   */
  const dispatch = useDispatch();
  return (
    <div>
      <div className="product-box-3 h-100 wow fadeInUp">
        <div className="product-header">
          <div className="product-image">
            <Link to={`/product/${productDetails?.slug}`}>
              <img
                src={productDetails?.thumbnail?.url}
                className="img-fluid blur-up lazyload"
                alt=""
              />
            </Link>
            <ProductCardOptions
              classOption="product-option"
              productDetails={productDetails}
            />
          </div>
        </div>
        <div className="product-footer">
          <div className="product-detail">
            <span className="span-name">
              {productDetails?.categories?.length > 0 &&
                productDetails.categories
                  .map((item) => item.category.name)
                  .join(", ")}
            </span>
            <Link to={`/product/${productDetails?.slug}`}>
              <h5 className="name">{productDetails?.name}</h5>
            </Link>
            <div className="product-rating mt-2">
              <ul className="rating">
                <li>
                  <FeatherIcon icon="star" className="fill" />
                </li>
                <li>
                  <FeatherIcon icon="star" className="fill" />
                </li>
                <li>
                  <FeatherIcon icon="star" className="fill" />
                </li>
                <li>
                  <FeatherIcon icon="star" className="fill" />
                </li>
                <li>
                  <FeatherIcon icon="star" />
                </li>
              </ul>
              <span>(4.0)</span>
            </div>
            <h5 className="price">
              {productDetails?.sale_price ? (
                <>
                  <span className="theme-color">
                    ${productDetails?.sale_price}
                  </span>{" "}
                  <del>${productDetails?.price}</del>
                </>
              ) : (
                <>
                  <span className="theme-color">${productDetails?.price}</span>
                </>
              )}
            </h5>
            <div className="add-to-cart-box bg-white">
              <button
                className="btn btn-add-cart addcart-button"
                onClick={() =>
                  dispatch(
                    addItemToCart({
                      productId: productDetails?.id,
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

export default ProductCard;
