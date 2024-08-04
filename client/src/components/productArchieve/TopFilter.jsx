// dependencies
import { useState } from "react";
import { Animated } from "react-animated-css";
import useDropdownPopupController from "../../hooks/useDropdownPopupController";

const sortByArray = []

const TopFilter = () => {
  /**
   * SORTING FILTER DROPDOWN CONTROLLER STATE
   */
  const { isOpen, handleToggler, openedWrapperRef, setIsOpen } =
    useDropdownPopupController();




  return (
    <div className="top-filter-menu">
      <div className="category-dropdown">
        <h5 className="text-content">Sort By :</h5>
        <div className="dropdown" ref={openedWrapperRef}>
          <button
            className="dropdown-toggle"
            type="button"
            onClick={handleToggler}
          >
            <span>Most Recent</span> <i className="fa-solid fa-angle-down" />
          </button>
          <Animated className={`dropdown-menu ${isOpen ? "show" : ""}`}>
            <li>
              <button
                className="dropdown-item"
                onClick={() =>
                  handleSearchQuerySetter(
                    {
                      sortby: "createdAt",
                      order: "desc",
                    },
                    "Most Recent"
                  )
                }
              >
                Most Recent
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() =>
                  handleSearchQuerySetter(
                    { sortby: "price", order: "asc" },
                    "Low - High Price"
                  )
                }
              >
                Low - High Price
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() =>
                  handleSearchQuerySetter(
                    { sortby: "price", order: "desc" },
                    "High - Low Price"
                  )
                }
              >
                High - Low Price
              </button>
            </li>

            <li>
              <button
                className="dropdown-item"
                onClick={() =>
                  handleSearchQuerySetter(
                    { sortby: "name", order: "asc" },
                    "A - Z Order"
                  )
                }
              >
                A - Z Order
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() =>
                  handleSearchQuerySetter(
                    { sortby: "name", order: "desc" },
                    "Z - A Order"
                  )
                }
              >
                Z - A Order
              </button>
            </li>
          </Animated>
        </div>
      </div>
      <div className="grid-option d-none d-md-block">
        <ul>
          <li className="three-grid">
            <a href="">
              <img
                src="../assets/svg/grid-3.svg"
                className="blur-up lazyload"
                alt=""
              />
            </a>
          </li>
          <li className="grid-btn d-xxl-inline-block d-none active">
            <a href="">
              <img
                src="../assets/svg/grid-4.svg"
                className="blur-up lazyload d-lg-inline-block d-none"
                alt=""
              />
              <img
                src="../assets/svg/grid.svg"
                className="blur-up lazyload img-fluid d-lg-none d-inline-block"
                alt=""
              />
            </a>
          </li>
          <li className="list-btn">
            <a href="">
              <img
                src="../assets/svg/list.svg"
                className="blur-up lazyload"
                alt=""
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopFilter;
