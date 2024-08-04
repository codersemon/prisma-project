// dependencies
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { RiDeleteBinLine, RiEyeLine, RiPencilLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteProduct } from "../../feature/productAPISlice";
import { productSelect, setProductsStateMessageEmpty } from "../../feature/productSlice";
import { Helmet } from "react-helmet";

const ProductList = () => {
  /**
   * react-redux dispatch hook init
   */
  const dispatch = useDispatch();
  // product context
  const { products, status } = useSelector(productSelect);

  // Table column
  const columns = [
    {
      name: "ID",
      selector: (row) => row?.id,
      maxWidth: "50px"
    },
    {
      name: "Product Image",
      selector: (row) => row?.thumbnail,
      cell: (row) => (
        <img
          src={row?.thumbnail?.url}
          style={{ width: "70px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) =>
        row?.categories?.map((item) => item?.category?.name).join(", "),
    },
    {
      name: "Current Qty",
      selector: (row) =>
        row?.stock_status == "in_stock"
          ? row?.stock_quantity
          : row?.stock_status,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row?.sale_price,
      cell: (row) =>
        row?.sale_price ? (
          <>
            <strike>${row?.regular_price}</strike>{" "}
            <b className="ms-1">${row?.sale_price}</b>
          </>
        ) : (
          row?.regular_price
        ),
      sortable: true,
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
            <Link
              to={`http://localhost:3000/product/${row?.slug}`}
              target="_blank"
              className="p-1 d-block mx-1"
            >
              <RiEyeLine fill="#747dc6" />
            </Link>
          </li>
          <li>
            <Link
              to={`/edit-product/${row?.slug}`}
              className="d-block border-0 bg-transparent p-1 mx-1"
            >
              <RiPencilLine fill="#4aa4d9" />
            </Link>
          </li>
          <li>
            <button
              className="border-0 bg-transparent p-1 mx-1"
              onClick={() => handleProductDelete(row?.id)}
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
    setFilteredData(products);
  }, [products]);

  // Table search Handler
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    const filtered = products?.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.sale_price.toString().includes(query) ||
        item.status.toString().includes(query) ||
        item.regular_price.toString().includes(query)
    );

    setFilteredData(filtered);
  };

  // Handle product status filter
  const handleStatusFilter = (e) => {
    // get status from select tag
    const status = e.target.value.toLowerCase();

    // filter all products by status
    const filteredByStatus = products?.filter((item) =>
      item.status.toString().includes(status)
    );

    if (status == "no-status") {
      // if no-status then show all products
      setFilteredData(products);
    } else {
      // if status selected then show filtered products
      setFilteredData(filteredByStatus);
    }
  };

  // product delete handler
  const handleProductDelete = (id) => {
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
        dispatch(deleteProduct(id));
      }
    });
  };

  useEffect(() => {
    // show success message
    if (status == "ok") {
      Swal.fire({
        title: "Deleted!",
        text: "Product has been deleted.",
        icon: "success",
      });

      // set product message, error, status empty
      dispatch(setProductsStateMessageEmpty())
    }
  }, [status, dispatch])

  return (
    <>
    <Helmet>
      <title>Products List</title>
    </Helmet>
    <div className="page-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="title-header option-title d-sm-flex d-block">
                  <h5>Products List</h5>
                  <div className="right-options">
                    <ul>
                      <li>
                        <a href="">import</a>
                      </li>
                      <li>
                        <a href="">Export</a>
                      </li>
                      <li>
                        <Link className="btn btn-solid" to="/add-new-product">
                          Add Product
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="table-responsive">
                    {products?.length > 0 && <div className="top-filter-bar d-flex justify-content-between mb-3">
                      <select
                        name="status"
                        className="form-select"
                        onChange={handleStatusFilter}
                      >
                        <option value="no-status">Select Status</option>
                        <option value="publish">Publish</option>
                        <option value="draft">Draft</option>
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
                    </div>}
                    
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
    </>
  );
};

export default ProductList;
