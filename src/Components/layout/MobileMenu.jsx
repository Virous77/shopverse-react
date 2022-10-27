import React from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineUserAdd, AiOutlineUser } from "react-icons/ai";
import { BsXLg } from "react-icons/bs";
import "../../styles/MobileMenu.css";
import { auth } from "../../firebase//Firebase.config";
import { selectCartTotalQuantity } from "../../Redux/cartSlice";
import { useSelector } from "react-redux";
import { selectEmail } from "../../Redux/authSlice";

const MobileMenu = ({ setShow }) => {
  const user = auth.currentUser;
  const adminOnly = useSelector(selectEmail);

  const totalCartItem = useSelector(selectCartTotalQuantity);

  return (
    <header className="mobileHeader">
      <div className="logoMobile">
        <h1 onClick={() => setShow(false)}>ShopVerse</h1>

        <div className="xlgBar" onClick={() => setShow(false)}>
          <BsXLg className="xlgIcon" />
        </div>
      </div>

      <div className="pageLinksMobile">
        {adminOnly === process.env.REACT_APP_ADMIN_ID ? (
          <li onClick={() => setShow(false)}>
            <NavLink to="/admin/dashboard">Admin</NavLink>
          </li>
        ) : null}

        <li onClick={() => setShow(false)}>
          <NavLink to="/explore">Explore</NavLink>
        </li>
      </div>

      <div className="cartLoginMobile">
        {user && (
          <li onClick={() => setShow(false)}>
            <NavLink to="/orders-history">My Orders</NavLink>
          </li>
        )}

        <div className="loginCartMobile">
          <li className="cartLinkMobile" onClick={() => setShow(false)}>
            <NavLink to="cart">
              <span>Cart</span>
              <FaShoppingCart className="cartIcon" />
              <p>{totalCartItem}</p>
            </NavLink>
          </li>

          {!user ? (
            <li className="loginLinkMobile" onClick={() => setShow(false)}>
              <NavLink to="login">
                <span>Login</span>
                <AiOutlineUserAdd className="loginIcon" />
              </NavLink>
            </li>
          ) : (
            <li onClick={() => setShow(false)}>
              <NavLink to="/profile">
                <AiOutlineUser className="onlineIcon" />
              </NavLink>
            </li>
          )}
        </div>
      </div>
    </header>
  );
};

export default MobileMenu;
