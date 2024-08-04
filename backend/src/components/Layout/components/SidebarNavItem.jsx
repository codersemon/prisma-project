// dependencies
import { useState } from "react";
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const SidebarNavItem = ({ icon: Icon, title, children, onToggle }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  return (
    <li className={`sidebar-list ${isActive ? "active" : ""}`}>
      <Link className="sidebar-title" onClick={handleToggle}>
        <Icon />
        <span>{title}</span>
        {isActive ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
      </Link>
      <ul
        className="sidebar-submenu"
        style={{ display: isActive ? "block" : "none" }}
      >
        {children}
      </ul>
    </li>
  );
};

export default SidebarNavItem;
