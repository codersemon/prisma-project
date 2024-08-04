// dependencies
import { useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/productArchieve/Pagination";
import ProductCard from "../../components/productArchieve/ProductCard";
import Sidebar from "../../components/productArchieve/Sidebar";
import TopFilter from "../../components/productArchieve/TopFilter";
import {
  getAllProductCategory,
  getShopPageProducts,
} from "../../features/productAPISlice";
import { productsSelect } from "../../features/productSlice";

const ShopPage = () => {
  /**
   * react-redux dispatch hook init
   */
  const dispatch = useDispatch();

  /**
   * products context
   */
  const { shopProducts } = useSelector(productsSelect);

  /**
   * filtered product state
   */
  const [filteredProducts, setFilteredProducts] = useState([]);

  /**
   * set filteredProducts state by shopProducts
   */
  useEffect(() => {
    setFilteredProducts(shopProducts);
  }, [shopProducts]);

  // pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // fetching effect handler
  useEffect(() => {
    // fetch shop products
    dispatch(getShopPageProducts());

    // fetch categories
    dispatch(getAllProductCategory());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Shop</title>
      </Helmet>

      <section className="section-b-space shop-section">
        <div className="container-fluid-lg">
          <div className="row">
            <Sidebar
              setFilteredProducts={setFilteredProducts}
              filteredProducts={filteredProducts}
            />
            <Animated className="col-custome-9 wow fadeInt">
              <div className="show-button">
                <div className="filter-button-group mt-0">
                  <div className="filter-button d-inline-block d-lg-none">
                    <a>
                      <i className="fa-solid fa-filter" /> Filter Menu
                    </a>
                  </div>
                </div>
                <TopFilter />
              </div>
              <div className="row g-sm-4 g-3 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2 product-list-section">
                {filteredProducts?.length > 0 &&
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} productDetails={product} />
                  ))}
              </div>
              <Pagination
                totalPage={shopProducts?.total_page}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </Animated>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
