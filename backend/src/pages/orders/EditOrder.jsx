// dependencies
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getSingleOrderById,
  updateSingleOrderById,
} from "../../feature/orderAPISlice";
import { orderSelect } from "../../feature/orderSlice";
import { getDateFromTimestamps } from "../../helpers/helpers";
import "./EditOrder.css";

const EditOrder = () => {
  // order id  from url parameter
  const { id } = useParams();

  /**
   * react-redux dispatch hook init
   */
  const dispatch = useDispatch();

  /**
   * order context
   */
  const { singleOrder } = useSelector(orderSelect);

  /**
   * effect handler for single product fetch
   */
  useEffect(() => {
    dispatch(getSingleOrderById(id));
  }, [dispatch, id]);

  /**
   * status update open/close state
   */
  const [statusUpdaterOpen, setStatusUpdaterOpen] = useState(false);

  /**
   * handle order status update
   */
  const handleOrderStatusUpdater = (e) => {
    // get order status from select tag
    const orderStatus = e.target.value;

    // dispatch order updater action
    dispatch(updateSingleOrderById({ id, order_status: orderStatus }));
  };

  return (
    <>
      <div className="page-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card border-0">
                <div className="card-body">
                  <div className="title-header title-header-block package-card">
                    <div>
                      <h5 className="order-status">
                        Order #{singleOrder?.id}{" "}
                        <span
                          className={`text-capitalize ${singleOrder?.order_status}`}
                        >
                          {singleOrder?.order_status}
                        </span>
                      </h5>
                    </div>
                    <div className="card-order-section">
                      <ul>
                        <li>
                          {getDateFromTimestamps(singleOrder?.createdAt)} at
                          9:08 pm
                        </li>
                        <li>
                          {singleOrder?.items?.length} item
                          {singleOrder?.items?.length > 1 ? "s" : ""}
                        </li>
                        <li>Total ${singleOrder?.order_total}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-inner cart-section order-details-table">
                    <div className="row g-4">
                      <div className="col-xl-8">
                        <div className="table-responsive table-details custom-sticky-top">
                          <table className="table cart-table table-borderless">
                            <thead>
                              <tr>
                                <th colSpan="4">Items</th>
                              </tr>
                            </thead>

                            <tbody>
                              {singleOrder?.items?.length > 0 &&
                                singleOrder?.items?.map((item) => (
                                  <tr key={item?.id} className="table-order">
                                    <td>
                                      <a href="javascript:void(0)">
                                        <img
                                          src={item?.product?.thumbnail?.url}
                                          className="img-fluid blur-up lazyload"
                                          alt=""
                                        />
                                      </a>
                                    </td>
                                    <td>
                                      <p>Product Name</p>
                                      <h5>{item?.product?.name}</h5>
                                    </td>
                                    <td>
                                      <p>Quantity</p>
                                      <h5>{item?.quantity}</h5>
                                    </td>
                                    <td>
                                      <p>Price</p>
                                      <h5>${item?.price * item?.quantity}</h5>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>

                            <tfoot>
                              <tr className="table-order">
                                <td colSpan="3">
                                  <h5>Subtotal :</h5>
                                </td>
                                <td>
                                  <h4>${singleOrder?.sub_total}</h4>
                                </td>
                              </tr>

                              <tr className="table-order">
                                <td colSpan="3">
                                  <h5>Tax total :</h5>
                                </td>
                                <td>
                                  <h4>${singleOrder?.tax_total}</h4>
                                </td>
                              </tr>
                              <tr className="table-order">
                                <td colSpan="3">
                                  <h5 className="theme-color">Discount :</h5>
                                </td>
                                <td>
                                  <h4 className="text-danger">
                                    - ${singleOrder?.discount}
                                  </h4>
                                </td>
                              </tr>

                              <tr className="table-order">
                                <td colSpan="3">
                                  <h4 className="theme-color fw-bold">
                                    Total Price :
                                  </h4>
                                </td>
                                <td>
                                  <h4 className="theme-color fw-bold">
                                    ${singleOrder?.order_total}
                                  </h4>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>

                      <div className="col-xl-4">
                        <div className="order-success custom-sticky-top">
                          <div className="row g-4">
                            <h4>summary</h4>
                            <ul className="order-details">
                              <li>Order ID: {singleOrder?.id}</li>
                              <li>
                                Order Date:{" "}
                                {getDateFromTimestamps(singleOrder?.createdAt)}
                              </li>
                              <li>
                                Status: {singleOrder?.order_status}{" "}
                                <span
                                  className="bg-primary px-2 ms-2 rounded-1 cursor-pointer"
                                  onClick={() =>
                                    setStatusUpdaterOpen((prev) => !prev)
                                  }
                                >
                                  Edit
                                </span>
                              </li>
                              {statusUpdaterOpen && (
                                <li>
                                  <select
                                    name="status"
                                    className="form-select w-auto mt-2"
                                    value={singleOrder?.order_status}
                                    onChange={handleOrderStatusUpdater}
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="processing">
                                      Processing
                                    </option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="completed">Completed</option>
                                    <option value="refunded">Refunded</option>
                                  </select>
                                </li>
                              )}
                            </ul>

                            <h4>billing address</h4>
                            <ul className="order-details">
                              <li>
                                {singleOrder?.billing_address?.street_address},{" "}
                                {singleOrder?.billing_address?.street_address_2
                                  ? `${singleOrder?.billing_address?.street_address_2},`
                                  : ""}
                                {singleOrder?.billing_address?.district},{" "}
                                {singleOrder?.billing_address?.country}
                              </li>
                              <li>
                                Zip Code:{" "}
                                {singleOrder?.billing_address?.zip_code}
                              </li>
                              <li>
                                Phone: {singleOrder?.billing_address?.phone}
                              </li>
                            </ul>

                            <h4>shipping address</h4>
                            <ul className="order-details">
                              <li>
                                {singleOrder?.shipping_address?.street_address},{" "}
                                {singleOrder?.shipping_address?.street_address_2
                                  ? `${singleOrder?.shipping_address?.street_address_2},`
                                  : ""}
                                {singleOrder?.shipping_address?.district},{" "}
                                {singleOrder?.shipping_address?.country}
                              </li>
                              <li>
                                Zip Code:{" "}
                                {singleOrder?.shipping_address?.zip_code}
                              </li>
                              <li>
                                Phone: {singleOrder?.shipping_address?.phone}
                              </li>
                            </ul>

                            <div className="payment-mode">
                              <h4>payment details</h4>
                              <ul className="order-details">
                                <li>
                                  Payment Status: {singleOrder?.payment_status}
                                </li>
                                <li>
                                  Payment Method: {singleOrder?.payment_method}
                                </li>
                                <li>
                                  {singleOrder?.payment_status === "pending" &&
                                    singleOrder?.order_status === "pending" && (
                                      <Link className="btn btn-sm bg-primary text-white px-2 py-1 me-2">
                                        Pay
                                      </Link>
                                    )}
                                  {singleOrder?.order_status ===
                                    "processing" && (
                                    <Link className="btn btn-sm bg-primary text-white px-2 py-1">
                                      Tracking
                                    </Link>
                                  )}
                                </li>
                              </ul>
                            </div>

                            <div className="delivery-sec">
                              <h3>
                                expected date of delivery:{" "}
                                <span>october 22, 2018</span>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOrder;
