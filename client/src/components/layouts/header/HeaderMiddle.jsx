// dependencies
import FeatherIcon from "feather-icons-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeItemFromCart } from "../../../features/cartAPISlice";
import { cartSelect, setStateEmpty } from "../../../features/cartSlice";
import {
  removeWishlistItemByIdFromReduxState,
  wishlistSelect,
} from "../../../features/wishlistSlice";
import { Toast } from "../../../utils/Toast";
import LogoutComponent from "../../common/LogoutComponent";
import ModalLayout from "../../common/ModalLayout";
import LocationModalContent from "../../modalContents/LocationModalContent";

const HeaderMiddle = ({ hamburgerToggler, user }) => {
  // location modal state
  const [showLocationModal, setShowLocationModal] = useState(false);

  // cart context
  const { products, lastProductIdInCart, status, message, error } =
    useSelector(cartSelect);

  /**
   * wishlist context
   */
  const { wishlist } = useSelector(wishlistSelect);

  /**
   * react-redux usedispatch hook init
   */
  const dispatch = useDispatch();

  // cart total calculation
  const cartTotal = useMemo(() => {
    let amount = 0;
    products.forEach(
      (item) =>
        (amount +=
          (item?.product?.sale_price
            ? item?.product?.sale_price
            : item?.product?.price) * item.quantity)
    );
    return amount;
  }, [products]);

  /**
   * SHOW MESSAGE BASED ON API RESPONSE RESULT USING REDUX
   */
  useEffect(() => {
    if (message && status == "success") {
      // show successful toaster message
      Toast.fire({ title: message, icon: "success" });

      // remove product from wishlist, which is added to cart
      dispatch(removeWishlistItemByIdFromReduxState(lastProductIdInCart));

      // clear cart state message
      dispatch(setStateEmpty());
    }

    if (error) {
      // show erorr toaster message
      Toast.fire({ title: error, icon: "error" });

      // clear auth state message
      dispatch(setStateEmpty());
    }
  }, [status, message, error, dispatch, lastProductIdInCart]);

  return (
    <>
      <div className="top-nav top-header sticky-header">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="navbar-top">
                <button
                  className="navbar-toggler d-xl-none d-inline navbar-menu-button"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#primaryMenu"
                  onClick={hamburgerToggler}
                >
                  <span className="navbar-toggler-icon">
                    <i className="fa-solid fa-bars" />
                  </span>
                </button>
                <Link to="/" className="web-logo nav-logo">
                  <img
                    src="/assets/images/logo/1.png"
                    className="img-fluid blur-up lazyload"
                    alt="logo"
                  />
                </Link>
                <div className="middle-box">
                  <div
                    className="location-box"
                    onClick={() => setShowLocationModal(true)}
                  >
                    <button
                      className="btn location-button"
                      data-bs-toggle="modal"
                      data-bs-target="#locationModal"
                    >
                      <span className="location-arrow">
                        <FeatherIcon icon="map-pin" />
                      </span>
                      <span className="locat-name">Your Location</span>
                      <i className="fa-solid fa-angle-down" />
                    </button>
                  </div>
                  <div className="search-box">
                    <div className="input-group">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="I'm searching for..."
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <button className="btn" type="button" id="button-addon2">
                        <FeatherIcon icon="search" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="rightside-box">
                  <div className="search-full">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FeatherIcon icon="search" className="font-light" />
                      </span>
                      <input
                        type="text"
                        className="form-control search-type"
                        placeholder="Search here.."
                      />
                      <span className="input-group-text close-search">
                        <FeatherIcon icon="x" className="font-light" />
                      </span>
                    </div>
                  </div>
                  <ul className="right-side-menu">
                    <li className="right-side">
                      <div className="delivery-login-box">
                        <div className="delivery-icon">
                          <div className="search-box">
                            <FeatherIcon icon="search" />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="right-side">
                      <a href="contact-us.html" className="delivery-login-box">
                        <div className="delivery-icon">
                          <FeatherIcon icon="phone-call" />
                        </div>
                        <div className="delivery-detail">
                          <h6>24/7 Delivery</h6>
                          <h5>+91 888 104 2340</h5>
                        </div>
                      </a>
                    </li>
                    <li className="right-side">
                      <Link
                        to="/wishlist"
                        className="btn p-0 position-relative header-wishlist"
                      >
                        <FeatherIcon icon="heart" />
                        <span className="position-absolute top-0 start-100 translate-middle badge">
                          {wishlist.length}
                          <span className="visually-hidden">
                            unread messages
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="right-side">
                      <div className="onhover-dropdown header-badge">
                        <button
                          type="button"
                          className="btn p-0 position-relative header-wishlist"
                        >
                          <FeatherIcon icon="shopping-cart" />
                          <span className="position-absolute top-0 start-100 translate-middle badge">
                            {products.length}
                            <span className="visually-hidden">
                              unread messages
                            </span>
                          </span>
                        </button>
                        <div className="onhover-div">
                          <ul className="cart-list">
                            {products.length > 0
                              ? products?.map((item) => (
                                  <li
                                    key={item.id}
                                    className="product-box-contain"
                                  >
                                    <div className="drop-cart">
                                      <Link
                                        to={`/product/${item?.product?.slug}`}
                                        className="drop-image"
                                      >
                                        <img
                                          src={item?.product?.thumbnail?.url}
                                          className="blur-up lazyload"
                                          alt=""
                                        />
                                      </Link>
                                      <div className="drop-contain">
                                        <Link
                                          to={`/product/${item?.product?.slug}`}
                                        >
                                          <h5>{item?.product?.name}</h5>
                                        </Link>
                                        <h6>
                                          <span>{item?.quantity} x</span> $
                                          {item?.product?.sale_price
                                            ? item?.product?.sale_price
                                            : item?.product?.price}
                                        </h6>
                                        <button
                                          className="close-button close_button"
                                          onClick={() =>
                                            dispatch(
                                              removeItemFromCart(item?.id)
                                            )
                                          }
                                        >
                                          <i className="fa-solid fa-xmark" />
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                                ))
                              : "No product in cart!"}
                          </ul>
                          {products.length > 0 && (
                            <div className="price-box">
                              <h5>Total :</h5>
                              <h4 className="theme-color fw-bold">
                                ${cartTotal}
                              </h4>
                            </div>
                          )}

                          <div className="button-group">
                            <Link to="/cart" className="btn btn-sm cart-button">
                              View Cart
                            </Link>
                            {products.length > 0 && (
                              <Link
                                to="/checkout"
                                className="btn btn-sm cart-button theme-bg-color
                                      text-white"
                              >
                                Checkout
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="right-side onhover-dropdown">
                      <div className="delivery-login-box">
                        <div className="delivery-icon">
                          <FeatherIcon icon="user" />
                        </div>
                        <div className="delivery-detail">
                          {user && (
                            <>
                              <h6>
                                Hello, {user?.meta?.name && user?.meta?.name}
                              </h6>
                              <h5>My Account</h5>
                            </>
                          )}
                          {!user && <h5>Login/Register</h5>}
                        </div>
                      </div>
                      <div className="onhover-div onhover-div-login">
                        {/* User logged in menu  */}
                        {user && (
                          <ul className="user-box-name">
                            <li className="product-box-contain">
                              <i />
                              <Link to="/my-account">My Account</Link>
                            </li>
                            <li className="product-box-contain">
                              <LogoutComponent>Logout</LogoutComponent>
                            </li>
                          </ul>
                        )}
                        {/* user not-logged in menu  */}
                        {!user && (
                          <ul className="user-box-name">
                            <li className="product-box-contain">
                              <i />
                              <Link to="/login">Log In</Link>
                            </li>
                            <li className="product-box-contain">
                              <Link to="/register">Register</Link>
                            </li>
                            <li className="product-box-contain">
                              <Link to="/forgot-password">Forgot Password</Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Modal  */}
      <ModalLayout
        showModal={showLocationModal}
        closeModal={() => setShowLocationModal(false)}
        className="location-modal"
        title="Choose your Delivery Location"
        subtitle="Enter your address and we will specify the offer for your area."
      >
        <LocationModalContent />
      </ModalLayout>
    </>
  );
};

export default HeaderMiddle;
