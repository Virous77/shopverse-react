import React from "react";
import "../../styles/cart/CheckoutTable.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CART, SAVE_URL } from "../../Redux/cartSlice";
import { selectIsLoggedIn } from "../../Redux/authSlice";

const CheckoutTable = ({ totalAmmount }) => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const islogged = useSelector(selectIsLoggedIn);

  const clearCart = () => {
    dispatch(CLEAR_CART());
    dispatch(SAVE_URL(""));
  };

  const url = window.location.href;

  const checkout = () => {
    if (islogged) {
      naviagte("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      naviagte("/login");
    }
  };

  return (
    <aside className="checkoutTableBar">
      <div className="cartCleanAction">
        <Link to="/explore">
          <button className="continueShopping">Continue Shopping</button>
        </Link>
        <button className="clearShopping" onClick={clearCart}>
          Clear Shopping Cart
        </button>
      </div>

      <div className="checkoutTable">
        <div className="checkoutTableWrap">
          <div className="checkoutSubTotal">
            <h3>SubTotal : </h3>
            <h3>$ {totalAmmount}</h3>
          </div>

          <div className="shipping">
            <p>Shipping :</p>
            <p>$ 6</p>
          </div>

          <div className="orderTotal">
            <h2>OrderTotal</h2>
            <h2>$ {totalAmmount + 6}</h2>
          </div>

          <div className="checkoutButton">
            <button onClick={checkout}>Checkout</button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CheckoutTable;
