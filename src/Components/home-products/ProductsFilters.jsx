import React from "react";
import "../../styles/home-products/ProductsFilters.css";
import { ImCross } from "react-icons/im";
import { motion } from "framer-motion";

const ProductsFilters = ({
  products,
  category,
  setCategory,
  brand,
  setBrand,
  minPrice,
  maxPrice,
  price,
  setPrice,
  clearFilter,
  showFilter,
  setShowFilter,
}) => {
  const uniqueCategory = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const uniqueBrand = [
    "all",
    ...new Set(products.map((product) => product.brand)),
  ];

  return (
    <>
      {showFilter && (
        <motion.aside
          className="filterbar"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="filterCategory">
            <div className="head">
              <h3>Category</h3>
              <ImCross
                className="filterCancel"
                onClick={() => setShowFilter(false)}
              />
            </div>

            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {uniqueCategory.map((category, idx) => (
                <option key={idx} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filterBrand">
            <h3>Brand</h3>

            <select
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              {uniqueBrand.map((brand, idx) => (
                <option key={idx} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div className="filterPrice">
            <h3>Price</h3>

            <p>
              <span>$</span>
              {price}
            </p>
            <input
              type="range"
              name="price"
              min={minPrice}
              max={maxPrice}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="filterButton">
            <button onClick={clearFilter}>Clear Filter</button>
          </div>
        </motion.aside>
      )}
    </>
  );
};

export default ProductsFilters;
