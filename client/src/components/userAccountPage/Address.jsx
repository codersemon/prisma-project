import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { authSelect } from "../../features/authSlice";
import ModalLayout from "../common/ModalLayout";
import AddAddressModalContent from "../modalContents/AddAddressModalContent";

const Address = () => {
  /**
   * Auth context
   */
  const { user } = useSelector(authSelect);

  // calculated address state
  const addresses = user?.meta?.addresses ? user?.meta?.addresses : [];

  /**
   * State for address adding modal open/close
   */
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Address</title>
      </Helmet>
      <div className="dashboard-address">
        <div className="title title-flex">
          <div>
            <h2>My Address Book</h2>
            <span className="title-leaf">
              <svg className="icon-width bg-gray">
                <use xlinkHref="../assets/svg/leaf.svg#leaf" />
              </svg>
            </span>
          </div>
          <button
            className="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3"
            onClick={() => setIsAddAddressModalOpen(true)}
          >
            <FeatherIcon icon="plus" className="me-2" /> Add New Address
          </button>
        </div>
        <div className="row g-sm-4 g-3">
          {addresses.length > 0 &&
            addresses?.map((address) => (
              <div
                key={address?.id}
                className="col-xxl-4 col-xl-6 col-lg-12 col-md-6"
              >
                <div className="address-box">
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="jack"
                        id="flexRadioDefault2"
                        defaultChecked=""
                      />
                    </div>
                    <div className="label">
                      <label className="text-capitalize">{address?.type}</label>
                    </div>
                    <div className="table-responsive address-table">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td colSpan={2}>{address?.full_name}</td>
                          </tr>
                          <tr>
                            <td>Address :</td>
                            <td>
                              <p>
                                {address?.street_address},{" "}
                                {address?.street_address_2
                                  ? `${address?.street_address_2},`
                                  : ""}
                                {address?.district}, {address?.country}
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>Zip Code :</td>
                            <td>{address?.zip_code}</td>
                          </tr>
                          <tr>
                            <td>Phone :</td>
                            <td>{address?.phone}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="button-group">
                    <button
                      className="btn btn-sm add-button w-100"
                      data-bs-toggle="modal"
                      data-bs-target="#editProfile"
                    >
                      <i data-feather="edit" />
                      Edit
                    </button>
                    <button
                      className="btn btn-sm add-button w-100"
                      data-bs-toggle="modal"
                      data-bs-target="#removeProfile"
                    >
                      <i data-feather="trash-2" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {addresses.length === 0 && (
            <h3 className="text-center">No address found 😶</h3>
          )}
        </div>
      </div>

      {/* Add Address Modal  */}
      <ModalLayout
        showModal={isAddAddressModalOpen}
        closeModal={() => setIsAddAddressModalOpen(false)}
        title="Add a new address"
        className="theme-modal location-modal"
      >
        <AddAddressModalContent />
      </ModalLayout>
    </>
  );
};

export default Address;
