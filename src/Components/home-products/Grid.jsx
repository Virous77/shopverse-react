import React from "react";
import "../../styles/home-products/Grid.css";
import { Link } from "react-router-dom";
import { shorting } from "../../Utils/data";
import { useDispatch } from "react-redux";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from "../../Redux/cartSlice";

const Grid = ({ products }) => {
  const dispatch = useDispatch();

  const sendToCart = (products) => {
    dispatch(ADD_TO_CART(products));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <section className="homeProducts">
      {products.map((product) => {
        const { id, imageURL, title, price } = product;

        return (
          <div className="productGrid" key={id}>
            <Link to={`/product-detail/${id}`}>
              <img src={imageURL} alt={title} />
            </Link>

            <div className="productInfo">
              <p>
                <span>$</span>
                {price}
              </p>
              <h3>{shorting(title, 15)}</h3>
            </div>

            <div className="addTocart">
              <button onClick={() => sendToCart(product)}>Add to Cart</button>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Grid;
