import React from "react";
import "../../styles/AdminCss/OrderSetails.css";
import useFetchSingleProduct from "../../customHooks/useFetchSingleProduct";
import { motion } from "framer-motion";
import Loader from "../../UI/Loader";
import { ImCancelCircle } from "react-icons/im";
import ChangeOrderStatus from "./ChangeOrderStatus";

const OrderDetails = ({ id, setShowOrder }) => {
  const { userData, loading } = useFetchSingleProduct("orders", id);

  const { cartItem, orderAmount, orderStatus, userShippingAdd } = userData;

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
            onClick={() => setShowOrder(false)}
          />
        </div>

        <div className="orderDetails">
          <h1>Order Details</h1>

          <div className="backOrders">
            <button onClick={() => setShowOrder(false)}>
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

          <div className="orderAddress">
            <p>
              <span>Postal Code: </span>
              {userShippingAdd?.postalCode}
            </p>

            <p>
              <span>City: </span>
              {userShippingAdd?.city}
            </p>

            <p>
              <span>State: </span>
              {userShippingAdd?.state}
            </p>
            <p>
              <span>Country: </span>
              {userShippingAdd?.country}
            </p>
          </div>

          <table className="reviewTable">
            <thead>
              <tr>
                <th>Product</th>
                <th className="review768">Price</th>
                <th>Quantity</th>
                <th>Total</th>
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
                  <td>{item.cartQuantity}</td>
                  <td>${item.price * item.cartQuantity}</td>
                </tr>
              </tbody>
            ))}
          </table>
          <ChangeOrderStatus userData={userData} id={id} />
        </div>
      </motion.main>
    </section>
  );
};

export default OrderDetails;
