import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import filterSlice from "./filterSlice";
import cartSlice from "./cartSlice";
import checkoutSlice from "./checkoutSlice";
import orderSlice from "./orderSlice";

const Reducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterSlice,
  cart: cartSlice,
  checkout: checkoutSlice,
  order: orderSlice,
});

const Store = configureStore({
  reducer: Reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
