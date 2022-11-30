import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItem,
  selectCartTotalAmount,
  CALCULATE_SUB_TOTAL,
  CALCULATE_TOTAL_QUANTITY,
} from "../../Redux/cartSlice";
import { selectEmail } from "../../Redux/authSlice";
import { selectShippingAdd, selectBillingAdd } from "../../Redux/checkoutSlice";
import { toast } from "react-toastify";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutPayment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("Initializing checkout...");

  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItem);
  const totalAmmount = useSelector(selectCartTotalAmount);
  const userEmail = useSelector(selectEmail);
  const billingAdd = useSelector(selectBillingAdd);
  const shippingAdd = useSelector(selectShippingAdd);

  useEffect(() => {
    dispatch(CALCULATE_SUB_TOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItem]);

  const description = `shopverse: email: ${userEmail}, Ammounts: ${totalAmmount}`;

  useEffect(() => {
    fetch("https://shopverse.onrender.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItem,
        userEmail: userEmail,
        shipping: shippingAdd,
        billing: billingAdd,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })

      .catch((error) => {
        setMessage("failed to initialize checkout");
        toast.error("something went wrong!");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        {!clientSecret && <h3>{message}</h3>}
        <div className="checkForm">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </section>
    </>
  );
};

export default CheckoutPayment;
