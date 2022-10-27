import React from "react";
import { useSelector } from "react-redux";
import {
  selectCartItem,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../Redux/cartSlice";
import "../../styles/cart/CheckoutSummary.css";

const CheckoutSummary = () => {
  const cartItem = useSelector(selectCartItem);
  const totalItem = useSelector(selectCartTotalQuantity);
  const totalAmount = useSelector(selectCartTotalAmount);

  return (
    <aside className="summaryBar">
      <div className="checkSummaryHead">
        <h2>Checkout Summary</h2>
      </div>

      <div className="summaryProduct">
        {cartItem.map((item) => {
          const { id, title, cartQuantity, price } = item;

          return (
            <div className="summaryListItem" key={id}>
              <b>{title}</b>
              <p>Quantity: {cartQuantity}</p>
              <p>Price: ${price}</p>
              <b>Set Price : ${price * cartQuantity}</b>
            </div>
          );
        })}
      </div>

      <div className="summaryInfo">
        <div className="summaryItem">
          <p>Total Item</p>
          <h3>{totalItem}</h3>
        </div>

        <div className="summarytotal">
          <p>Total Ammount</p>
          <h3>${totalAmount}</h3>
        </div>
      </div>
    </aside>
  );
};

export default CheckoutSummary;
