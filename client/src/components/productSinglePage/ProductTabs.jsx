// dependencies
import ReviewTabContent from "./ReviewTabContent";

const ProductTabs = ({ productDetails, reviewAverageScore }) => {
  return (
    <div className="col-12">
      <div className="product-section-box">
        <ul className="nav nav-tabs custom-nav" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="description-tab"
              data-bs-toggle="tab"
              data-bs-target="#description"
              type="button"
              role="tab"
              aria-controls="description"
              aria-selected="true"
            >
              Description
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="info-tab"
              data-bs-toggle="tab"
              data-bs-target="#info"
              type="button"
              role="tab"
              aria-controls="info"
              aria-selected="false"
            >
              Additional info
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="care-tab"
              data-bs-toggle="tab"
              data-bs-target="#care"
              type="button"
              role="tab"
              aria-controls="care"
              aria-selected="false"
            >
              Care Instuctions
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="review-tab"
              data-bs-toggle="tab"
              data-bs-target="#review"
              type="button"
              role="tab"
              aria-controls="review"
              aria-selected="false"
            >
              Review
            </button>
          </li>
        </ul>
        <div className="tab-content custom-tab" id="myTabContent">
          <div
            className="tab-pane fade"
            id="description"
            role="tabpanel"
            aria-labelledby="description-tab"
          >
            <div className="product-description">
              <div className="nav-desh">
                <p>{productDetails?.description}</p>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="info"
            role="tabpanel"
            aria-labelledby="info-tab"
          >
            <div className="table-responsive">
              <table className="table info-table">
                <tbody>
                  <tr>
                    <td>Specialty</td>
                    <td>Vegetarian</td>
                  </tr>
                  <tr>
                    <td>Ingredient Type</td>
                    <td>Vegetarian</td>
                  </tr>
                  <tr>
                    <td>Brand</td>
                    <td>Lavian Exotique</td>
                  </tr>
                  <tr>
                    <td>Form</td>
                    <td>Bar Brownie</td>
                  </tr>
                  <tr>
                    <td>Package Information</td>
                    <td>Box</td>
                  </tr>
                  <tr>
                    <td>Manufacturer</td>
                    <td>Prayagh Nutri Product Pvt Ltd</td>
                  </tr>
                  <tr>
                    <td>Item part number</td>
                    <td>LE 014 - 20pcs Crème Bakes (Pack of 2)</td>
                  </tr>
                  <tr>
                    <td>Net Quantity</td>
                    <td>40.00 count</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="care"
            role="tabpanel"
            aria-labelledby="care-tab"
          >
            <div className="information-box">
              <ul>
                <li>
                  Store cream cakes in a refrigerator. Fondant cakes should be
                  stored in an air conditioned environment.
                </li>
                <li>
                  Slice and serve the cake at room temperature and make sure it
                  is not exposed to heat.
                </li>
                <li>Use a serrated knife to cut a fondant cake.</li>
                <li>
                  Sculptural elements and figurines may contain wire supports or
                  toothpicks or wooden skewers for support.
                </li>
                <li>
                  Please check the placement of these items before serving to
                  small children.
                </li>
                <li>The cake should be consumed within 24 hours.</li>
                <li>Enjoy your cake!</li>
              </ul>
            </div>
          </div>
          <ReviewTabContent productId={productDetails?.id} reviews={productDetails?.reviews} reviewAverageScore={reviewAverageScore} />
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
