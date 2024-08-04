// dependencies
import { useEffect, useState } from "react";
import useDropdownPopupController from "../../../hooks/useDropdownPopupController";
import HeaderBottom from "./HeaderBottom";
import HeaderMiddle from "./HeaderMiddle";
import HeaderTop from "./HeaderTop";
import MobileFooterMenu from "./MobileFooterMenu";
import { useSelector } from "react-redux";
import { authSelect } from "../../../features/authSlice";

const Header = () => {
  // auth context
  const { user } = useSelector(authSelect);

  // sticky state
  const [isSticky, setIsSticky] = useState(false);

  // mobile hamburger state controller
  const { isOpen, handleToggler, openedWrapperRef } =
    useDropdownPopupController();

  // Effect to handle scroll event for sticky header
  useEffect(() => {
    const handleScroll = () => {
      // Check the scroll position and set the sticky state
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`pb-md-4 pb-0 ${isSticky ? "active" : ""}`}
        ref={openedWrapperRef}
      >
        <HeaderTop />
        <HeaderMiddle hamburgerToggler={handleToggler} user={user} />
        <HeaderBottom
          isMobileMenuOpen={isOpen}
          hamburgerToggler={handleToggler}
        />
      </header>
      <MobileFooterMenu />
    </>
  );
};

export default Header;
