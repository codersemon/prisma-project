const AddressCard = ({
  address,
  addresstype,
  billingAddressUpdateHandler,
  deliveryAddressUpdateHandler,
}) => {
  return (
    <div className="col-xxl-6 col-lg-12 col-md-6">
      <div className="delivery-address-box">
        <div>
          <div className="form-check">
            {addresstype === "billing" && (
              <input
                className="form-check-input"
                type="radio"
                name={addresstype}
                id={`id-${addresstype}-${address?.id}`}
                onChange={billingAddressUpdateHandler}
              />
            )}
            {addresstype === "delivery" && (
              <input
                className="form-check-input"
                type="radio"
                name={addresstype}
                id={`id-${addresstype}-${address?.id}`}
                onChange={deliveryAddressUpdateHandler}
              />
            )}
          </div>
          <div className="label">
            {addresstype === "billing" && (
              <label
                htmlFor={`id-${addresstype}-${address?.id}`}
                className="text-capitalize"
              >
                {address?.type}
              </label>
            )}
            {addresstype === "delivery" && (
              <label
                htmlFor={`id-${addresstype}-${address?.id}`}
                className="text-capitalize"
              >
                {address?.type}
              </label>
            )}
          </div>
          <ul className="delivery-address-detail">
            <li>
              <h4 className="fw-500">{address?.full_name}</h4>
            </li>
            <li>
              <p className="text-content">
                <span className="text-title">Address :</span>
                {address?.street_address},{" "}
                {address?.street_address_2
                  ? `${address?.street_address_2},`
                  : ""}
                {address?.district}, {address?.country}
              </p>
            </li>
            <li>
              <h6 className="text-content">
                <span className="text-title">Zip Code :</span>
                {address?.zip_code}
              </h6>
            </li>
            <li>
              <h6 className="text-content mb-0">
                <span className="text-title">Phone :</span> {address?.phone}
              </h6>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
