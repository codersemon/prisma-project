// dependencies
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSingleOrderById } from "../../feature/orderAPISlice";
import { orderSelect } from "../../feature/orderSlice";
import { getDateFromTimestamps } from "../../helpers/helpers";
import "./OrderList.css";

const OrdersList = () => {
  // order context
  const { orders } = useSelector(orderSelect);

  /**
   * react-redux dispatch hook init
   */
  const dispatch = useDispatch();

  const columns = [
    {
      name: "Order ID",
      selector: (row) => `#${row?.id}`,
      maxWidth: "50px",
    },
    {
      name: "Customer Name",
      selector: (row) => row?.user?.user?.email,
    },
    {
      name: "Date",
      selector: (row) => row?.createdAt,
      cell: (row) => getDateFromTimestamps(row?.createdAt),
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => `$${row?.order_total}`,
      sortable: true,
    },
    {
      name: "Order Status",
      selector: (row) => row?.order_status,
      cell: (row) => <span className={`order-status-btn order-${row?.order_status}`}>{row?.order_status}</span>
    },
    {
      name: "Options",
      cell: (row) => (
        <ul className="actions d-flex">
          <li>
            <Link
              to={`/edit-order/${row?.id}`}
              className="d-block border-0 bg-transparent p-1 mx-1"
            >
              <RiPencilLine fill="#4aa4d9" />
            </Link>
          </li>
          <li>
            <button
              className="border-0 bg-transparent p-1 mx-1"
              onClick={() => handleDeleteSingleOrder(row?.id)}
            >
              <RiDeleteBinLine fill="#ef3f3e" />
            </button>
          </li>
          {row?.order_status === "processing" && (
            <Link className="btn btn-sm px-2 py-1 bg-primary mx-1">
              Tracking
            </Link>
          )}
        </ul>
      ),
    },
  ];

  /**
   * filtered orders state
   */
  const [filteredOrders, setFilteredOrders] = useState([]);

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

  /**
   * handle single delete order
   */
  const handleDeleteSingleOrder = (id) => {
    dispatch(deleteSingleOrderById(id));
  };

  return (
    <>
      <div className="page-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  <div className="title-header option-title d-sm-flex d-block">
                    <h5>Orders List</h5>
                    <div className="right-options">
                      <ul>
                        <li>
                          <a href="">import</a>
                        </li>
                        <li>
                          <a href="">Export</a>
                        </li>
                        <li>
                          <Link className="btn btn-solid" to="/create-order">
                            Create Order
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="table-responsive">
                      {orders?.length > 0 && (
                        <div className="top-filter-bar d-flex justify-content-between mb-3">
                          <select
                            name="status"
                            className="form-select"
                            onChange={handleOrderStatusFilter}
                          >
                            <option value="no-status">Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                            <option value="refunded">Refunded</option>
                          </select>

                          <div className="filter-box">
                            <input
                              type="text"
                              placeholder="Search"
                              id="searchInput"
                              style={{
                                marginBottom: "10px",
                                padding: "8px",
                                width: "100%",
                              }}
                            />
                          </div>
                        </div>
                      )}

                      <DataTable
                        columns={columns}
                        data={filteredOrders}
                        className="custom-datatable"
                        pagination
                      />
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

export default OrdersList;
