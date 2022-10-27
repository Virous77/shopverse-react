import React from "react";
import { CountryDropdown } from "react-country-region-selector";

const CheckoutBilling = ({ submitCheckoutForm, handleBilling, billing }) => {
  return (
    <section className="checkoutBars">
      <div className="checkoutHeads">
        <p>Billing Address</p>
      </div>

      <div className="checkoutForm">
        <form onSubmit={submitCheckoutForm}>
          <div className="recipientName">
            <label name="name">Name</label>
            <input
              type="text"
              placeholder="Recipient Name"
              name="name"
              value={billing.name}
              onChange={(e) => handleBilling(e)}
            />
          </div>

          <div className="recipientName">
            <label name="line1">Address Line 1</label>
            <input
              type="text"
              placeholder="Address Line 1"
              name="line1"
              value={billing.line1}
              onChange={(e) => handleBilling(e)}
            />
          </div>

          <div className="recipientName">
            <label name="line2">Address Line 2</label>
            <input
              type="text"
              placeholder="Address Line 2"
              name="line2"
              value={billing.line2}
              onChange={(e) => handleBilling(e)}
            />
          </div>

          <div className="recipientName">
            <label name="city">City</label>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={billing.city}
              onChange={(e) => handleBilling(e)}
            />
          </div>

          <div className="recipientName">
            <label name="state">State</label>
            <input
              type="text"
              placeholder="State"
              name="state"
              value={billing.state}
              onChange={(e) => handleBilling(e)}
            />
          </div>

          <div className="recipientName">
            <label name="postalCode">Postal Code</label>
            <input
              type="text"
              placeholder="Postal Code"
              name="postalCode"
              value={billing.postalCode}
              onChange={(e) => handleBilling(e)}
            />
          </div>

          <div className="recipientName">
            <label name="country">Country</label>
            <CountryDropdown
              className="selectCountry"
              value={billing.country}
              onChange={(e) =>
                handleBilling({
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
              value={billing.phone}
              onChange={(e) => handleBilling(e)}
            />
          </div>

          <div className="checkButton">
            <button>Proceed to Checkout</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutBilling;
