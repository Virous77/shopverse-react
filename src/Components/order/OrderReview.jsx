import React, { useState } from "react";
import "../../styles/order/OrderReview.css";
import useFetchSingleProduct from "../../customHooks/useFetchSingleProduct";
import Loader from "../../UI/Loader";
import { ImCancelCircle } from "react-icons/im";
import { motion } from "framer-motion";
import LeaveReview from "./LeaveReview";

const OrderReview = ({ id, setShowReview }) => {
  const { userData, loading } = useFetchSingleProduct("orders", id);
  const { cartItem, orderAmount, orderStatus } = userData;
  const [showLeaveReview, setShowLeaveReview] = useState(false);

  if (loading) return <Loader />;
  return (
    <section>
      <motion.div
        className="overlay"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>
      <motion.main
        className="reviewBar"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="cancelReview">
          <ImCancelCircle
            className="cancelIcon"
            onClick={() => setShowReview(false)}
          />
        </div>

        <div className="orderDetails">
          <h1>Order Details</h1>

          <div className="backOrders">
            <button onClick={() => setShowReview(false)}>
              &larr; Back to Order
            </button>
          </div>

          <div className="orderId">
            <p>
              <span>Order ID: </span>
              {id}
            </p>
            <p>
              <span>Order Amount: </span> ${orderAmount}
            </p>
            <p>
              <span>Order Status: </span>
              {orderStatus}
            </p>
          </div>

          <table className="reviewTable">
            <thead>
              <tr>
                <th>Product</th>
                <th className="review768">Price</th>
                <th className="review768">Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>

            {cartItem?.map((item) => (
              <tbody key={item.id}>
                <tr>
                  <td className="reviewTitle">
                    <p>{item.title}</p>
                    <img src={item.imageURL} alt={item.title} />
                  </td>
                  <td className="review768">${item.price}</td>
                  <td className="review768">{item.cartQuantity}</td>
                  <td>${item.price * item.cartQuantity}</td>
                  <td>
                    <button
                      className="leaveReview"
                      onClick={() => {
                        setShowLeaveReview(true);
                      }}
                    >
                      Leave Review
                    </button>
                  </td>
                </tr>
                {showLeaveReview && (
                  <LeaveReview
                    id={item.id}
                    setShowLeaveReview={setShowLeaveReview}
                  />
                )}
              </tbody>
            ))}
          </table>
        </div>
      </motion.main>
    </section>
  );
};

export default OrderReview;
