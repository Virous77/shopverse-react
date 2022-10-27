import React, { useEffect, useState } from "react";
import "../../styles/home-products/Products.css";
import {
  selectProducts,
  selectMaxPrice,
  selectMinPrice,
} from "../../Redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import useFirestoreData from "../../customHooks/useFirestoreData";
import { SAVE_PRODUCTS, GET_PRICE_RANGE } from "../../Redux/productSlice";
import ProductList from "./ProductList";
import { BsGrid1X2Fill, BsFilter } from "react-icons/bs";
import { MdFormatListBulleted } from "react-icons/md";
import { sortList } from "../../Utils/data";
import Search from "../Search";
import ProductsFilters from "./ProductsFilters";
import {
  FILTER_BY_SEARCH,
  selectFilterProducts,
  FILTER_BY_SORT,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} from "../../Redux/filterSlice";
import Loader from "../../UI/Loader";

const Products = () => {
  const products = useSelector(selectProducts);
  const filterProducts = useSelector(selectFilterProducts);
  const { data, loading } = useFirestoreData("shopverseItem");
  const dispatch = useDispatch();
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const [search, setSearch] = useState("");
  const [active, setActive] = useState(true);
  const [sort, setSort] = useState("latest");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [price, setPrice] = useState(maxPrice ? maxPrice : "10000");
  const [showFilter, setShowFilter] = useState(false);

  //Pagination States
  const [current, setCurrent] = useState(1);
  const productPage = 10;

  //Get current Products
  const lastIndexProduct = current * productPage;
  const firstIndexProduct = lastIndexProduct - productPage;
  const currentProducts = filterProducts.slice(
    firstIndexProduct,
    lastIndexProduct
  );

  useEffect(() => {
    dispatch(
      SAVE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data, products, minPrice, maxPrice]);

  useEffect(() => {
    dispatch(
      FILTER_BY_SEARCH({
        products,
        search,
      })
    );
  }, [dispatch, search, products]);

  useEffect(() => {
    dispatch(
      FILTER_BY_SORT({
        products,
        sort,
      })
    );
  }, [dispatch, sort, products]);

  useEffect(() => {
    dispatch(
      FILTER_BY_CATEGORY({
        products,
        category,
      })
    );
  }, [products, category, dispatch]);

  useEffect(() => {
    dispatch(
      FILTER_BY_BRAND({
        products,
        brand,
      })
    );
  }, [products, brand, dispatch]);

  useEffect(() => {
    dispatch(
      FILTER_BY_PRICE({
        products,
        price,
      })
    );
  }, [dispatch, products, price, minPrice, maxPrice, setPrice]);

  const sortFilter = (e) => setSort(e.target.value);

  const clearFilter = () => {
    setCategory("all");
    setBrand("all");
    setPrice(maxPrice);
  };

  if (loading) return <Loader />;

  return (
    <main style={{ position: "relative" }}>
      <ProductsFilters
        products={products}
        category={category}
        setCategory={setCategory}
        brand={brand}
        setBrand={setBrand}
        price={price}
        setPrice={setPrice}
        minPrice={minPrice}
        maxPrice={maxPrice}
        clearFilter={clearFilter}
        setShowFilter={setShowFilter}
        showFilter={showFilter}
      />
      <div className="productActionBar">
        <div className="productGridList">
          <BsFilter
            className={`filterIcon ${showFilter ? "fitActive" : "nonActive"}`}
            onClick={() => setShowFilter(true)}
          />

          <BsGrid1X2Fill
            className={`gridIcon ${active ? "active" : "notActive"}`}
            onClick={() => setActive(true)}
          />

          <MdFormatListBulleted
            className={`listIcon ${active ? "notActive" : "active"}`}
            onClick={() => setActive(false)}
          />
          <span>
            {filterProducts?.length > 0 ? filterProducts.length : "No"} Products
            Found
          </span>
        </div>

        <>
          <Search search={search} setSearch={setSearch} />
        </>

        <div className="productSort">
          <select name="sort" value={sort} onChange={sortFilter}>
            {sortList.map((list) => (
              <option key={list.id} value={list.value}>
                {list.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filterProducts?.length >= 1 ? (
        <ProductList
          products={currentProducts}
          loading={loading}
          active={active}
          productPage={productPage}
          totalProducts={filterProducts.length}
          setCurrent={setCurrent}
          current={current}
        />
      ) : (
        <div className="empty">No Products Found</div>
      )}
    </main>
  );
};

export default Products;
