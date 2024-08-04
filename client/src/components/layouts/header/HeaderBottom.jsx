// dependencies
import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ModalLayout from "../../common/ModalLayout";
import DealsModalContent from "../../modalContents/DealsModalContent";

const HeaderBottom = ({ isMobileMenuOpen, hamburgerToggler, menuWrapper }) => {
  // deals modal state
  const [showDealsModal, setShowDealsModal] = useState(false);
  return (
    <>
      <div className="container-fluid-lg">
        <div className="row">
          <div className="col-12">
            <div className="header-nav">
              <div className="header-nav-left">
                <button className="dropdown-category">
                  <i data-feather="align-left" />
                  <span>All Categories</span>
                </button>
                <div className="category-dropdown">
                  <div className="category-title">
                    <h5>Categories</h5>
                    <button
                      type="button"
                      className="btn p-0 close-button text-content"
                    >
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>
                  <ul className="category-list">
                    <li className="onhover-category-list">
                      <a href="" className="category-name">
                        <img src="../assets/svg/1/vegetable.svg" alt="" />
                        <h6>Vegetables &amp; Fruit</h6>
                        <i className="fa-solid fa-angle-right" />
                      </a>
                      <div className="onhover-category-box">
                        <div className="list-1">
                          <div className="category-title-box">
                            <h5>Organic Vegetables</h5>
                          </div>
                          <ul>
                            <li>
                              <a href="">
                                Potato &amp; Tomato
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Cucumber &amp; Capsicum
                              </a>
                            </li>
                            <li>
                              <a href="">Leafy Vegetables</a>
                            </li>
                            <li>
                              <a href="">Root Vegetables</a>
                            </li>
                            <li>
                              <a href="">Beans &amp; Okra</a>
                            </li>
                            <li>
                              <a href="">
                                Cabbage &amp; Cauliflower
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Gourd &amp; Drumstick
                              </a>
                            </li>
                            <li>
                              <a href="">Specialty</a>
                            </li>
                          </ul>
                        </div>
                        <div className="list-2">
                          <div className="category-title-box">
                            <h5>Fresh Fruit</h5>
                          </div>
                          <ul>
                            <li>
                              <a href="">
                                Banana &amp; Papaya
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Kiwi, Citrus Fruit
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Apples &amp; Pomegranate
                              </a>
                            </li>
                            <li>
                              <a href="">Seasonal Fruits</a>
                            </li>
                            <li>
                              <a href="">Mangoes</a>
                            </li>
                            <li>
                              <a href="">Fruit Baskets</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="onhover-category-list">
                      <a href="" className="category-name">
                        <img src="../assets/svg/1/cup.svg" alt="" />
                        <h6>Beverages</h6>
                        <i className="fa-solid fa-angle-right" />
                      </a>
                      <div className="onhover-category-box w-100">
                        <div className="list-1">
                          <div className="category-title-box">
                            <h5>Energy &amp; Soft Drinks</h5>
                          </div>
                          <ul>
                            <li>
                              <a href="">
                                Soda &amp; Cocktail Mix
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Soda &amp; Cocktail Mix
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Sports &amp; Energy Drinks
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Non Alcoholic Drinks
                              </a>
                            </li>
                            <li>
                              <a href="">Packaged Water</a>
                            </li>
                            <li>
                              <a href="">Spring Water</a>
                            </li>
                            <li>
                              <a href="">Flavoured Water</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="onhover-category-list">
                      <a href="" className="category-name">
                        <img src="../assets/svg/1/meats.svg" alt="" />
                        <h6>Meats &amp; Seafood</h6>
                        <i className="fa-solid fa-angle-right" />
                      </a>
                      <div className="onhover-category-box">
                        <div className="list-1">
                          <div className="category-title-box">
                            <h5>Meat</h5>
                          </div>
                          <ul>
                            <li>
                              <a href="">Fresh Meat</a>
                            </li>
                            <li>
                              <a href="">Frozen Meat</a>
                            </li>
                            <li>
                              <a href="">Marinated Meat</a>
                            </li>
                            <li>
                              <a href="">
                                Fresh &amp; Frozen Meat
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="list-2">
                          <div className="category-title-box">
                            <h5>Seafood</h5>
                          </div>
                          <ul>
                            <li>
                              <a href="">Fresh Water Fish</a>
                            </li>
                            <li>
                              <a href="">Dry Fish</a>
                            </li>
                            <li>
                              <a href="">
                                Frozen Fish &amp; Seafood
                              </a>
                            </li>
                            <li>
                              <a href="">Marine Water Fish</a>
                            </li>
                            <li>
                              <a href="">Canned Seafood</a>
                            </li>
                            <li>
                              <a href="">
                                Prawans &amp; Shrimps
                              </a>
                            </li>
                            <li>
                              <a href="">Other Seafood</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="onhover-category-list">
                      <a href="" className="category-name">
                        <img src="../assets/svg/1/breakfast.svg" alt="" />
                        <h6>Breakfast &amp; Dairy</h6>
                        <i className="fa-solid fa-angle-right" />
                      </a>
                      <div className="onhover-category-box">
                        <div className="list-1">
                          <div className="category-title-box">
                            <h5>Breakfast Cereals</h5>
                          </div>
                          <ul>
                            <li>
                              <a href="">
                                Oats &amp; Porridge
                              </a>
                            </li>
                            <li>
                              <a href="">Kids Cereal</a>
                            </li>
                            <li>
                              <a href="">Muesli</a>
                            </li>
                            <li>
                              <a href="">Flakes</a>
                            </li>
                            <li>
                              <a href="">
                                Granola &amp; Cereal Bars
                              </a>
                            </li>
                            <li>
                              <a href="">Instant Noodles</a>
                            </li>
                            <li>
                              <a href="">
                                Pasta &amp; Macaroni
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Frozen Non-Veg Snacks
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="list-2">
                          <div className="category-title-box">
                            <h5>Dairy</h5>
                          </div>
                          <ul>
                            <li>
                              <a href="">Milk</a>
                            </li>
                            <li>
                              <a href="">Curd</a>
                            </li>
                            <li>
                              <a href="">
                                Paneer, Tofu &amp; Cream
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Butter &amp; Margarine
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Condensed, Powdered Milk
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Buttermilk &amp; Lassi
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Yogurt &amp; Shrikhand
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Flavoured, Soya Milk
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="onhover-category-list">
                      <a href="" className="category-name">
                        <img src="../assets/svg/1/frozen.svg" alt="" />
                        <h6>Frozen Foods</h6>
                        <i className="fa-solid fa-angle-right" />
                      </a>
                      <div className="onhover-category-box w-100">
                        <div className="list-1">
                          <div className="category-title-box">
                            <h5>Noodle, Pasta</h5>
                          </div>
                          <ul>
                            <li>
                              <a href="">Instant Noodles</a>
                            </li>
                            <li>
                              <a href="">Hakka Noodles</a>
                            </li>
                            <li>
                              <a href="">Cup Noodles</a>
                            </li>
                            <li>
                              <a href="">Vermicelli</a>
                            </li>
                            <li>
                              <a href="">Instant Pasta</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="onhover-category-list">
                      <a href="" className="category-name">
                        <img src="../assets/svg/1/biscuit.svg" alt="" />
                        <h6>Biscuits &amp; Snacks</h6>
                        <i className="fa-solid fa-angle-right" />
                      </a>
                      <div className="onhover-category-box">
                        <div className="list-1">
                          <div className="category-title-box">
                            <h5>Biscuits &amp; Cookies</h5>
                          </div>
                          <ul>
                            <li>
                              <a href="">Salted Biscuits</a>
                            </li>
                            <li>
                              <a href="">
                                Marie, Health, Digestive
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Cream Biscuits &amp; Wafers
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Glucose &amp; Milk Biscuits
                              </a>
                            </li>
                            <li>
                              <a href="">Cookies</a>
                            </li>
                          </ul>
                        </div>
                        <div className="list-2">
                          <div className="category-title-box">
                            <h5>Bakery Snacks</h5>
                          </div>
                          <ul>
                            <li>
                              <a href="">
                                Bread Sticks &amp; Lavash
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Cheese &amp; Garlic Bread
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Puffs, Patties, Sandwiches
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Breadcrumbs &amp; Croutons
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="onhover-category-list">
                      <a href="" className="category-name">
                        <img src="../assets/svg/1/grocery.svg" alt="" />
                        <h6>Grocery &amp; Staples</h6>
                        <i className="fa-solid fa-angle-right" />
                      </a>
                      <div className="onhover-category-box">
                        <div className="list-1">
                          <div className="category-title-box">
                            <h5>Grocery</h5>
                          </div>
                          <ul>
                            <li>
                              <a href="">
                                Lemon, Ginger &amp; Garlic
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Indian &amp; Exotic Herbs
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Organic Vegetables
                              </a>
                            </li>
                            <li>
                              <a href="">Organic Fruits</a>
                            </li>
                          </ul>
                        </div>
                        <div className="list-2">
                          <div className="category-title-box">
                            <h5>Organic Staples</h5>
                          </div>
                          <ul>
                            <li>
                              <a href="">
                                Organic Dry Fruits
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Organic Dals &amp; Pulses
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Organic Millet &amp; Flours
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Organic Sugar, Jaggery
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Organic Masalas &amp; Spices
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Organic Rice, Other Rice
                              </a>
                            </li>
                            <li>
                              <a href="">Organic Flours</a>
                            </li>
                            <li>
                              <a href="">
                                Organic Edible Oil, Ghee
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="header-nav-middle">
                <div className="main-nav navbar navbar-expand-xl navbar-light navbar-sticky">
                  <div
                    className={`offcanvas offcanvas-collapse order-xl-2 ${
                      isMobileMenuOpen ? "show" : ""
                    }`}
                    id="primaryMenu"
                  >
                    <div className="offcanvas-header navbar-shadow">
                      <h5>Menu</h5>
                      <button
                        className="btn-close lead"
                        type="button"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        onClick={hamburgerToggler}
                      />
                    </div>
                    <div className="offcanvas-body">
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <Link className="nav-link no-child" to="/">
                            Home
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link no-child" to="/shop">
                            Shop
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link no-child" to="/about">
                            About
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link no-child" to="/contact">
                            Contact
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link no-child" to="/blog">
                            Blog
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link no-child" to="/track-order">
                            Track order
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="header-nav-right">
                <button
                  className="btn deal-button"
                  onClick={() => setShowDealsModal(true)}
                >
                  <FeatherIcon icon="zap" />
                  <span>Deal Today</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deals modal  */}
      <ModalLayout
        closeModal={() => setShowDealsModal(false)}
        showModal={showDealsModal}
        className="deal-modal"
        title="Deal Today"
        subtitle="Recommended deals for you."
      >
        <DealsModalContent />
      </ModalLayout>
    </>
  );
};

export default HeaderBottom;
