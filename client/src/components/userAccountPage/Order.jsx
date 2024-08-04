import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderSelect } from "../../features/orderSlice";
import { getDateFromTimestamps } from "../../helpers/helpers";

const Order = () => {
  /**
   * order context
   */
  const { orders } = useSelector(orderSelect);

  /**
   * filtered orders state
   */
  const [filteredOrders, setFilteredOrders] = useState([]);

  /**
   * paginated orders
   */
  const [paginatedOrders, setPaginatedOrders] = useState([]);

  /**
   * fill the filteredOrders state by orders initially
   */
  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  /**
   * handle order status filter
   */
  const handleOrderStatusFilter = (e) => {
    // get order status from select tag
    const orderStatus = e.target.value;

    // if order status is not "no-status", then filter orders by status
    if (orderStatus !== "no-status") {
      const ordersByOrderStatus = orders?.filter(
        (order) => order?.order_status === orderStatus
      );
      return setFilteredOrders(ordersByOrderStatus);
    }

    // if order status is "no-status", then return all orders
    return setFilteredOrders(orders);
  };

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // item limit per page
  const itemPerPage = 5;

  // handle pagination effect
  useEffect(() => {
    setPaginatedOrders(
      filteredOrders.slice(
        (currentPage - 1) * itemPerPage,
        currentPage * itemPerPage
      )
    );
  }, [currentPage, filteredOrders]);

  // pagination array
  const paginationPagesNumber = Array.from(
    { length: Math.ceil(filteredOrders.length / itemPerPage) },
    (_, index) => index + 1
  );

  const isNextPageAvailable =
    currentPage < Math.ceil(filteredOrders.length / itemPerPage);
  const isPrevPageAvailable = currentPage > 1;

  return (
    <>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <div className="dashboard-order">
        <div className="title">
          <h2>My Orders History</h2>
          <span className="title-leaf title-leaf-gray">
            <svg className="icon-width bg-gray">
              <use xlinkHref="/assets/svg/leaf.svg#leaf" />
            </svg>
          </span>
        </div>
        <div className="mb-4">
          <select
            name="status"
            className="form-select w-auto"
            onChange={handleOrderStatusFilter}
          >
            <option value="no-status">Select Order Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
        <div className="order-contain">
          {paginatedOrders?.length > 0 ? (
            paginatedOrders?.map((order) => (
              <div key={order?.id} className="order-box dashboard-bg-box">
                <div className="order-container">
                  <div className="order-icon">
                    <FeatherIcon icon="box" />
                  </div>
                  <div className="order-detail">
                    <h4 className="order-status">
                      Order Status{" "}
                      <span
                        className={`text-capitalize ${order?.order_status}`}
                      >
                        {order?.order_status}
                      </span>
                    </h4>
                    {order?.order_status === "pending" && (
                      <h6 className="text-content">
                        Your order is now pending. <Link>Pay</Link> the order
                        amount to start processing.
                      </h6>
                    )}
                    {order?.order_status === "processing" && (
                      <h6 className="text-content">
                        We are processing your order. Will be delivered to your
                        addresss very soon.
                      </h6>
                    )}
                    {order?.order_status === "completed" && (
                      <h6 className="text-content">
                        Order successfully delivered to you.
                      </h6>
                    )}
                    {order?.order_status === "cancelled" && (
                      <h6 className="text-content">
                        We have cancelled your order. If you have any question,{" "}
                        <Link to="/contact">contact with us.</Link>
                      </h6>
                    )}
                    {order?.order_status === "refunded" && (
                      <h6 className="text-content">
                        We have refunded the order amount to you.
                      </h6>
                    )}
                  </div>
                </div>
                <div className="product-order-detail">
                  <a href="product-left-thumbnail.html" className="order-image">
                    <img
                      src={order?.items[0]?.product?.thumbnail?.url}
                      className="blur-up lazyload"
                      alt=""
                      style={{
                        maxWidth: "160px",
                        maxHeight: "160px",
                        objectFit: "cover",
                      }}
                    />
                  </a>
                  <div className="order-wrap">
                    <ul className="product-size">
                      <li>
                        <div className="size-box">
                          <h6 className="text-content">Order ID : </h6>
                          <h5>#{order?.id}</h5>
                        </div>
                      </li>
                      <li>
                        <div className="size-box">
                          <h6 className="text-content">Order Date : </h6>
                          <h5>{getDateFromTimestamps(order?.createdAt)}</h5>
                        </div>
                      </li>
                      <li>
                        <div className="size-box">
                          <h6 className="text-content">Order Total : </h6>
                          <h5>${order?.order_total}</h5>
                        </div>
                      </li>
                      {/* <li>
                          <div className="size-box">
                            <h6 className="text-content">Rate : </h6>
                            <div className="product-rating ms-2">
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
                            </div>
                          </div>
                        </li> */}
                      <li>
                        <div className="size-box">
                          <h6 className="text-content">Sold By : </h6>
                          <h5>Greenkart</h5>
                        </div>
                      </li>
                      <li>
                        <div className="size-box">
                          <h6 className="text-content">Total Products : </h6>
                          <h5>{order?.items?.length}</h5>
                        </div>
                      </li>
                      <li>
                        <div className="size-box">
                          <Link
                            to={`/my-account/order/${order?.id}`}
                            className="btn btn-sm bg-theme text-white px-2 py-1"
                          >
                            View
                          </Link>
                          {order?.payment_status === "pending" &&
                            order?.order_status === "pending" && (
                              <Link className="btn btn-sm bg-theme text-white px-2 py-1 btn-animation ms-2">
                                Pay
                              </Link>
                            )}
                          {order?.order_status === "processing" && (
                            <Link className="btn btn-sm bg-theme text-white px-2 py-1 btn-animation ms-2">
                              Tracking
                            </Link>
                          )}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3>No order found! 😶</h3>
          )}

          <nav className="custome-pagination">
            <ul className="pagination justify-content-center">
              {isPrevPageAvailable && (
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Prev
                  </button>
                </li>
              )}

              {paginationPagesNumber?.length > 0 &&
                paginationPagesNumber?.map((pageNumber) => (
                  <li
                    key={pageNumber}
                    className={`page-item ${
                      currentPage === pageNumber && "active"
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                ))}

              {isNextPageAvailable && (
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Order;
