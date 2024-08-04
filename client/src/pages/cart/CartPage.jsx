// dependencies
import { useMemo } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartSelect } from "../../features/cartSlice";
import CartItem from "./CartItem";

const CartPage = () => {
  // cart context
  const { products } = useSelector(cartSelect);

  // calculate cartTotal
  const cartTotal = useMemo(() => {
    let total = 0;
    products.forEach((item) => (total += item?.product?.price * item.quantity));

    return total;
  }, [products]);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {/* If have no item in cart, then show message  */}
      {products?.length < 1 && (
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
                  No product in cart
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

      {/* If cart have item, then show cart  */}
      {products?.length > 0 && (
        <section className="cart-section section-b-space">
          <div className="container-fluid-lg">
            <div className="row g-sm-5 g-3">
              <div
                className={`${
                  products?.length > 0 ? "col-xxl-9" : "col-md-8 offset-md-2"
                }`}
              >
                <div className="cart-table">
                  <div className="table-responsive-xl">
                    <table className="table">
                      <tbody>
                        {products.length > 0
                          ? products.map((item) => (
                              <CartItem key={item?.id} item={item} />
                            ))
                          : ""}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-xxl-3">
                <div className="summery-box p-sticky">
                  <div className="summery-header">
                    <h3>Cart Total</h3>
                  </div>

                  <ul className="summery-total">
                    <li className="list-total border-top-0">
                      <h4>Order Amount</h4>
                      <h4 className="price theme-color">${cartTotal}</h4>
                    </li>
                  </ul>
                  <div className="button-group cart-button">
                    <ul>
                      <li>
                        <Link
                          to="/checkout"
                          className="btn btn-animation proceed-btn fw-bold py-2"
                        >
                          Process To Checkout
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop"
                          className="btn btn-light shopping-button text-dark"
                        >
                          <i className="fa-solid fa-arrow-left-long me-2" />
                          Return To Shopping
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CartPage;
