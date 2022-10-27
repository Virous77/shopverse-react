import React from "react";
import "../../styles/cart/CheckoutSuccess.css";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <section className="paymentDone">
      <h1>Checkout Successful</h1>
      <p>Thank you to shopping with us!</p>

      <div className="backOrder">
        <Link to="/orders-history">
          <p>View order status</p>
        </Link>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
