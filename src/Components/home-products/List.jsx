import React from "react";
import "../../styles/home-products/List.css";
import { Link } from "react-router-dom";
import { shorting } from "../../Utils/data";

const List = ({ products }) => {
  return (
    <section className="list">
      {products.map((product) => {
        const { id, imageURL, title, price, description } = product;

        return (
          <div className="listProduct" key={id}>
            <div className="listImg">
              <img src={imageURL} alt={title} />
            </div>

            <div className="listProductInfo">
              <div className="listName">
                <h3>{title}</h3>
                <p className="listPrice">
                  <span>$</span>
                  {price}
                </p>
                <p>{shorting(description, 150)}</p>
              </div>

              <div className="listDetailsButton">
                <Link to={`/product-detail/${id}`}>
                  <button>Details</button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default List;
