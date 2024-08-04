// dependencies
import FeatherIcon from "feather-icons-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { addItemToCart } from "../../features/cartAPISlice";
import { getHomepageLatestProducts } from "../../features/productAPISlice";
import { productsSelect } from "../../features/productSlice";
import ProductCardOptions from "../common/ProductCardOptions";

const latestProductsSliderSettings = {
  arrows: true,
  infinite: true,
  slidesToShow: 7,
  slidesToScroll: 1,
  loop: true,
  autoplay: true,
  speed: 1000,
  responsive: [
    {
      breakpoint: 1660,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1501,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1251,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 684,
      settings: {
        slidesToShow: 2,
        autoplay: true,
        autoplaySpeed: 2000,
      },
    },
  ],
};

const LatestProducts = () => {
  // products context
  const { homeLatestProducts } = useSelector(productsSelect);
  const dispatch = useDispatch();

  // get recent products
  useEffect(() => {
    dispatch(getHomepageLatestProducts());
  }, [dispatch]);

  return (
    <section className="product-section-3 pb-5">
      <div className="container-fluid-lg">
        <div className="title">
          <h2>Latest Products</h2>
        </div>
        <div className="row">
          <div className="col-12">
            <Slider
              className="slider-7_1 arrow-slider img-slider"
              {...latestProductsSliderSettings}
            >
              {homeLatestProducts &&
                homeLatestProducts?.map((product) => {
                  return (
                    <div key={product.id}>
                      <div className="product-box-4 wow fadeInUp">
                        <div className="product-image product-image-2">
                          <Link to={`/product/${product?.slug}`}>
                            <img
                              src={
                                product?.thumbnail?.url
                                  ? product?.thumbnail?.url
                                  : "/assets/images/products/1.png"
                              }
                              className="img-fluid blur-up lazyload w-100"
                              alt=""
                            />
                          </Link>
                          <ProductCardOptions
                            classOption="option"
                            productId={product?.id}
                            productDetails={product}
                          />
                        </div>
                        <div className="product-detail">
                          <ul className="rating">
                            <li>
                              <FeatherIcon icon="star" className="fill" />
                            </li>
                            <li>
                              <FeatherIcon icon="star" className="fill" />
                            </li>
                            <li>
                              <FeatherIcon icon="star" className="fill" />
                            </li>
                            <li>
                              <FeatherIcon icon="star" className="fill" />
                            </li>
                            <li>
                              <FeatherIcon icon="star" />
                            </li>
                          </ul>
                          <Link to={`/product/${product?.slug}`}>
                            <h5 className="name text-title">{product?.name}</h5>
                          </Link>
                          <h5 className="price theme-color">
                            {product?.sale_price ? (
                              <>
                                ${product?.sale_price}
                                <del>${product?.price}</del>
                              </>
                            ) : (
                              <>${product?.price}</>
                            )}
                          </h5>
                          <div className="addtocart_btn">
                            <button
                              className="add-button addcart-button btn buy-button text-light"
                              onClick={() =>
                                dispatch(
                                  addItemToCart({
                                    productId: product?.id,
                                    quantity: 1,
                                  })
                                )
                              }
                            >
                              <i className="fa-solid fa-plus" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
