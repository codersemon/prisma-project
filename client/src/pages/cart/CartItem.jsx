// dependencies
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeItemFromCart,
  updateItemInCart,
} from "../../features/cartAPISlice";

const CartItem = ({ item }) => {
  /**
   * react-redux useDispatch hook init
   */
  const dispatch = useDispatch();

  /**
   * Item quantity state
   */
  const [quantity, setQuantity] = useState(item?.quantity);

  /**
   * Item update handler
   */
  const handleUpdateCartItem = (productId) => {
    dispatch(updateItemInCart({ productId, quantity }));
  };

  /**
   * Handle quantity increment function
   */
  const handleQuantityIncrement = () => {
    // if product status not "on_waitlist_order", then run the if block
    if (item?.product?.stock_status !== "on_waitlist_order") {
      setQuantity((prev) =>
        item?.product?.stock_quantity > prev ? prev + 1 : prev
      );
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  return (
    <tr className="product-box-contain">
      <td className="product-detail">
        <div className="product border-0">
          <Link
            to={`/product/${item?.product?.slug}`}
            className="product-image"
          >
            <img
              src={item?.product?.thumbnail?.url}
              className="img-fluid blur-up lazyloaded"
              alt=""
            />
          </Link>
          <div className="product-detail">
            <ul>
              <li className="name">
                <Link
                  to={`/product/${item?.product?.slug}`}
                  style={{ textWrap: "wrap" }}
                >
                  {item?.product?.name}
                </Link>
              </li>
              <li className="text-content">
                <span className="text-title">Sold By:</span> GreenKart
              </li>
              <li className="text-content">
                <span className="text-title">Weight: </span>{" "}
                {item?.product?.weight} kg
              </li>
            </ul>
          </div>
        </div>
      </td>
      <td className="price">
        <h4 className="table-title text-content">Price</h4>
        <h5>
          {item?.product?.sale_price ? (
            <>
              ${item?.product?.sale_price}{" "}
              <del className="text-content">
                ${item?.product?.regular_price}
              </del>
            </>
          ) : (
            <>${item?.product?.price}</>
          )}
        </h5>
        {item?.product?.sale_price && (
          <h6 className="theme-color">
            You Save : $
            {(item?.product?.regular_price - item?.product?.sale_price).toFixed(
              0
            )}
          </h6>
        )}
      </td>
      <td className="quantity">
        <h4 className="table-title text-content">Qty</h4>
        <div className="quantity-price">
          <div className="cart_qty">
            <div className="input-group">
              <button
                type="button"
                className="btn qty-left-minus"
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              >
                <i className="fa fa-minus ms-0" aria-hidden="true" />
              </button>
              <input
                className="form-control input-number qty-input"
                type="text"
                name="quantity"
                value={quantity}
              />
              <button
                type="button"
                className="btn qty-right-plus"
                onClick={handleQuantityIncrement}
              >
                <i className="fa fa-plus ms-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        {quantity !== item?.quantity && (
          <button
            className="btn btn-animation px-3 py-1 mt-1"
            onClick={() => handleUpdateCartItem(item?.productId)}
          >
            Update Qty
          </button>
        )}
      </td>
      <td className="subtotal">
        <h4 className="table-title text-content">Total</h4>
        <h5>
          $
          {item?.product?.sale_price
            ? item?.product?.sale_price * item?.quantity
            : item?.product?.regular_price * item?.quantity}
        </h5>
      </td>
      <td className="save-remove">
        <h4 className="table-title text-content">Action</h4>

        <span
          className="remove close_button cursor-pointer"
          onClick={() => dispatch(removeItemFromCart(item?.id))}
        >
          Remove
        </span>
      </td>
    </tr>
  );
};

export default CartItem;
