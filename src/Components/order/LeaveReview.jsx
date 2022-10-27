import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { motion } from "framer-motion";
import "../../styles/order/LeaveReview.css";
import { selectProducts } from "../../Redux/productSlice";
import { selectUserId, selectUserName } from "../../Redux/authSlice";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase.config";

const LeaveReview = ({ setShowLeaveReview, id }) => {
  const [review, setReview] = useState("");
  const [rate, setRate] = useState(0);

  const products = useSelector(selectProducts);
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);

  const product = products.find((item) => item.id === id);

  const handleRating = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();

    const reviewConfig = {
      userId,
      userName,
      productID: id,
      rating: rate,
      review_message: review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted successfully!");
      setRate(0);
      setReview("");
      setShowLeaveReview(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section>
      <motion.div
        className="overlays"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>
      <motion.main
        className="leaveReviewBar"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="cancelReview">
          <ImCancelCircle
            className="cancelIcon"
            onClick={() => setShowLeaveReview(false)}
          />
        </div>

        <div className="wrapReview">
          <div className="leaveReviewItem">
            <div className="leaveHead">
              <h1>Rate This Product</h1>
            </div>

            <div className="leaveItem">
              <div className="itemLeave" key={product?.id}>
                <p>{product?.title}</p>
                <img src={product?.imageURL} alt={product?.title} />
              </div>
            </div>
          </div>

          <div className="rating">
            <div className="ratingHead">
              <p>Rating</p>
              <Rating onClick={(e) => setRate(e)} initialValue={rate} />
            </div>
          </div>

          <div className="reviewBox">
            <p>Review</p>

            <form onSubmit={handleRating}>
              <textarea
                name="review"
                cols="30"
                rows="10"
                placeholder="Write a Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>

              <button>Submit Rating</button>
            </form>
          </div>
        </div>
      </motion.main>
    </section>
  );
};

export default LeaveReview;
