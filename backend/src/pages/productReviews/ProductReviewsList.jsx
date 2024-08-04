import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Helmet } from "react-helmet";
import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ModalLayout from "../../components/common/ModalLayout";
import RatingFiveStar from "../../components/common/RatingStar";
import ProductReviewEditModalContent from "../../components/modalContent/ProductReviewEditModalContent";
import {
  deleteSingleProductReview,
  getAllProductReviews,
} from "../../feature/productReviewAPISlice";
import {
  productReviewsSelect,
  setProductReviewsStateMessageErrorStatusEmpty,
} from "../../feature/productReviewSlice";
import { Toast } from "../../utils/sweetAlert";

const ProductReviewsList = () => {
  /**
   * react-redux dispatch hook init
   */
  const dispatch = useDispatch();

  /**
   * reviews context
   */
  const { reviews, status, message, error } = useSelector(productReviewsSelect);

  /**
   * fetch reviews handle
   */
  useEffect(() => {
    dispatch(getAllProductReviews());
  }, [dispatch]);

  /**
   * review edit modal state
   */
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  /**
   * editable review id state
   */
  const [editableReviewId, setEditableReviewId] = useState(0);

  /**
   * handle edit modal open
   */
  const handleEditModalOpen = (reviewId) => {
    setEditableReviewId(reviewId);
    setIsEditModalOpen(true);
  };

  /**
   * Table columns
   */
  const columns = [
    {
      name: "ID",
      selector: (row) => row?.id,
      maxWidth: "50px",
      sortable: true
    },
    {
      name: "Customer Name",
      selector: (row) => row?.user?.name,
    },
    {
      name: "Product Name",
      selector: (row) => row?.product?.name,
      sortable: true,
    },
    {
      name: "Rating",
      selector: (row) => row?.rating,
      cell: (row) => (
        <div className="product-detail">
          <ul className="rating">
            <RatingFiveStar fillStarCount={row?.rating} />
          </ul>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Comment",
      selector: (row) => row?.comment,
    },

    {
      name: "Status",
      selector: (row) => row?.status,
      cell: (row) => (
        <p className={`status-btn status-${row?.status}`}>
          <span>{row?.status}</span>
        </p>
      ),
      sortable: true,
    },
    {
      name: "Options",
      cell: (row) => (
        <ul className="actions d-flex">
          <li>
            <button
              className="d-block border-0 bg-transparent p-1 mx-1"
              onClick={() => handleEditModalOpen(row?.id)}
            >
              <RiPencilLine fill="#4aa4d9" />
            </button>
          </li>
          <li>
            <button
              className="border-0 bg-transparent p-1 mx-1"
              onClick={() => handleSingleProductReviewDelete(row?.id)}
            >
              <RiDeleteBinLine fill="#ef3f3e" />
            </button>
          </li>
        </ul>
      ),
    },
  ];

  // table search state
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // update filteredData state to show in table when categories are availabe
  useEffect(() => {
    setFilteredData(reviews);
  }, [reviews]);

  // Table search Handler
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    const filtered = reviews?.filter(
      (item) =>
        item.user.name.toLowerCase().includes(query) ||
        item.comment.toString().includes(query) ||
        item.product.name.toLowerCase().toString().includes(query)
    );

    setFilteredData(filtered);
  };

  // Handle product status filter
  const handleStatusFilter = (e) => {
    // get status from select tag
    const status = e.target.value.toLowerCase();

    // filter all products by status
    const filteredByStatus = reviews?.filter((item) =>
      item.status.toString().includes(status)
    );

    if (status == "no-status") {
      // if no-status then show all products
      setFilteredData(reviews);
    } else {
      // if status selected then show filtered products
      setFilteredData(filteredByStatus);
    }
  };

  // product delete handler
  const handleSingleProductReviewDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0da487",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // invoke delete action handler
        dispatch(deleteSingleProductReview(id));
      }
    });
  };

  useEffect(() => {
    // show delete success message
    if (status == "ok") {
      Swal.fire({
        title: "Deleted!",
        text: "Review has been deleted.",
        icon: "success",
      });

      // set reviews message, error, status empty
      dispatch(setProductReviewsStateMessageErrorStatusEmpty());
    }

    // show edit success message
    if (status == "success") {
      Toast.fire({ title: message, icon: "success" });

      // set product message, error, status empty
      dispatch(setProductReviewsStateMessageErrorStatusEmpty());

      // close edit modal
      setIsEditModalOpen(false);
    }

    // show edit error message
    if (error) {
      Toast.fire({ title: error, icon: "error" });

      // set product message, error, status empty
      dispatch(setProductReviewsStateMessageErrorStatusEmpty());
    }
  }, [status, dispatch, message, error]);

  return (
    <>
      <Helmet>
        <title>Product Reviews List</title>
      </Helmet>

      <div className="page-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  <div className="title-header option-title d-sm-flex d-block">
                    <h5>Product Reviews List</h5>
                    <div className="right-options">
                      <ul>
                        <li>
                          <a href="">import</a>
                        </li>
                        <li>
                          <a href="">Export</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="table-responsive">
                      {reviews?.length > 0 && (
                        <div className="top-filter-bar d-flex justify-content-between mb-3">
                          <select
                            name="status"
                            className="form-select"
                            onChange={handleStatusFilter}
                          >
                            <option value="no-status">Select Status</option>
                            <option value="published">Published</option>
                            <option value="pending">Pending</option>
                            <option value="trash">Trash</option>
                          </select>
                          <div className="filter-box">
                            <input
                              type="text"
                              placeholder="Search"
                              id="searchInput"
                              value={search}
                              onChange={handleSearch}
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
                        data={filteredData}
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

      {/* Review edit modal  */}
      <ModalLayout
        showModal={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
        title="Edit product review"
        className="theme-modal location-modal"
      >
        <ProductReviewEditModalContent editableReviewId={editableReviewId} />
      </ModalLayout>
    </>
  );
};

export default ProductReviewsList;
