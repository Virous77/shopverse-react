import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory: [],
  totalEarning: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
      state.orderHistory = action.payload;
    },

    TOTAL_EARNING(state, action) {
      const prices = action.payload.map((item) => item.orderAmount);
      const totalAmount = prices.reduce((acc, curr) => acc + curr, 0);
      state.totalEarning = totalAmount;
    },
  },
});

export const { STORE_ORDERS, TOTAL_EARNING } = orderSlice.actions;
export const selectOrderHistory = (state) => state.order.orderHistory;
export const selectTotalEarning = (state) => state.order.totalEarning;

export default orderSlice.reducer;
