import React, { useState } from "react";
import { selectUserName } from "../../Redux/authSlice";
import { useSelector } from "react-redux";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { adminNav } from "../../Utils/data";
import "../../styles/AdminCss/AdminNavbar.css";
import { RiMenuAddFill } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { motion } from "framer-motion";

const AdminNavbar = () => {
  const admin = useSelector(selectUserName);

  const [showAdminMenu, setShowAdminMenu] = useState(false);

  return (
    <section className="adminNavbarSection">
      <div className="adminLogo">
        <MdOutlineAdminPanelSettings className="adminIcon" />
        <h2>{admin}</h2>
      </div>

      <hr className="lines" />

      {showAdminMenu && (
        <motion.div
          className={`adminLink ${"menuHides"}`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          <ImCross
            className="adminCancel"
            onClick={() => setShowAdminMenu(false)}
          />
          <div className="adminMenuHead">Menu</div>
          {adminNav.map((nav) => (
            <li key={nav.id} onClick={() => setShowAdminMenu(false)}>
              <NavLink className={"adminNavLink"} to={nav.url}>
                {nav.name}
              </NavLink>
            </li>
          ))}
        </motion.div>
      )}

      <div className={`adminLinK ${"menuHide"}`}>
        <ImCross
          className="adminCancel"
          onClick={() => setShowAdminMenu(false)}
        />
        <div className="adminMenuHead">Menu</div>
        {adminNav.map((nav) => (
          <li key={nav.id}>
            <NavLink className={"adminNavLink"} to={nav.url}>
              {nav.name}
            </NavLink>
          </li>
        ))}
      </div>

      <div className="adminMenu">
        <RiMenuAddFill
          className="adminMenuIcon"
          onClick={() => setShowAdminMenu(true)}
        />
      </div>
    </section>
  );
};

export default AdminNavbar;
