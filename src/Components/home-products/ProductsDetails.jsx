import React from "react";
import "../../styles/home-products/ProductsDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { ADD_TO_CART, DECREASE_CART } from "../../Redux/cartSlice";
import Loader from "../../UI/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartItem,
} from "../../Redux/cartSlice";
import useFetchSingleProduct from "../../customHooks/useFetchSingleProduct";
import ProductReview from "./ProductReview";

const ProductsDetails = () => {
  const { id } = useParams();

  const { userData, loading } = useFetchSingleProduct("shopverseItem", id);

  const productQuantity = useSelector(selectCartItem);
  const quantity = productQuantity?.find((item) => item.id === id);
  const { title, imageURL, description, qty, price, brand } = userData;

  const data = {
    id: id,
    title: title,
    imageURL,
    qty,
    price,
    brand,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendToCart = (products) => {
    dispatch(ADD_TO_CART(products));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const incCart = (products) => {
    dispatch(ADD_TO_CART(products));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decCart = (products) => {
    dispatch(DECREASE_CART(products));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="hero">
        <div className="backButton">
          <button onClick={() => navigate("/explore")}>
            Back to Products Page
          </button>
        </div>
      </div>

      <section className="detailHero">
        <div className="detailImg">
          <img src={imageURL} alt={title} />
        </div>

        <div className="detailInfo">
          <div className="detailHead">
            <h1>{title}</h1>
            <p>
              <span>$</span>
              {price}
            </p>
          </div>

          <p className="desc">{description}</p>

          <div className="detailStock">
            <div className="availible">
              <span>Available :</span>
              <p>{qty > 0 ? "In Stock" : "Out of Stock"}</p>
            </div>

            <div className="availible">
              <span>IDs :</span>
              <p>{id}</p>
            </div>

            <div className="availible">
              <span>Brand :</span>
              <p>{brand}</p>
            </div>

            {qty > 0 && (
              <div className="detailCartAction">
                {quantity?.cartQuantity > 0 && (
                  <div className="detailCount">
                    <button className="dec" onClick={() => decCart(data)}>
                      -
                    </button>
                    <p>
                      <b>{quantity?.cartQuantity}</b>
                    </p>
                    <button className="inc" onClick={() => incCart(data)}>
                      +
                    </button>
                  </div>
                )}

                <div className="addToCart">
                  <button onClick={() => sendToCart(data)}>Add To Cart</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="fixed">
        <h1>Reviews</h1>
      </div>
      <ProductReview id={id} />
    </>
  );
};

export default ProductsDetails;
