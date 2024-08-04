// dependencies
import { useEffect, useRef, useState } from "react";

const useDropdownPopupController = () => {
  // toggle state
  const [isOpen, setIsOpen] = useState(false);

  // openedWrapperRef
  const openedWrapperRef = useRef(null);


  // handle toggler
  const handleToggler = (e) => {
    // remove default event
    e.preventDefault();

    // toggle state
    setIsOpen(!isOpen);
  };

  // handle outsiderClick
  const handleOutsiderClick = (e) => {
    if(openedWrapperRef.current && !openedWrapperRef.current.contains(e.target)){
        setIsOpen(false);
    }
  };

  useEffect(() => {
    // capture all click
    document.addEventListener("click", handleOutsiderClick);

    // cleanup function
    return () => document.removeEventListener("click", handleOutsiderClick);
  }, []);

  return { isOpen, handleToggler, openedWrapperRef, setIsOpen };
};

export default useDropdownPopupController;
