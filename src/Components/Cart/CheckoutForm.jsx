import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutSummary from "./CheckoutSummary";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../styles/cart/CheckoutForm.css";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/Firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId, selectEmail } from "../../Redux/authSlice";
import {
  selectCartItem,
  selectCartTotalAmount,
  CLEAR_CART,
} from "../../Redux/cartSlice";
import { selectShippingAdd } from "../../Redux/checkoutSlice";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector(selectEmail);
  const userId = useSelector(selectUserId);
  const cartItem = useSelector(selectCartItem);
  const userShippingAdd = useSelector(selectShippingAdd);
  const totalAmount = useSelector(selectCartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();

    const orderConfig = {
      userId,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: totalAmount,
      orderStatus: "Order Placed...",
      cartItem,
      userShippingAdd,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "orders"), orderConfig);
      navigate("/checkout-success");
      dispatch(CLEAR_CART());
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/checkout-success",
        },

        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }

        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment Successful");
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <section className="paymentBar">
      <div>
        <CheckoutSummary />
      </div>
      <div className="payment">
        <form onSubmit={handleSubmit}>
          <div className="paymentAction">
            <h3>Stripe Payment</h3>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner" id="spinner">
                    <p>Processing...</p>
                  </div>
                ) : (
                  "Pay now"
                )}
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;
