import React from "react";
import Loader from "../../UI/Loader";
import Grid from "./Grid";
import List from "./List";
import Pagination from "../pagination/Pagination";

const ProductList = ({
  products,
  loading,
  active,
  productPage,
  totalProducts,
  setCurrent,
  current,
}) => {
  if (loading) return <Loader />;

  return (
    <>
      {active ? <Grid products={products} /> : <List products={products} />}
      <Pagination
        productPage={productPage}
        totalProducts={totalProducts}
        setCurrent={setCurrent}
        current={current}
      />
    </>
  );
};

export default ProductList;
