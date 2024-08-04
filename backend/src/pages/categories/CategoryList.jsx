// dependencies
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Helmet } from "react-helmet";
import { RiDeleteBinLine, RiEyeLine, RiPencilLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteSingleProductCategory } from "../../feature/productAPISlice";
import {
  productSelect,
  setProductsStateMessageEmpty,
} from "../../feature/productSlice";
import { Toast } from "../../utils/sweetAlert";

const CategoryList = () => {
  // product context
  const { categories, status, message, error } = useSelector(productSelect);

  // react-redux useDispatch hook init
  const dispatch = useDispatch();

  // Table column
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      maxWidth: "50px"
    },
    {
      name: "Photo",
      selector: (row) => row?.photo?.url,
      cell: (row) =>
        row.photo ? (
          <img
            src={row?.photo?.url}
            alt="category"
            style={{ width: "70px", height: "50px", objectFit: "cover" }}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
    },
    {
      name: "Product Count",
      selector: (row) => row._count?.products,
      sortable: true,
    },
    {
      name: "Options",
      cell: (row) => (
        <ul className="actions d-flex justify-content-start">
          <li>
            <button className="border-0 bg-transparent">
              <RiEyeLine fill="#747dc6" />
            </button>
          </li>
          <li>
            <Link
              to={`/category-edit/${row?.slug}`}
              className="border-0 bg-transparent"
            >
              <RiPencilLine fill="#4aa4d9" />
            </Link>
          </li>
          <li>
            <button
              className="border-0 bg-transparent"
              onClick={() =>
                handleSingleCategoryDelete(row?.id, row?._count?.products)
              }
            >
              <RiDeleteBinLine fill="#ef3f3e" />
            </button>
          </li>
        </ul>
      ),
    },
  ];

  // table search stat
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // update filteredData state to show in table when categories are availabe
  useEffect(() => {
    setFilteredData(categories);
  }, [categories]);

  // Table search Handler
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    const filtered = categories.filter(
      (item) =>
        item.id.toString().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.slug.toLowerCase().includes(query) ||
        item._count?.products.toString().includes(query)
    );

    setFilteredData(filtered);
  };

  // handle category delete event
  const handleSingleCategoryDelete = (id, productCount) => {
    // if any product exist under deleteable category, then will take confirmation before delete. but for empty category will not ask for confirmation.
    if (productCount > 0) {
      Swal.fire({
        title: "Are you sure?",
        text: `Have ${productCount} product under this catgory`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0da487",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteSingleProductCategory(id));
        }
      });
    } else {
      dispatch(deleteSingleProductCategory(id));
    }
  };

  /**
   * Effect Handler For Showing Message
   */
  useEffect(() => {
    if (status === "success") {
      if (message) {
        // show success message
        Toast.fire({ title: message, icon: "success" });
        // set state error, message, status empty
        dispatch(setProductsStateMessageEmpty());
      }
    }

    if (error) {
      // show error message
      Toast.fire({ title: error, icon: "error" });

      // set state error, message, status empty
      dispatch(setProductsStateMessageEmpty());
    }
  }, [dispatch, status, error, message]);

  return (
    <>
      <Helmet>
        <title>Category List</title>
      </Helmet>

      <div className="page-body">
        {/* All User Table Start */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  <div className="title-header option-title d-sm-flex d-block">
                    <h5>Category List</h5>
                    <div className="right-options">
                      <ul>
                        <li>
                          <a href="">import</a>
                        </li>
                        <li>
                          <a href=")">Export</a>
                        </li>
                        <li>
                          <Link
                            className="btn btn-solid"
                            to="/add-new-category"
                          >
                            Add Category
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="table-responsive category-table">
                    {categories?.length > 0 && (
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
        {/* All User Table Ends*/}
      </div>
    </>
  );
};

export default CategoryList;
