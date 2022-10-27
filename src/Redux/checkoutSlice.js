import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAdd: {},
  billingAdd: {},
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_SHIPPING_ADD(state, action) {
      state.shippingAdd = action.payload;
    },

    SAVE_BILLING_ADD(state, action) {
      state.billingAdd = action.payload;
    },
  },
});

export const { SAVE_BILLING_ADD, SAVE_SHIPPING_ADD } = checkoutSlice.actions;

export const selectShippingAdd = (state) => state.checkout.shippingAdd;

export const selectBillingAdd = (state) => state.checkout.billingAdd;

export default checkoutSlice.reducer;
