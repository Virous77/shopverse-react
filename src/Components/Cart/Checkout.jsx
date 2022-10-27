import React, { useState } from "react";
import "../../styles/cart/Checkout.css";
import { CountryDropdown } from "react-country-region-selector";
import CheckoutBilling from "./CheckoutBilling";
import { SAVE_BILLING_ADD, SAVE_SHIPPING_ADD } from "../../Redux/checkoutSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const initialAddress = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  phone: "",
};

const Checkout = () => {
  const [shipping, setShipping] = useState({ ...initialAddress });
  const [billing, setBilling] = useState({ ...initialAddress });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBilling({ ...billing, [name]: value });
  };

  const submitCheckoutForm = (e) => {
    e.preventDefault();

    const { name, country, state, line1, line2, city, phone, postalCode } =
      shipping;

    if (
      !name ||
      !country ||
      !state ||
      !line1 ||
      !line2 ||
      !city ||
      !phone ||
      !postalCode
    ) {
      toast.error("All fields must be fill before proceed!");

      return;
    } else {
      dispatch(SAVE_BILLING_ADD(billing));
      dispatch(SAVE_SHIPPING_ADD(shipping));

      navigate("/checkout-payment");
    }
  };

  return (
    <>
      <Link to="/cart">
        <p className="backCart">Back to Cart</p>
      </Link>
      <section className="checkWrap">
        <div className="checkoutBar">
          <div className="checkoutHead">
            <h2>Checkout Details</h2>

            <p>Shipping Address</p>
          </div>

          <div className="checkoutForm">
            <form onSubmit={submitCheckoutForm}>
              <div className="recipientName">
                <label name="name">Recipient Name</label>
                <input
                  type="text"
                  placeholder="Recipient Name"
                  name="name"
                  value={shipping.name}
                  onChange={(e) => handleShipping(e)}
                />
              </div>

              <div className="recipientName">
                <label name="line1">Address Line 1</label>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  name="line1"
                  value={shipping.line1}
                  onChange={(e) => handleShipping(e)}
                />
              </div>

              <div className="recipientName">
                <label name="line2">Address Line 2</label>
                <input
                  type="text"
                  placeholder="Address Line 2"
                  name="line2"
                  value={shipping.line2}
                  onChange={(e) => handleShipping(e)}
                />
              </div>

              <div className="recipientName">
                <label name="city">City</label>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={shipping.city}
                  onChange={(e) => handleShipping(e)}
                />
              </div>

              <div className="recipientName">
                <label name="state">State</label>
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  value={shipping.state}
                  onChange={(e) => handleShipping(e)}
                />
              </div>

              <div className="recipientName">
                <label name="postalCode">Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  name="postalCode"
                  value={shipping.postalCode}
                  onChange={(e) => handleShipping(e)}
                />
              </div>

              <div className="recipientName">
                <label name="country">Country</label>
                <CountryDropdown
                  className="selectCountry"
                  value={shipping.country}
                  onChange={(e) =>
                    handleShipping({
                      target: {
                        name: "country",
                        value: e,
                      },
                    })
                  }
                />
              </div>

              <div className="recipientName">
                <label name="phone">Mobile No.</label>
                <input
                  type="text"
                  placeholder="Mobile No."
                  name="phone"
                  maxlength="12"
                  value={shipping.phone}
                  onChange={(e) => handleShipping(e)}
                />
              </div>
            </form>
          </div>
        </div>
        <CheckoutBilling
          billing={billing}
          handleBilling={handleBilling}
          submitCheckoutForm={submitCheckoutForm}
        />
      </section>
    </>
  );
};

export default Checkout;
