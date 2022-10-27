import React, { useState } from "react";
import "../../styles/Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CgMenuLeftAlt } from "react-icons/cg";
import { AiOutlineUserAdd, AiOutlineUser } from "react-icons/ai";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectEmail } from "../../Redux/authSlice";
import { selectCartTotalQuantity } from "../../Redux/cartSlice";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const adminOnly = useSelector(selectEmail);

  const pathName = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  //Username Set
  const user = useSelector(selectIsLoggedIn);

  const totalCartItem = useSelector(selectCartTotalQuantity);

  return (
    <header>
      <nav>
        <div className="logo">
          <h1 onClick={() => navigate("/")}>ShopVerse</h1>
        </div>

        <div className="pageLinks">
          {adminOnly === process.env.REACT_APP_ADMIN_ID ? (
            <li
              onClick={() => navigate("admin/dashboard")}
              className={pathName("/admin/dashboard") ? "active" : null}
            >
              Admin
            </li>
          ) : null}

          <li
            onClick={() => navigate("/")}
            className={pathName("/") ? "active" : null}
          >
            Home
          </li>

          <li
            onClick={() => navigate("explore")}
            className={pathName("/explore") ? "active" : null}
          >
            Explore
          </li>
        </div>

        <div className="cartLogin">
          {user && (
            <li
              onClick={() => navigate("/orders-history")}
              className={pathName("/orders") ? "active" : null}
            >
              My Orders
            </li>
          )}

          <li
            onClick={() => navigate("cart")}
            className={pathName("/cart") ? "cartLink active" : "cartLink"}
          >
            <span>Cart</span>
            <FaShoppingCart className="cartIcon" />
            <p>{totalCartItem}</p>
          </li>

          {!user ? (
            <li
              onClick={() => navigate("login")}
              className={pathName("/login") ? "loginLink  active" : "loginLink"}
            >
              <span>Login</span>
              <AiOutlineUserAdd className="loginIcon" />
            </li>
          ) : (
            <li
              onClick={() => navigate("profile")}
              className={
                pathName("/profile") ? "loginLink  active" : "loginLink"
              }
            >
              <AiOutlineUser className="onlineIcon" />
            </li>
          )}
        </div>

        <div className="hamburger">
          <button type="button" onClick={() => setShow(true)}>
            <CgMenuLeftAlt className="hamIcon" />
          </button>
        </div>
      </nav>

      {show && (
        <div className="mobileBar">
          <MobileMenu setShow={setShow} />
        </div>
      )}
    </header>
  );
};

export default Navbar;
