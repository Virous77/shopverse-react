import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;

      const tempProducts = products.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.brand.toLowerCase().includes(search.toLowerCase())
      );

      state.filterProducts = tempProducts;
    },

    FILTER_BY_SORT(state, action) {
      const { products, sort } = action.payload;

      let tempSort = [];

      if (sort === "latest") {
        tempSort = products;
      }

      if (sort === "price-lowest") {
        tempSort = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "price-highest") {
        tempSort = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "name-az") {
        tempSort = products.slice().sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      }

      if (sort === "name-za") {
        tempSort = products.slice().sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
      }
      state.filterProducts = tempSort;
    },

    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;

      let tempCategory = products
        .slice()
        .filter((a) => a.category === category);

      if (category === "all") {
        tempCategory = products;
      }

      state.filterProducts = tempCategory;
    },

    FILTER_BY_BRAND(state, action) {
      const { products, brand } = action.payload;

      let tempBrand = products.slice().filter((a) => a.brand === brand);

      if (brand === "all") {
        tempBrand = products;
      }

      state.filterProducts = tempBrand;
    },

    FILTER_BY_PRICE(state, action) {
      const { products, price } = action.payload;

      let tempPrice = [];

      tempPrice = products.filter((product) => product.price <= price);

      state.filterProducts = tempPrice;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  FILTER_BY_SORT,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSlice.actions;
export const selectFilterProducts = (state) => state.filter.filterProducts;

export default filterSlice.reducer;
