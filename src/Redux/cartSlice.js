import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const localstorageData = () => {
  const data = localStorage.getItem("shopverse")
    ? JSON.parse(localStorage.getItem("shopverse"))
    : [];

  return data;
};

const initialState = {
  cartItem: localstorageData(),
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  prevUrl: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItem.findIndex(
        (index) => index.id === action.payload.id
      );

      if (state.cartItem.qty < 0) return;

      if (productIndex >= 0) {
        if (state.cartItem[productIndex].qty > 0) {
          state.cartItem[productIndex].qty -= 1;
          state.cartItem[productIndex].cartQuantity += 1;
        } else {
          toast.error(
            `${action.payload.title.toUpperCase()} is not is stock now.`
          );
          return;
        }
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };

        state.cartItem.push(tempProduct);
        toast.success(`${action.payload.title} added to Cart!!`);
      }

      localStorage.setItem("shopverse", JSON.stringify(state.cartItem));
    },

    DECREASE_CART(state, action) {
      const productIndex = state.cartItem.findIndex(
        (index) => index.id === action.payload.id
      );

      if (state.cartItem[productIndex].cartQuantity > 1) {
        state.cartItem[productIndex].cartQuantity -= 1;
        state.cartItem[productIndex].qty += 1;
      } else if (state.cartItem[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItem.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItem = newCartItem;
        toast.info(`${action.payload.title} removed from cart.`);
      }

      localStorage.setItem("shopverse", JSON.stringify(state.cartItem));
    },

    DELETE_ITEM(state, action) {
      const tempItem = state.cartItem.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartItem = tempItem;
      toast.info(`${action.payload.title} removed from cart.`);

      localStorage.setItem("shopverse", JSON.stringify(state.cartItem));
    },

    CLEAR_CART(state) {
      state.cartItem = [];
      localStorage.setItem("shopverse", JSON.stringify(state.cartItem));
    },

    CALCULATE_SUB_TOTAL(state, action) {
      const array = [];

      state.cartItem?.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmmount = price * cartQuantity;
        return array.push(cartItemAmmount);
      });

      const total = array?.reduce((curr, acc) => curr + acc, 0);

      state.cartTotalAmount = total;
    },

    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];

      state.cartItem?.map((item) => {
        const { cartQuantity } = item;
        const cartItemAmmount = cartQuantity;
        return array.push(cartItemAmmount);
      });

      const total = array?.reduce((curr, acc) => curr + acc, 0);

      state.cartTotalQuantity = total;
    },

    SAVE_URL(state, action) {
      state.prevUrl = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  DELETE_ITEM,
  CLEAR_CART,
  CALCULATE_SUB_TOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
} = cartSlice.actions;
export const selectCartItem = (state) => state.cart.cartItem;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPrevurl = (state) => state.cart.prevUrl;

export default cartSlice.reducer;
