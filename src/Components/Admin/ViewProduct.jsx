import React, { useState } from "react";
import "../../styles/AdminCss/ViewProduct.css";
import { db, storage } from "../../firebase/Firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import { useEffect } from "react";
import Loader from "../../UI/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import { useDispatch } from "react-redux";
import { SAVE_PRODUCTS } from "../../Redux/productSlice";
import useFirestoreData from "../../customHooks/useFirestoreData";
import { selectProducts } from "../../Redux/productSlice";
import { useSelector } from "react-redux";
import Pagination from "../pagination/Pagination";
import {
  FILTER_BY_SEARCH,
  selectFilterProducts,
} from "../../Redux/filterSlice";
import Search from "../Search";

const ViewProduct = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilterProducts);

  //Pagination States
  const [current, setCurrent] = useState(1);
  const productPage = 10;

  //Get current Products
  const lastIndexProduct = current * productPage;
  const firstIndexProduct = lastIndexProduct - productPage;
  const currentProducts = filteredProducts.slice(
    firstIndexProduct,
    lastIndexProduct
  );

  //Get all the datas
  const { data } = useFirestoreData("shopverseItem");

  useEffect(() => {
    dispatch(
      SAVE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  ////Delete Products
  const deleteProducts = async (id, imageURL) => {
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, "shopverseItem", `${id}`));

      const deleteRef = ref(storage, imageURL);
      await deleteObject(deleteRef);
      toast.success("Product deleted successfully!");
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong, Try again ");
    }
  };

  //Filter Dispatch
  useEffect(() => {
    dispatch(
      FILTER_BY_SEARCH({
        products,
        search,
      })
    );
  }, [dispatch, search, products]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="searchView">
        <h1>All Products</h1>
        <p>{filteredProducts?.length} Products Found</p>

        <div className="searchBoxView">
          <Search search={search} setSearch={setSearch} />
        </div>
      </div>
      <section className="LiveProduct">
        {!products ? (
          <div className="emptyProducts">No product live right now</div>
        ) : (
          <div className="productList">
            <div className="productListHead">
              <p>Number</p>
              <p>Image</p>
              <p>Name</p>
              <p className="centerView">Category</p>
              <p className="centerView">Price</p>
              <p className="actions">Actions</p>
            </div>

            <div className="productsLiveList">
              {currentProducts.map((product, idx) => {
                const { id, title, imageURL, category, price } = product;

                return (
                  <div className="showList" key={id}>
                    <p>{idx + 1}</p>
                    <img src={imageURL} alt={title} />
                    <p>{title}</p>
                    <p className="centerView">{category}</p>
                    <p className="centerView">${price}</p>
                    <div className="productActions">
                      <Link to={`/admin/add-product/${id}`}>
                        <button className="edit">Edit</button>
                      </Link>
                      <button
                        className="delete"
                        onClick={() => deleteProducts(id, imageURL)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
      <div className="pagi">
        <Pagination
          productPage={productPage}
          totalProducts={products.length}
          setCurrent={setCurrent}
          current={current}
        />
      </div>
    </>
  );
};

export default ViewProduct;
