import React from "react";
import useFirestoreData from "../../customHooks/useFirestoreData";
import { Rating } from "react-simple-star-rating";
import "../../styles/home-products/ProductReview.css";

const ProductReview = ({ id }) => {
  const { data } = useFirestoreData("reviews");

  const review = data?.filter((item) => item?.productID === id);

  return (
    <section className="productReviewBar">
      {review.length > 0 ? (
        <div className="productReviewsList">
          {review?.map((item) => {
            return (
              <div className="reviewsInfo" key={item?.userId}>
                <div className="star">
                  <Rating
                    initialValue={item?.rating}
                    disableFillHover={false}
                    readonly={true}
                    size={20}
                  />
                </div>

                <div className="productReviewsMessage">
                  <p className="msg">{item?.review_message}</p>
                  <p className="date">{item?.reviewDate}</p>
                  <p className="userNameReview">{item?.userName}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="emptyReview">
          <p>No reviews found</p>
        </div>
      )}
    </section>
  );
};

export default ProductReview;
