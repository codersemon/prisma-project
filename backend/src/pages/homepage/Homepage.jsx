// dependencies
import { useMemo } from "react";
import { Helmet } from "react-helmet";
import {
  IoIosTrendingDown,
  IoIosTrendingUp,
  IoMdTrendingDown,
} from "react-icons/io";
import {
  RiBankCardLine,
  RiBarChartGroupedLine,
  RiChat3Line,
  RiCheckLine,
  RiDatabase2Line,
  RiExchangeDollarLine,
  RiShieldLine,
  RiShoppingBag3Line,
  RiUserAddLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderSelect } from "../../feature/orderSlice";
import { productSelect } from "../../feature/productSlice";
import { usersSelect } from "../../feature/userSlice";
import { getDateFromTimestamps } from "../../helpers/helpers";
import "./Homepage.css";

const Homepage = () => {
  // product context
  const { products } = useSelector(productSelect);
  // auth context
  const { users } = useSelector(usersSelect);
  // order context
  const { orders } = useSelector(orderSelect);

  // calculate customers count from users auth context
  const customersCount = useMemo(() => {
    return users?.filter((user) => user.meta.role === "customer").length;
  }, [users]);

  // calculate total revenue count
  const totalRevenu = useMemo(() => {
    let totalSalesAmount = 0;
    orders.forEach((order) => {
      if (
        order.order_status === "completed" ||
        order.order_status === "processing"
      ) {
        totalSalesAmount += order.order_total;
      }
    });

    return totalSalesAmount;
  }, [orders]);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <div className="page-body">
        <div className="container-fluid">
          <div className="row">
            {/* chart caard section start */}
            <div className="col-sm-6 col-xxl-3 col-lg-6">
              <div className="main-tiles border-5 border-0  card-hover card o-hidden">
                <div className="custome-1-bg b-r-4 card-body">
                  <div className="media align-items-center static-top-widget">
                    <div className="media-body p-0">
                      <span className="m-0">Total Revenue</span>
                      <h4 className="mb-0 counter">
                        ${totalRevenu}
                        <span className="badge badge-light-primary grow">
                          <IoIosTrendingUp />
                          8.5%
                        </span>
                      </h4>
                    </div>
                    <div className="align-self-center text-center">
                      <RiDatabase2Line fill="#0da487" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xxl-3 col-lg-6">
              <div className="main-tiles border-5 card-hover border-0 card o-hidden">
                <div className="custome-2-bg b-r-4 card-body">
                  <div className="media static-top-widget">
                    <div className="media-body p-0">
                      <span className="m-0">Total Orders</span>
                      <h4 className="mb-0 counter">
                        {orders?.length}
                        <span className="badge badge-light-danger grow">
                          <IoIosTrendingDown />
                          8.5%
                        </span>
                      </h4>
                    </div>
                    <Link
                      to="/orders"
                      className="align-self-center text-center"
                    >
                      <RiShoppingBag3Line fill="#747dc6" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xxl-3 col-lg-6">
              <div className="main-tiles border-5 card-hover border-0  card o-hidden">
                <div className="custome-3-bg b-r-4 card-body">
                  <div className="media static-top-widget">
                    <div className="media-body p-0">
                      <span className="m-0">Total Products</span>
                      <h4 className="mb-0 counter">
                        {products?.length}
                        <Link
                          to="/add-new-product"
                          className="badge badge-light-secondary grow"
                        >
                          ADD NEW
                        </Link>
                      </h4>
                    </div>
                    <div className="align-self-center text-center">
                      <Link to="/products">
                        <RiChat3Line fill="#ef3f3e" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xxl-3 col-lg-6">
              <div className="main-tiles border-5 card-hover border-0 card o-hidden">
                <div className="custome-4-bg b-r-4 card-body">
                  <div className="media static-top-widget">
                    <div className="media-body p-0">
                      <span className="m-0">Total Customers</span>
                      <h4 className="mb-0 counter">
                        {customersCount}
                        <span className="badge badge-light-success grow">
                          <IoMdTrendingDown />
                          8.5%
                        </span>
                      </h4>
                    </div>
                    <div className="align-self-center text-center">
                      <Link to="/add-new-user">
                        <RiUserAddLine fill="#9e65c2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* chart card section End */}
            {/* Earning chart star*/}
            {/* <div className="col-xl-6">
            <div className="card o-hidden card-hover">
              <div className="card-header border-0 pb-1">
                <div className="card-header-title">
                  <h4>Revenue Report</h4>
                </div>
              </div>
              <div className="card-body p-0">
                <div id="report-chart" />
              </div>
            </div>
          </div> */}
            {/* Earning chart  end*/}
            {/* Best Selling Product Start */}
            <div className="col-xl-6 col-md-12">
              <div className="card o-hidden card-hover">
                <div className="card-header card-header-top card-header--2 px-0 pt-0">
                  <div className="card-header-title">
                    <h4>Best Selling Products</h4>
                  </div>
                  <div className="best-selling-box d-sm-flex d-none">
                    <span>Sort By:</span>
                    <div className="dropdown">
                      <button
                        className="btn p-0 dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="true"
                      >
                        Today
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div>
                    <div className="table-responsive">
                      <table
                        className="best-selling-table w-image
                                      w-image
                                      w-image table border-0"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <div className="best-product-box">
                                <div className="product-image">
                                  <img
                                    src="assets/images/product/1.png"
                                    className="img-fluid"
                                    alt="Product"
                                  />
                                </div>
                                <div className="product-name">
                                  <h5>Aata Buscuit</h5>
                                  <h6>26-08-2022</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="product-detail-box">
                                <h6>Price</h6>
                                <h5>$29.00</h5>
                              </div>
                            </td>
                            <td>
                              <div className="product-detail-box">
                                <h6>Orders</h6>
                                <h5>62</h5>
                              </div>
                            </td>
                            <td>
                              <div className="product-detail-box">
                                <h6>Stock</h6>
                                <h5>510</h5>
                              </div>
                            </td>
                            <td>
                              <div className="product-detail-box">
                                <h6>Amount</h6>
                                <h5>$1,798</h5>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="best-product-box">
                                <div className="product-image">
                                  <img
                                    src="assets/images/product/2.png"
                                    className="img-fluid"
                                    alt="Product"
                                  />
                                </div>
                                <div className="product-name">
                                  <h5>Aata Buscuit</h5>
                                  <h6>26-08-2022</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="product-detail-box">
                                <h6>Price</h6>
                                <h5>$29.00</h5>
                              </div>
                            </td>
                            <td>
                              <div className="product-detail-box">
                                <h6>Orders</h6>
                                <h5>62</h5>
                              </div>
                            </td>
                            <td>
                              <div className="product-detail-box">
                                <h6>Stock</h6>
                                <h5>510</h5>
                              </div>
                            </td>
                            <td>
                              <div className="product-detail-box">
                                <h6>Amount</h6>
                                <h5>$1,798</h5>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="best-product-box">
                                <div className="product-image">
                                  <img
                                    src="assets/images/product/3.png"
                                    className="img-fluid"
                                    alt="Product"
                                  />
                                </div>
                                <div className="product-name">
                                  <h5>Aata Buscuit</h5>
                                  <h6>26-08-2022</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="product-detail-box">
                                <h6>Price</h6>
                                <h5>$29.00</h5>
                              </div>
                            </td>
                            <td>
                              <div className="product-detail-box">
                                <h6>Orders</h6>
                                <h5>62</h5>
                              </div>
                            </td>
                            <td>
                              <div className="product-detail-box">
                                <h6>Stock</h6>
                                <h5>510</h5>
                              </div>
                            </td>
                            <td>
                              <div className="product-detail-box">
                                <h6>Amount</h6>
                                <h5>$1,798</h5>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Best Selling Product End */}
            {/* Recent orders start*/}
            <div className="col-xl-6">
              <div className="card o-hidden card-hover">
                <div className="card-header card-header-top card-header--2 px-0 pt-0">
                  <div className="card-header-title">
                    <h4>Recent Orders</h4>
                  </div>
                  <div className="best-selling-box d-sm-flex d-none">
                    <span>Sort By:</span>

                    <div className="dropdown">
                      <button
                        className="btn p-0 dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton2"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="true"
                      >
                        Today
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton2"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div>
                    <div className="table-responsive recent-order-table-wrapper">
                      <table className="best-selling-table table border-0">
                        <tbody>
                          {orders?.length > 0 &&
                            orders?.map((order) => (
                              <tr key={order?.id}>
                                <td>
                                  <div className="product-detail-box">
                                    <div className="product-name">
                                      <h6>Order ID</h6>
                                      <h5>#{order?.id}</h5>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="product-detail-box">
                                    <h6>Date Placed</h6>
                                    <h5>
                                      {getDateFromTimestamps(order?.createdAt)}
                                    </h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="product-detail-box">
                                    <h6>Price</h6>
                                    <h5>${order?.order_total}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="product-detail-box">
                                    <h6>Order Status</h6>
                                    <h5 className="text-capitalize">
                                      {order?.order_status}
                                    </h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="product-detail-box">
                                    <h6>Payment</h6>
                                    <h5
                                      className={`${
                                        order?.payment_status === "paid"
                                          ? "text-success"
                                          : "text-danger"
                                      }`}
                                    >
                                      {order?.payment_status}
                                    </h5>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Recent orders end*/}
            {/* Earning chart star*/}
            {/* <div className="col-xl-6">
            <div className="card o-hidden card-hover">
              <div className="card-header border-0 mb-0">
                <div className="card-header-title">
                  <h4>Earning</h4>
                </div>
              </div>
              <div className="card-body p-0">
                <div id="bar-chart-earning" />
              </div>
            </div>
          </div> */}
            {/* Earning chart end*/}
            {/* Transactions start*/}
            <div className="col-xxl-4 col-md-6">
              <div className="card o-hidden card-hover">
                <div className="card-header border-0">
                  <div className="card-header-title">
                    <h4>Transactions</h4>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div>
                    <div className="table-responsive">
                      <table className="user-table transactions-table table border-0">
                        <tbody>
                          <tr>
                            <td>
                              <div className="transactions-icon">
                                <RiShieldLine size={20} />
                              </div>
                              <div className="transactions-name">
                                <h6>Wallets</h6>
                                <p>Starbucks</p>
                              </div>
                            </td>
                            <td className="lost">-$74</td>
                          </tr>
                          <tr>
                            <td className="td-color-1">
                              <div className="transactions-icon">
                                <RiCheckLine size={20} />
                              </div>
                              <div className="transactions-name">
                                <h6>Bank Transfer</h6>
                                <p>Add Money</p>
                              </div>
                            </td>
                            <td className="success">+$125</td>
                          </tr>
                          <tr>
                            <td className="td-color-2">
                              <div className="transactions-icon">
                                <RiExchangeDollarLine size={20} />
                              </div>
                              <div className="transactions-name">
                                <h6>Paypal</h6>
                                <p>Add Money</p>
                              </div>
                            </td>
                            <td className="lost">-$50</td>
                          </tr>
                          <tr>
                            <td className="td-color-3">
                              <div className="transactions-icon">
                                <RiBankCardLine size={20} />
                              </div>
                              <div className="transactions-name">
                                <h6>Mastercard</h6>
                                <p>Ordered Food</p>
                              </div>
                            </td>
                            <td className="lost">-$40</td>
                          </tr>
                          <tr>
                            <td className="td-color-4 pb-0">
                              <div className="transactions-icon">
                                <RiBarChartGroupedLine size={20} />
                              </div>
                              <div className="transactions-name">
                                <h6>Transfer</h6>
                                <p>Refund</p>
                              </div>
                            </td>
                            <td className="success pb-0">+$90</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Transactions end*/}
            {/* visitors chart start*/}
            {/* <div className="col-xxl-4 col-md-6">
            <div className="h-100">
              <div className="card o-hidden card-hover">
                <div className="card-header border-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="card-header-title">
                      <h4>Visitors</h4>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div className="pie-chart">
                    <div id="pie-chart-visitors" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
            {/* visitors chart end*/}
            {/* To Do List start*/}
            {/* <div className="col-xxl-4 col-md-6">
            <div className="card o-hidden card-hover">
              <div className="card-header border-0">
                <div className="card-header-title">
                  <h4>To Do List</h4>
                </div>
              </div>
              <div className="card-body pt-0">
                <ul className="to-do-list">
                  <li className="to-do-item">
                    <div className="form-check user-checkbox">
                      <input
                        className="checkbox_animated check-it"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefault"
                      />
                    </div>
                    <div className="to-do-list-name">
                      <strong>Pick up kids from school</strong>
                      <p>8 Hours</p>
                    </div>
                  </li>
                  <li className="to-do-item">
                    <div className="form-check user-checkbox">
                      <input
                        className="checkbox_animated check-it"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefault1"
                      />
                    </div>
                    <div className="to-do-list-name">
                      <strong>Prepare or presentation.</strong>
                      <p>8 Hours</p>
                    </div>
                  </li>
                  <li className="to-do-item">
                    <div className="form-check user-checkbox">
                      <input
                        className="checkbox_animated check-it"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefault2"
                      />
                    </div>
                    <div className="to-do-list-name">
                      <strong>Create invoice</strong>
                      <p>8 Hours</p>
                    </div>
                  </li>
                  <li className="to-do-item">
                    <div className="form-check user-checkbox">
                      <input
                        className="checkbox_animated check-it"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefault3"
                      />
                    </div>
                    <div className="to-do-list-name">
                      <strong>Meeting with Alisa</strong>
                      <p>8 Hours</p>
                    </div>
                  </li>
                  <li className="to-do-item">
                    <form className="row g-2">
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Enter Task Name"
                        />
                      </div>
                      <div className="col-4">
                        <button
                          type="submit"
                          className="btn btn-primary w-100 h-100"
                        >
                          Add task
                        </button>
                      </div>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
            {/* To Do List end*/}
          </div>
        </div>
        {/* Container-fluid Ends*/}
      </div>
    </>
  );
};

export default Homepage;
