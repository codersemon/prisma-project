// dependencies
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Helmet } from "react-helmet";
import { RiDeleteBinLine, RiEyeLine, RiPencilLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import defaultUserImg from "../../assets/img/default-profile.png";
import { deleteSingleUserAccount } from "../../feature/userAPISlice";
import {
  setUsersStateMessageEmpty,
  usersSelect,
} from "../../feature/userSlice";
import { Toast } from "../../utils/sweetAlert";

const UsersList = () => {
  /**
   * react-redux dispatch hook init
   */
  const dispatch = useDispatch();

  // product context
  const { users, status, message, error } = useSelector(usersSelect);

  // User Table Columns
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Photo",
      selector: (row) => row?.meta?.photo,
      cell: (row) =>
        row?.meta?.photo ? (
          <img
            src={row?.meta?.photo}
            style={{ width: "70px", height: "50px", objectFit: "cover" }}
          />
        ) : (
          <img
            src={defaultUserImg}
            style={{ width: "60px", height: "50px", objectFit: "cover" }}
          />
        ),
    },
    {
      name: "Name",
      selector: (row) => row?.meta?.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row?.meta?.role,
      sortable: true,
    },
    {
      name: "Verified",
      selector: (row) => row?.meta?.isVerified,
      cell: (row) =>
        row?.meta?.isVerified ? (
          <span className="theme-color">✓</span>
        ) : (
          <span className="text-danger">✕</span>
        ),
    },
    {
      name: "Options",
      cell: (row) => (
        <ul className="actions d-flex">
          <li>
            <a href="order-detail.html" className="p-1 mx-1 d-block">
              <RiEyeLine fill="#747dc6" />
            </a>
          </li>
          <li>
            <Link to={`/user-edit/${row?.id}`} className="p-1 mx-1 d-block">
              <RiPencilLine fill="#4aa4d9" />
            </Link>
          </li>
          <li>
            <button
              className="border-0 bg-transparent p-1 mx-1"
              onClick={() => handerSingleUserAccountDelete(row?.id)}
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
    setFilteredData(users);
  }, [users]);

  // Table search Handler
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    const filtered = users.filter(
      (item) =>
        item.email.toLowerCase().includes(query) ||
        item.meta?.name?.toString().includes(query) ||
        item.meta?.phone?.toString().includes(query)
    );

    setFilteredData(filtered);
  };

  // Handle user role filter
  const handleRoleFilter = (e) => {
    // get status from select tag
    const role = e.target.value.toLowerCase();

    // filter all products by status
    const filteredByStatus = users?.filter((item) =>
      item.meta.role.toString().includes(role)
    );

    if (role == "default") {
      // if no-status then show all products
      setFilteredData(users);
    } else {
      // if status selected then show filtered products
      setFilteredData(filteredByStatus);
    }
  };

  /**
   * single user delete handler
   */
  const handerSingleUserAccountDelete = (id) => {
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
        dispatch(deleteSingleUserAccount(id));
      }
    });
  };

  useEffect(() => {
    // show delete success message
    if (status == "ok") {
      Swal.fire({
        title: "Deleted!",
        text: "User account has been deleted.",
        icon: "success",
      });

      // set reviews message, error, status empty
      dispatch(setUsersStateMessageEmpty());
    }

    // show edit success message
    if (status == "success") {
      Toast.fire({ title: message, icon: "success" });

      // set product message, error, status empty
      dispatch(setUsersStateMessageEmpty());
    }

    // show edit error message
    if (error) {
      Toast.fire({ title: error, icon: "error" });

      // set product message, error, status empty
      dispatch(setUsersStateMessageEmpty());
    }
  }, [status, dispatch, message, error]);

  return (
    <>
      <Helmet>
        <title>Users List</title>
      </Helmet>

      <div className="page-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  <div className="title-header option-title d-sm-flex d-block">
                    <h5>Users List</h5>
                    <div className="right-options">
                      <ul>
                        <li>
                          <a href="">import</a>
                        </li>
                        <li>
                          <a href=")">Export</a>
                        </li>
                        <li>
                          <Link className="btn btn-solid" to="/add-new-user">
                            Add New User
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="table-responsive">
                      <div className="top-filter-bar d-flex justify-content-between mb-3">
                        <select
                          name="status"
                          className="form-select"
                          onChange={handleRoleFilter}
                        >
                          <option value="default">Select Role</option>
                          <option value="administrator">Administrator</option>
                          <option value="customer">Customer</option>
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

export default UsersList;
