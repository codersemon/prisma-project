// dependencies
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { authSelect } from "../../features/authSlice";
import { orderSelect } from "../../features/orderSlice";
import { useMemo } from "react";

const Dashboard = () => {
  // auth context
  const { user } = useSelector(authSelect);

  /**
   * order context
   */
  const {orders} = useSelector(orderSelect);

  /**
   * total pending order calculation variable
   */
  const totalPendingOrder = useMemo(() => {
    let pendingOrders = orders?.filter(order => order.order_status === "pending");
    return pendingOrders?.length;
  }, [orders])

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="dashboard-home">
        <div className="title">
          <h2>My Account</h2>
          <span className="title-leaf">
            <svg className="icon-width bg-gray">
              <use xlinkHref="/assets/svg/leaf.svg#leaf" />
            </svg>
          </span>
        </div>
        <div className="dashboard-user-name">
          <h6 className="text-content">
            Hello, <b className="text-title">{user?.meta?.name}</b>
          </h6>
          <p className="text-content">
            From your My Account page you have the ability to view a snapshot of
            your recent account activity and update your account information.
            Select a link below to view or edit information.
          </p>
        </div>
        <div className="total-box">
          <div className="row g-sm-4 g-3">
            <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
              <div className="totle-contain">
                <img
                  src="/assets/images/svg/order.svg"
                  className="img-1 blur-up lazyload gray-filter"
                  alt=""
                />
                <img
                  src="/assets/images/svg/order.svg"
                  className="blur-up lazyload"
                  alt=""
                />
                <div className="totle-detail">
                  <h5>Total Order</h5>
                  <h3>{orders?.length}</h3>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
              <div className="totle-contain">
                <img
                  src="/assets/images/svg/pending.svg"
                  className="img-1 blur-up lazyload gray-filter"
                  alt=""
                />
                <img
                  src="/assets/images/svg/pending.svg"
                  className="blur-up lazyload"
                  alt=""
                />
                <div className="totle-detail">
                  <h5>Total Pending Order</h5>
                  <h3>{totalPendingOrder}</h3>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
              <div className="totle-contain">
                <img
                  src="/assets/images/svg/wishlist.svg"
                  className="img-1 blur-up lazyload gray-filter"
                  alt=""
                />
                <img
                  src="/assets/images/svg/wishlist.svg"
                  className="blur-up lazyload"
                  alt=""
                />
                <div className="totle-detail">
                  <h5>Total Wishlist</h5>
                  <h3>32158</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-title">
          <h3>Account Information</h3>
        </div>
        <div className="row g-4">
          <div className="col-12">
            <div className="dashboard-contant-title">
              <h4>
                Contact Information
              </h4>
            </div>
            <div className="dashboard-detail">
              <h6 className="text-content">Name: {user?.meta?.name}</h6>
              <h6 className="text-content">Email: {user?.email}</h6>
              <h6 className="text-content">Phone: {user?.meta?.phone}</h6>
            </div>
          </div>
          
          <div className="col-12">
            <div className="dashboard-contant-title">
              <h4>
                Address Book
              </h4>
            </div>
            <div className="row g-4">
              <div className="col-xxl-6">
                <div className="dashboard-detail">
                  <h6 className="text-content">Default Billing Address</h6>
                  <h6 className="text-content">
                    You have not set a default billing address.
                  </h6>
                  <a
                    href="javascript:void(0)"
                    data-bs-toggle="modal"
                    data-bs-target="#editProfile"
                  >
                    Edit Billing Address
                  </a>
                </div>
              </div>
              <div className="col-xxl-6">
                <div className="dashboard-detail">
                  <h6 className="text-content">Default Shipping Address</h6>
                  <h6 className="text-content">
                    You have not set a default shipping address.
                  </h6>
                  <a
                    href="javascript:void(0)"
                    data-bs-toggle="modal"
                    data-bs-target="#editProfile"
                  >
                    Edit Shipping Address
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
