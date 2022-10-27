import React, { useEffect, useState } from "react";
import "../../styles/order/OrderStatus.css";
import useFirestoreData from "../../customHooks/useFirestoreData";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ORDERS, selectOrderHistory } from "../../Redux/orderSlice";
import { selectUserId } from "../../Redux/authSlice";
import Loader from "../../UI/Loader";
import OrderReview from "./OrderReview";

const OrderStatus = () => {
  const { data, loading } = useFirestoreData("orders");
  const [reviewId, setReviewId] = useState("");

  const [showReview, setShowReview] = useState(false);

  const dispatch = useDispatch();
  const orders = useSelector(selectOrderHistory);
  const userId = useSelector(selectUserId);

  const filterOrder = orders.filter((order) => order.userId === userId);

  const orderIdReview = (id) => {
    setReviewId(id);
  };

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  if (loading) return <Loader />;

  return (
    <section className="orderStatusBar">
      <div className="orderStatusWrap">
        <div className="orderStatusHead">
          <h1>Order History</h1>
          <p>
            Open an oder to leave a <b>Product Review</b>
          </p>
        </div>

        <div className="ordersList">
          {filterOrder.length === 0 ? (
            <div className="emptyOrder">
              <p>No order Found</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Order Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>

              {filterOrder?.map((order, idx) => (
                <tbody key={order.id}>
                  <tr
                    onClick={() => {
                      orderIdReview(order.id);
                      setShowReview(true);
                    }}
                  >
                    <td>{idx + 1}</td>
                    <td>
                      {order.orderDate}
                      <span> at </span>
                      {order.orderTime}
                    </td>
                    <td>{order.id}</td>
                    <td>${order.orderAmount}</td>
                    <td
                      className={
                        order.orderStatus === "Order Placed..."
                          ? "orderPlaced"
                          : "orderDeliverd"
                      }
                    >
                      {order.orderStatus}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </div>
      </div>
      {showReview && (
        <OrderReview id={reviewId} setShowReview={setShowReview} />
      )}
    </section>
  );
};

export default OrderStatus;
