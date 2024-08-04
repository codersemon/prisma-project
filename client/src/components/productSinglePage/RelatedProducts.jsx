export const RelatedProducts = () => {
  return (
    <section className="product-list-section section-b-space">
      <div className="container-fluid-lg">
        <div className="title">
          <h2>Related Products</h2>
          <span className="title-leaf">
            <svg className="icon-width">
              <use xlinkHref="../assets/svg/leaf.svg#leaf" />
            </svg>
          </span>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="slider-6_1 product-wrapper">
              <div>
                <div className="product-box-3 wow fadeInUp">
                  <div className="product-header">
                    <div className="product-image">
                      <a href="product-left.htm">
                        <img
                          src="../assets/images/cake/product/11.png"
                          className="img-fluid blur-up lazyload"
                          alt=""
                        />
                      </a>
                      <ul className="product-option">
                        <li
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="View"
                        >
                          <a
                            href="javascript:void(0)"
                            data-bs-toggle="modal"
                            data-bs-target="#view"
                          >
                            <i data-feather="eye" />
                          </a>
                        </li>
                        <li
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Compare"
                        >
                          <a href="compare.html">
                            <i data-feather="refresh-cw" />
                          </a>
                        </li>
                        <li
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Wishlist"
                        >
                          <a href="wishlist.html" className="notifi-wishlist">
                            <i data-feather="heart" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="product-footer">
                    <div className="product-detail">
                      <span className="span-name">Cake</span>
                      <a href="product-left-thumbnail.html">
                        <h5 className="name">Chocolate Chip Cookies 250 g</h5>
                      </a>
                      <div className="product-rating mt-2">
                        <ul className="rating">
                          <li>
                            <i data-feather="star" className="fill" />
                          </li>
                          <li>
                            <i data-feather="star" className="fill" />
                          </li>
                          <li>
                            <i data-feather="star" className="fill" />
                          </li>
                          <li>
                            <i data-feather="star" className="fill" />
                          </li>
                          <li>
                            <i data-feather="star" className="fill" />
                          </li>
                        </ul>
                        <span>(5.0)</span>
                      </div>
                      <h6 className="unit">500 G</h6>
                      <h5 className="price">
                        <span className="theme-color">$10.25</span>{" "}
                        <del>$12.57</del>
                      </h5>
                      <div className="add-to-cart-box bg-white">
                        <button className="btn btn-add-cart addcart-button">
                          Add
                          <span className="add-icon bg-light-gray">
                            <i className="fa-solid fa-plus" />
                          </span>
                        </button>
                        <div className="cart_qty qty-box">
                          <div className="input-group bg-white">
                            <button
                              type="button"
                              className="qty-left-minus bg-gray"
                              data-type="minus"
                              data-field=""
                            >
                              <i className="fa fa-minus" aria-hidden="true" />
                            </button>
                            <input
                              className="form-control input-number qty-input"
                              type="text"
                              name="quantity"
                              defaultValue={0}
                            />
                            <button
                              type="button"
                              className="qty-right-plus bg-gray"
                              data-type="plus"
                              data-field=""
                            >
                              <i className="fa fa-plus" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
