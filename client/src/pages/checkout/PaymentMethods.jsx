// dependencies
import { HiOutlineCreditCard } from "react-icons/hi2";

const PaymentMethods = ({setCheckoutData}) => {
  return (
    <li>
      <div className="checkout-icon">
        <HiOutlineCreditCard size={25} className="customIconColor" />
      </div>
      <div className="checkout-box">
        <div className="checkout-title">
          <h4>Payment Option</h4>
        </div>
        <div className="checkout-detail">
          <div
            className="accordion accordion-flush custom-accordion"
            id="accordionFlushExample"
          >
            <div className="accordion-item">
              <div className="accordion-header" id="flush-headingFour">
                <div
                  className="accordion-button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFour"
                  aria-expanded="true"
                >
                  <div className="custom-form-check form-check mb-0">
                    <label className="form-check-label" htmlFor="cash">
                      <input
                        className="form-check-input mt-0"
                        type="radio"
                        name="flexRadioDefault"
                        id="cash"
                        onChange={() => setCheckoutData(prev => ({...prev, payment_method: "cash on delivery"}))}
                      />{" "}
                      Cash On Delivery
                    </label>
                  </div>
                </div>
              </div>
              <div
                id="flush-collapseFour"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionFlushExample"
                style={{}}
              >
                <div className="accordion-body">
                  <p className="cod-review">
                    Pay digitally with SMS Pay Link. Cash may not be accepted in
                    COVID restricted areas.{" "}
                    <a href="javascript:void(0)">Know more.</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <div className="accordion-header" id="flush-headingOne">
                <div
                  className="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                >
                  <div className="custom-form-check form-check mb-0">
                    <label className="form-check-label" htmlFor="credit">
                      <input
                        className="form-check-input mt-0"
                        type="radio"
                        name="flexRadioDefault"
                        id="credit"
                        onChange={() => setCheckoutData(prev => ({...prev, payment_method: "card payment"}))}
                      />
                      Credit or Debit Card
                    </label>
                  </div>
                </div>
              </div>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
                style={{}}
              >
                <div className="accordion-body">
                  <div className="row g-2">
                    <div className="col-12">
                      <div className="payment-method">
                        <div className="form-floating mb-lg-3 mb-2 theme-form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="credit2"
                            placeholder="Enter Credit & Debit Card Number"
                          />
                          <label htmlFor="credit2">
                            Enter Credit &amp; Debit Card Number
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-4">
                      <div className="form-floating mb-lg-3 mb-2 theme-form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="expiry"
                          placeholder="Enter Expiry Date"
                        />
                        <label htmlFor="expiry">Expiry Date</label>
                      </div>
                    </div>
                    <div className="col-xxl-4">
                      <div className="form-floating mb-lg-3 mb-2 theme-form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="cvv"
                          placeholder="Enter CVV Number"
                        />
                        <label htmlFor="cvv">CVV Number</label>
                      </div>
                    </div>
                    <div className="col-xxl-4">
                      <div className="form-floating mb-lg-3 mb-2 theme-form-floating">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter Password"
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                    </div>
                    <div className="button-group mt-0">
                      <ul>
                        <li>
                          <button className="btn btn-light shopping-button">
                            Cancel
                          </button>
                        </li>
                        <li>
                          <button className="btn btn-animation">
                            Use This Card
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <div className="accordion-header" id="flush-headingTwo">
                <div
                  className="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                >
                  <div className="custom-form-check form-check mb-0">
                    <label className="form-check-label" htmlFor="banking">
                      <input
                        className="form-check-input mt-0"
                        type="radio"
                        name="flexRadioDefault"
                        id="banking"
                        onChange={() => setCheckoutData(prev => ({...prev, payment_method: "internet banking"}))}
                      />
                      Net Banking
                    </label>
                  </div>
                </div>
              </div>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
                style={{}}
              >
                <div className="accordion-body">
                  <h5 className="text-uppercase mb-4">Select Your Bank</h5>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <div className="custom-form-check form-check">
                        <input
                          className="form-check-input mt-0"
                          type="radio"
                          name="flexRadioDefault"
                          id="bank1"
                        />
                        <label className="form-check-label" htmlFor="bank1">
                          Industrial &amp; Commercial Bank
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="custom-form-check form-check">
                        <input
                          className="form-check-input mt-0"
                          type="radio"
                          name="flexRadioDefault"
                          id="bank2"
                        />
                        <label className="form-check-label" htmlFor="bank2">
                          Agricultural Bank
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="custom-form-check form-check">
                        <input
                          className="form-check-input mt-0"
                          type="radio"
                          name="flexRadioDefault"
                          id="bank3"
                        />
                        <label className="form-check-label" htmlFor="bank3">
                          Bank of America
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="custom-form-check form-check">
                        <input
                          className="form-check-input mt-0"
                          type="radio"
                          name="flexRadioDefault"
                          id="bank4"
                        />
                        <label className="form-check-label" htmlFor="bank4">
                          Construction Bank Corp.
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="custom-form-check form-check">
                        <input
                          className="form-check-input mt-0"
                          type="radio"
                          name="flexRadioDefault"
                          id="bank5"
                        />
                        <label className="form-check-label" htmlFor="bank5">
                          HSBC Holdings
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="custom-form-check form-check">
                        <input
                          className="form-check-input mt-0"
                          type="radio"
                          name="flexRadioDefault"
                          id="bank6"
                        />
                        <label className="form-check-label" htmlFor="bank6">
                          JPMorgan Chase &amp; Co.
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="select-option">
                        <div className="form-floating theme-form-floating">
                          <select
                            className="form-select theme-form-select"
                            aria-label="Default select example"
                          >
                            <option value="hsbc">HSBC Holdings</option>
                            <option value="loyds">Lloyds Banking Group</option>
                            <option value="natwest">Nat West Group</option>
                            <option value="Barclays">Barclays</option>
                            <option value="other">Others Bank</option>
                          </select>
                          <label>Select Other Bank</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <div className="accordion-header" id="flush-headingThree">
                <div
                  className="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                >
                  <div className="custom-form-check form-check mb-0">
                    <label className="form-check-label" htmlFor="wallet">
                      <input
                        className="form-check-input mt-0"
                        type="radio"
                        name="flexRadioDefault"
                        id="wallet"
                        onChange={() => setCheckoutData(prev => ({...prev, payment_method: "greenkart wallet"}))}
                      />
                      My Wallet
                    </label>
                  </div>
                </div>
              </div>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
                style={{}}
              >
                <div className="accordion-body">
                  <h5 className="text-uppercase mb-4">Select Your Wallet</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="custom-form-check form-check">
                        <label className="form-check-label" htmlFor="amazon">
                          <input
                            className="form-check-input mt-0"
                            type="radio"
                            name="flexRadioDefault"
                            id="amazon"
                          />
                          Amazon Pay
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="custom-form-check form-check">
                        <input
                          className="form-check-input mt-0"
                          type="radio"
                          name="flexRadioDefault"
                          id="gpay"
                        />
                        <label className="form-check-label" htmlFor="gpay">
                          Google Pay
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="custom-form-check form-check">
                        <input
                          className="form-check-input mt-0"
                          type="radio"
                          name="flexRadioDefault"
                          id="airtel"
                        />
                        <label className="form-check-label" htmlFor="airtel">
                          Airtel Money
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="custom-form-check form-check">
                        <input
                          className="form-check-input mt-0"
                          type="radio"
                          name="flexRadioDefault"
                          id="paytm"
                        />
                        <label className="form-check-label" htmlFor="paytm">
                          Paytm Pay
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="custom-form-check form-check">
                        <input
                          className="form-check-input mt-0"
                          type="radio"
                          name="flexRadioDefault"
                          id="jio"
                        />
                        <label className="form-check-label" htmlFor="jio">
                          JIO Money
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="custom-form-check form-check">
                        <input
                          className="form-check-input mt-0"
                          type="radio"
                          name="flexRadioDefault"
                          id="free"
                        />
                        <label className="form-check-label" htmlFor="free">
                          Freecharge
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PaymentMethods;
