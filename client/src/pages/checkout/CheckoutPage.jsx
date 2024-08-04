// dependencies
import FeatherIcon from "feather-icons-react";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalLayout from "../../components/common/ModalLayout";
import AddAddressModalContent from "../../components/modalContents/AddAddressModalContent";
import { authSelect } from "../../features/authSlice";
import { cartSelect, setCartProductsEmpty } from "../../features/cartSlice";
import { createNewOrder } from "../../features/orderAPISlice";
import {
  orderSelect,
  setOrdersStateMessageEmpty,
} from "../../features/orderSlice";
import { Toast } from "../../utils/Toast";
import AddressCard from "./AddressCard";
import "./CheckoutPage.css";
import OrderSummary from "./OrderSummary";
import PaymentMethods from "./PaymentMethods";

const CheckoutPage = () => {
  /**
   * react-redux dispatch hook init
   */
  const dispatch = useDispatch();

  /**
   * react-router-dom useNavigate hook init
   */
  const navigate = useNavigate();

  /**
   * Auth context
   */
  const { user } = useSelector(authSelect);

  // calculated address state
  const addresses = user?.meta?.addresses ? user?.meta?.addresses : [];

  /**
   * Order Context
   */
  const { message, error, status } = useSelector(orderSelect);

  /**
   * Cart Redux state
   */
  const { products } = useSelector(cartSelect);

  // calculated cart item ids
  const cartItemIDs = products?.map((item) => item.id);

  // calculate subtotal from cart items
  const subTotal = useMemo(() => {
    let subTotal = 0;
    if (products?.length > 0) {
      for (let i = 0; i < products.length; i++) {
        subTotal += products[i].product.price * products[i].quantity;
      }
    }
    return subTotal;
  }, [products]);

  // Shipping Fee
  const [shippingFee, setShippingFee] = useState(0);

  // tax rate
  const [taxRate, setTaxRate] = useState(0);

  // taxTotal
  const [taxTotal, setTaxTotal] = useState(0);

  // discount
  const [discount, setDiscount] = useState(0);

  // calculate order total
  const orderTotal = useMemo(() => {
    return subTotal + shippingFee + taxTotal - discount;
  }, [subTotal, shippingFee, taxTotal, discount]);

  /**
   * State for address adding modal open/close
   */
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  /**
   * Different address for delivery state
   */
  const [isDifferentDeliveryAddress, setIsDifferentDeliverAddress] =
    useState(false);

  /**
   * Checkout state
   */
  const [checkoutData, setCheckoutData] = useState({
    billing_address_id: "",
    shipping_address_id: "",
    payment_method: "",
  });

  /**
   * Different delivery address handler
   */
  const handleDeliveryAddressEnableDisable = () => {
    setIsDifferentDeliverAddress((prev) => !prev);

    // as we know that when a state updates, we get the updated state's data, that's why when this state is true then updating the shipping state
    if (isDifferentDeliveryAddress) {
      setCheckoutData((prev) => ({ ...prev, shipping_address_id: "" }));
    }
  };

  /**
   * Checkout action submission handler
   */
  const checkoutTheOrder = () => {
    dispatch(
      createNewOrder({
        ...checkoutData,
        cartIDs: cartItemIDs,
        sub_total: subTotal,
        tax_rate: taxRate,
        tax_total: taxTotal,
        discount,
        order_total: orderTotal,
      })
    );
  };

  /**
   * SHOW MESSAGE & NAVIGATE BASED ON API RESPONSE RESULT USING REDUX
   */
  useEffect(() => {
    if (message) {
      // show successful toaster message
      Toast.fire({ title: message, icon: "success" });

      // if order placed successful, then set cart product empty
      if (status === "success") {
        // clear cart
        dispatch(setCartProductsEmpty());

        // send to thank you page
        navigate("/order-success");
      }

      // clear order state message
      dispatch(setOrdersStateMessageEmpty());
    }

    if (error) {
      // show erorr toaster message
      Toast.fire({ title: error, icon: "error" });

      // clear auth state message
      dispatch(setOrdersStateMessageEmpty());
    }
  }, [message, error, status, dispatch, navigate]);

  // if no product in cart, then show this
  if (products?.length < 1) {
    return (
      <div className="container  my-5">
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
                No product in cart to checkout
              </p>
              <Link to="/shop" className="btn theme-color">
                <i className="fa-solid fa-arrow-left-long me-2" />
                Return To Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <section className="checkout-section-2 section-b-space">
        <div className="container-fluid-lg">
          <div className="row g-sm-4 g-3">
            <div className="col-lg-8">
              <div className="left-sidebar-checkout">
                <div className="checkout-detail-box">
                  <ul>
                    <li>
                      <div className="checkout-icon">
                        <FeatherIcon
                          icon="shopping-cart"
                          className="customIconColor"
                        />
                      </div>
                      <div className="checkout-box">
                        <div className="checkout-title">
                          <h4>Billing Address </h4>
                          <button
                            className="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3"
                            onClick={() => setIsAddAddressModalOpen(true)}
                          >
                            <FeatherIcon icon="plus" className="me-2" /> Add New
                            Address
                          </button>
                        </div>
                        <div className="checkout-detail">
                          <div className="row g-4">
                            {addresses.length > 0 &&
                              addresses?.map((address) => (
                                <AddressCard
                                  key={address.id}
                                  address={address}
                                  addresstype="billing"
                                  billingAddressUpdateHandler={() =>
                                    setCheckoutData((prev) => ({
                                      ...prev,
                                      billing_address_id: address.id,
                                    }))
                                  }
                                />
                              ))}

                            {addresses.length === 0 && (
                              <h3 className="text-center">
                                No address found 😶
                              </h3>
                            )}
                          </div>
                        </div>

                        <label htmlFor="shipAddress" className="mt-4">
                          <input
                            type="checkbox"
                            id="shipAddress"
                            checked={isDifferentDeliveryAddress}
                            onChange={handleDeliveryAddressEnableDisable}
                          />
                          <span className="ms-2">
                            Use Different Address For Delivery
                          </span>
                        </label>
                      </div>
                    </li>

                    {isDifferentDeliveryAddress && (
                      <li>
                        <div className="checkout-icon">
                          <FeatherIcon
                            icon="map-pin"
                            className="customIconColor"
                          />
                        </div>
                        <div className="checkout-box">
                          <div className="checkout-title">
                            <h4>Delivery Address</h4>
                          </div>
                          <div className="checkout-detail">
                            <div className="row g-4">
                              {addresses.length > 0 &&
                                addresses?.map((address) => (
                                  <AddressCard
                                    key={address.id}
                                    address={address}
                                    addresstype="delivery"
                                    deliveryAddressUpdateHandler={() =>
                                      setCheckoutData((prev) => ({
                                        ...prev,
                                        shipping_address_id: address.id,
                                      }))
                                    }
                                  />
                                ))}

                              {addresses.length === 0 && (
                                <h3 className="text-center">
                                  No address found 😶
                                </h3>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    )}

                    <PaymentMethods setCheckoutData={setCheckoutData} />
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="right-side-summery-box">
                <OrderSummary
                  products={products}
                  subTotal={subTotal}
                  shippingFee={shippingFee}
                  taxRate={taxRate}
                  taxTotal={taxTotal}
                  discount={discount}
                  setDiscount={setDiscount}
                  orderTotal={orderTotal}
                />

                <button
                  className="btn theme-bg-color text-white btn-md w-100 mt-4 fw-bold"
                  onClick={checkoutTheOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Address Modal  */}
      <ModalLayout
        showModal={isAddAddressModalOpen}
        closeModal={() => setIsAddAddressModalOpen(false)}
        title="Add a new address"
        className="theme-modal location-modal"
      >
        <AddAddressModalContent />
      </ModalLayout>
    </>
  );
};

export default CheckoutPage;
