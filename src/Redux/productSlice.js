import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  minPrice: null,
  maxPrice: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    SAVE_PRODUCTS(state, action) {
      state.products = action.payload.products;
    },

    GET_PRICE_RANGE(state, action) {
      const { products } = action.payload;

      let array = [];

      products.map((data) => {
        const price = data.price;
        return array.push(price);
      });

      const max = Math.max(...array);
      const min = Math.min(...array);

      state.maxPrice = max;
      state.minPrice = min;
    },
  },
});

export const { SAVE_PRODUCTS, GET_PRICE_RANGE } = productSlice.actions;
export const selectProducts = (state) => state.product.products;

export const selectMinPrice = (state) => state.product.minPrice;

export const selectMaxPrice = (state) => state.product.maxPrice;

export default productSlice.reducer;
