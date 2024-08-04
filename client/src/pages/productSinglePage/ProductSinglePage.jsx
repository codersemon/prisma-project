// dependencies
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import InnerImageZoom from "react-inner-image-zoom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import RatingFiveStar from "../../components/common/RatingStar";
import ProductTabs from "../../components/productSinglePage/ProductTabs";
import { RelatedProducts } from "../../components/productSinglePage/RelatedProducts";
import { addItemToCart } from "../../features/cartAPISlice";
import { getSingleProduct } from "../../features/productAPISlice";
import { productsSelect } from "../../features/productSlice";
import { getDiscountPercentage } from "../../helpers/helpers";

const productGallerySliderSettings = {
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
};

const ProductSinglePage = () => {
  // product context
  const { singleProduct } = useSelector(productsSelect);
  const dispatch = useDispatch();

  // main image state
  const [thumbnail, setThumbnail] = useState();

  // get product id from url params
  const { slug } = useParams();

  // single product fetcher action invoke
  useEffect(() => {
    dispatch(getSingleProduct(slug));
  }, [slug, dispatch]);

  // quantity state
  const [quantity, setQuantity] = useState(1);

  /**
   * Handle quantity increment function
   */
  const handleQuantityIncrement = () => {
    // if product status not "on_waitlist_order", then run the if block
    if (singleProduct?.stock_status !== "on_waitlist_order") {
      setQuantity((prev) =>
        singleProduct?.stock_quantity > prev ? prev + 1 : prev
      );
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  /**
   * calculate reviews average score out of 5
   */
  const reviewAverageScore = useMemo(() => {
    const totalScore = singleProduct?.reviews?.reduce(
      (total, item) => total + item?.rating,
      0
    );
    // if score is NaN, return 0 otherwise return score.
    return isNaN(totalScore / singleProduct?.reviews?.length)
      ? 0
      : totalScore / singleProduct?.reviews?.length;
  }, [singleProduct?.reviews]);

  return (
    <>
      <Helmet>
        <title>{singleProduct?.name}</title>
      </Helmet>

      <section className="product-section">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-xxl-9 col-xl-8 col-lg-7 wow fadeInUp">
              <div className="row g-4">
                <div className="col-xl-6 wow fadeInUp">
                  <div className="product-left-box">
                    <div className="row g-2">
                      <div className="col-12">
                        <div className="product-main-1 no-arrow">
                          <div>
                            <div className="slider-image">
                              <InnerImageZoom
                                src={
                                  thumbnail
                                    ? thumbnail
                                    : singleProduct?.thumbnail?.url
                                }
                                zoomType="hover"
                                zoomPreload={true}
                                zoomScale={2}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <Slider
                          {...productGallerySliderSettings}
                          className="bottom-slider-image left-slider no-arrow slick-top"
                        >
                          <div>
                            <div
                              className="sidebar-image cursor-pointer"
                              onClick={() =>
                                setThumbnail(singleProduct?.thumbnail?.url)
                              }
                            >
                              <img
                                src={singleProduct?.thumbnail?.url}
                                className="img-fluid blur-up lazyload"
                                alt=""
                              />
                            </div>
                          </div>
                          {singleProduct?.galleries?.length > 0 &&
                            singleProduct?.galleries?.map((item) => (
                              <div key={item.id}>
                                <div
                                  className="sidebar-image cursor-pointer"
                                  onClick={() => setThumbnail(item?.media?.url)}
                                >
                                  <img
                                    src={item?.media?.url}
                                    className="img-fluid blur-up lazyload"
                                    alt=""
                                  />
                                </div>
                              </div>
                            ))}
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 wow fadeInUp" data-wow-delay="0.1s">
                  <div className="right-box-contain">
                    {singleProduct?.sale_price && (
                      <h6 className="offer-top">
                        {getDiscountPercentage(
                          singleProduct?.regular_price,
                          singleProduct?.sale_price
                        )}
                        % Off
                      </h6>
                    )}

                    <h2 className="name">{singleProduct?.name}</h2>
                    <div className="price-rating">
                      <h3 className="theme-color price">
                        {singleProduct?.sale_price && (
                          <>
                            ${singleProduct?.sale_price}{" "}
                            <del className="text-content">
                              ${singleProduct?.regular_price}
                            </del>
                          </>
                        )}
                        {!singleProduct?.sale_price && (
                          <>${singleProduct?.regular_price}</>
                        )}{" "}
                        {singleProduct?.sale_price && (
                          <span className="offer theme-color">
                            {" "}
                            (
                            {getDiscountPercentage(
                              singleProduct?.regular_price,
                              singleProduct?.sale_price
                            )}
                            % off)
                          </span>
                        )}
                      </h3>
                      <div className="product-rating custom-rate">
                        <ul className="rating">
                          <RatingFiveStar fillStarCount={reviewAverageScore} />
                        </ul>
                        <span className="review">
                          {singleProduct?.reviews?.length} Customer
                          {singleProduct?.reviews?.length > 0 && "s"} Review
                        </span>
                      </div>
                    </div>
                    <div className="procuct-contain">
                      <p>{singleProduct?.short_description}</p>
                    </div>

                    {/* <div
                      className="time deal-timer product-deal-timer mx-md-0 mx-auto"
                      id="clockdiv-1"
                      data-hours={1}
                      data-minutes={2}
                      data-seconds={3}
                    >
                      <div className="product-title">
                        <h4>Hurry up! Sales Ends In</h4>
                      </div>
                      <ul>
                        <li>
                          <div className="counter d-block">
                            <div className="days d-block">
                              <h5 />
                            </div>
                            <h6>Days</h6>
                          </div>
                        </li>
                        <li>
                          <div className="counter d-block">
                            <div className="hours d-block">
                              <h5 />
                            </div>
                            <h6>Hours</h6>
                          </div>
                        </li>
                        <li>
                          <div className="counter d-block">
                            <div className="minutes d-block">
                              <h5 />
                            </div>
                            <h6>Min</h6>
                          </div>
                        </li>
                        <li>
                          <div className="counter d-block">
                            <div className="seconds d-block">
                              <h5 />
                            </div>
                            <h6>Sec</h6>
                          </div>
                        </li>
                      </ul>
                    </div> */}
                    <div className="note-box product-packege">
                      {singleProduct?.stock_status === "in_stock" && (
                        <p className="m-0">
                          In stock: {singleProduct?.stock_quantity}
                        </p>
                      )}

                      {singleProduct?.stock_status === "on_waitlist_order" && (
                        <p className="m-0 text-theme">
                          Taking waitlist order. You will get delivery, when
                          product become available.
                        </p>
                      )}
                    </div>
                    {singleProduct?.stock_status !== "out_of_stock" && (
                      <div className="note-box product-packege">
                        <div className="cart_qty qty-box product-qty">
                          <div className="input-group">
                            <button
                              type="button"
                              className="qty-left-minus"
                              onClick={() =>
                                setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                              }
                            >
                              <i className="fa fa-minus" aria-hidden="true" />
                            </button>
                            <input
                              className="form-control input-number qty-input"
                              type="text"
                              value={quantity}
                              readOnly
                            />

                            <button
                              type="button"
                              className="qty-right-plus"
                              onClick={handleQuantityIncrement}
                            >
                              <i className="fa fa-plus" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <button
                          className="btn btn-md bg-dark cart-button text-white w-100"
                          onClick={() =>
                            dispatch(
                              addItemToCart({
                                productId: singleProduct?.id,
                                quantity,
                              })
                            )
                          }
                        >
                          Add To Cart
                        </button>
                      </div>
                    )}

                    {singleProduct?.stock_status === "out_of_stock" && (
                      <button
                        className="btn btn-md bg-danger cart-button text-white w-100"
                        disabled
                      >
                        Out of stock
                      </button>
                    )}

                    <div className="buy-box">
                      <a href="wishlist.html">
                        <i data-feather="heart" />
                        <span>Add To Wishlist</span>
                      </a>
                      <a href="compare.html">
                        <i data-feather="shuffle" />
                        <span>Add To Compare</span>
                      </a>
                    </div>
                    <div className="pickup-box">
                      <div className="product-info">
                        <ul className="product-info-list product-info-list-2">
                          <li>
                            SKU : <span>{singleProduct?.sku}</span>
                          </li>
                          {singleProduct?.stock_status === "in_stock" && (
                            <li>
                              Stock :{" "}
                              <span>{singleProduct?.stock_quantity}</span>
                            </li>
                          )}
                          <li>
                            Category :{" "}
                            {singleProduct?.categories?.map((cat, index) => {
                              // if last item, then return if block
                              if (
                                singleProduct?.categories?.length ===
                                index + 1
                              ) {
                                return (
                                  <Link
                                    className="theme-color"
                                    key={cat.category.id}
                                    to={`/category/${cat.category.slug}`}
                                  >
                                    {cat.category.name}
                                  </Link>
                                );
                              } else {
                                return (
                                  // if not last item, then return this block to add comma after category name
                                  <>
                                    <Link
                                      className="theme-color"
                                      key={cat.category.id}
                                      to={`/category/${cat.category.slug}`}
                                    >
                                      {cat.category.name}
                                    </Link>
                                    {", "}
                                  </>
                                );
                              }
                            })}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="paymnet-option">
                      <div className="product-title">
                        <h4>Guaranteed Safe Checkout</h4>
                      </div>
                      <ul>
                        <li>
                          <a href="">
                            <img
                              src="../assets/images/product/payment/1.svg"
                              className="blur-up lazyload"
                              alt=""
                            />
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <img
                              src="../assets/images/product/payment/2.svg"
                              className="blur-up lazyload"
                              alt=""
                            />
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <img
                              src="../assets/images/product/payment/3.svg"
                              className="blur-up lazyload"
                              alt=""
                            />
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <img
                              src="../assets/images/product/payment/4.svg"
                              className="blur-up lazyload"
                              alt=""
                            />
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <img
                              src="../assets/images/product/payment/5.svg"
                              className="blur-up lazyload"
                              alt=""
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <ProductTabs
                  productDetails={singleProduct}
                  reviewAverageScore={reviewAverageScore}
                />
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-5 d-none d-lg-block wow fadeInUp">
              <div className="right-sidebar-box">
                <div className="vendor-box">
                  <div className="verndor-contain">
                    <div className="vendor-image">
                      <img
                        src="../assets/images/product/vendor.png"
                        className="blur-up lazyload"
                        alt=""
                      />
                    </div>
                    <div className="vendor-name">
                      <h5 className="fw-500">Noodles Co.</h5>
                      <div className="product-rating mt-1">
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
                            <i data-feather="star" />
                          </li>
                        </ul>
                        <span>(36 Reviews)</span>
                      </div>
                    </div>
                  </div>
                  <p className="vendor-detail">
                    Noodles &amp; Company is an American fast-casual restaurant
                    that offers international and American noodle dishes and
                    pasta.
                  </p>
                  <div className="vendor-list">
                    <ul>
                      <li>
                        <div className="address-contact">
                          <i data-feather="map-pin" />
                          <h5>
                            Address:{" "}
                            <span className="text-content">
                              1288 Franklin Avenue
                            </span>
                          </h5>
                        </div>
                      </li>
                      <li>
                        <div className="address-contact">
                          <i data-feather="headphones" />
                          <h5>
                            Contact Seller:{" "}
                            <span className="text-content">
                              (+1)-123-456-789
                            </span>
                          </h5>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Trending Product */}
                <div className="pt-25">
                  <div className="category-menu">
                    <h3>Trending Products</h3>
                    <ul className="product-list product-right-sidebar border-0 p-0">
                      <li>
                        <div className="offer-product">
                          <a
                            href="product-left-thumbnail.html"
                            className="offer-image"
                          >
                            <img
                              src="../assets/images/vegetable/product/23.png"
                              className="img-fluid blur-up lazyload"
                              alt=""
                            />
                          </a>
                          <div className="offer-detail">
                            <div>
                              <a href="product-left-thumbnail.html">
                                <h6 className="name">
                                  Meatigo Premium Goat Curry
                                </h6>
                              </a>
                              <span>450 G</span>
                              <h6 className="price theme-color">$ 70.00</h6>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="offer-product">
                          <a
                            href="product-left-thumbnail.html"
                            className="offer-image"
                          >
                            <img
                              src="../assets/images/vegetable/product/24.png"
                              className="blur-up lazyload"
                              alt=""
                            />
                          </a>
                          <div className="offer-detail">
                            <div>
                              <a href="product-left-thumbnail.html">
                                <h6 className="name">
                                  Dates Medjoul Premium Imported
                                </h6>
                              </a>
                              <span>450 G</span>
                              <h6 className="price theme-color">$ 40.00</h6>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="offer-product">
                          <a
                            href="product-left-thumbnail.html"
                            className="offer-image"
                          >
                            <img
                              src="../assets/images/vegetable/product/25.png"
                              className="blur-up lazyload"
                              alt=""
                            />
                          </a>
                          <div className="offer-detail">
                            <div>
                              <a href="product-left-thumbnail.html">
                                <h6 className="name">
                                  Good Life Walnut Kernels
                                </h6>
                              </a>
                              <span>200 G</span>
                              <h6 className="price theme-color">$ 52.00</h6>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="mb-0">
                        <div className="offer-product">
                          <a
                            href="product-left-thumbnail.html"
                            className="offer-image"
                          >
                            <img
                              src="../assets/images/vegetable/product/26.png"
                              className="blur-up lazyload"
                              alt=""
                            />
                          </a>
                          <div className="offer-detail">
                            <div>
                              <a href="product-left-thumbnail.html">
                                <h6 className="name">
                                  Apple Red Premium Imported
                                </h6>
                              </a>
                              <span>1 KG</span>
                              <h6 className="price theme-color">$ 80.00</h6>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Banner Section */}
                <div className="ratio_156 pt-25">
                  <div className="home-contain">
                    <img
                      src="../assets/images/vegetable/banner/8.jpg"
                      className="bg-img blur-up lazyload"
                      alt=""
                    />
                    <div className="home-detail p-top-left home-p-medium">
                      <div>
                        <h6 className="text-yellow home-banner">Seafood</h6>
                        <h3 className="text-uppercase fw-normal">
                          <span className="theme-color fw-bold">Freshes</span>{" "}
                          Products
                        </h3>
                        <h3 className="fw-light">every hour</h3>
                        <button className="btn btn-animation btn-md fw-bold mend-auto">
                          Shop Now{" "}
                          <i className="fa-solid fa-arrow-right icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedProducts />
    </>
  );
};

export default ProductSinglePage;
