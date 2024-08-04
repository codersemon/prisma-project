import { useState } from "react";

const OrderSummary = ({
  products,
  subTotal,
  shippingFee,
  taxRate,
  taxTotal,
  discount,
  setDiscount,
  orderTotal,
}) => {
  /**
   * Coupon box show/hide state
   */
  const [isCouponBoxOpen, setIsCouponBoxOpen] = useState(false);

  /**
   * Discount handler
   */
  const handleDiscount = () => {
    setDiscount(50.20);
  };
  return (
    <div className="summery-box-2">
      <div className="summery-header">
        <h3>Order Summary</h3>
      </div>
      <div className="summery-contain">
        <h4>
          Have a coupon code?{" "}
          <button
            className="p-0 border-0 bg-transparent theme-color"
            onClick={() => setIsCouponBoxOpen(!isCouponBoxOpen)}
          >
            Click here
          </button>
        </h4>
        {isCouponBoxOpen && (
          <div className="coupon-cart mt-2">
            <h6 className="text-content mb-2">Coupon Apply</h6>
            <div className="mb-3 coupon-box input-group">
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Coupon Code Here..."
              />
              <button className="btn-apply" onClick={handleDiscount}>
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
      <ul className="summery-contain">
        {products?.length > 0 &&
          products?.map((item) => (
            <li key={item.id}>
              <img
                src={item?.product?.thumbnail?.url}
                className="img-fluid blur-up lazyloaded checkout-image"
                alt=""
              />
              <h4>
                {item?.product?.name}{" "}
                <span className="theme-color">X {item?.quantity}</span>
              </h4>
              <h4 className="price">
                ${item?.product?.price * item?.quantity}
              </h4>
            </li>
          ))}
      </ul>
      <ul className="summery-total">
        <li>
          <h4>Subtotal</h4>
          <h4 className="price">${subTotal}</h4>
        </li>
        <li>
          <h4>Shipping</h4>
          <h4 className="price">${shippingFee}</h4>
        </li>
        <li>
          <h4>Tax</h4>
          <h4 className="price">${taxTotal}</h4>
        </li>
        <li>
          <h4>Coupon/Discount</h4>
          <h4 className="price text-danger">- ${discount}</h4>
        </li>
        <li className="list-total">
          <h4>Total (USD)</h4>
          <h4 className="price">${orderTotal}</h4>
        </li>
      </ul>
    </div>
  );
};

export default OrderSummary;
