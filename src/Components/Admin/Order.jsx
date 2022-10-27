import React, { useEffect, useState } from "react";
import "../../styles/AdminCss/Order.css";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreData from "../../customHooks/useFirestoreData";
import { STORE_ORDERS } from "../../Redux/orderSlice";
import Loader from "../../UI/Loader";
import { selectOrderHistory } from "../../Redux/orderSlice";
import OrderDetails from "./OrderDetails";

const Order = () => {
  const { data, loading } = useFirestoreData("orders");
  const [orderId, setOrderId] = useState("");

  const [showOrder, setShowOrder] = useState(false);

  const dispatch = useDispatch();
  const orders = useSelector(selectOrderHistory);

  const handleOrderId = (id) => {
    setOrderId(id);
  };

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  if (loading) return <Loader />;

  return (
    <section className="orderStatusBar">
      <div className="orderStatusWrap">
        <div className="orderStatusHead">
          <h1>Shopverse Order History</h1>
        </div>

        <div className="ordersList">
          {orders.length === 0 ? (
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
                  <th className="review768">Order Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>

              {orders?.map((order, idx) => (
                <tbody key={order.id}>
                  <tr
                    onClick={() => {
                      handleOrderId(order.id);
                      setShowOrder(true);
                    }}
                  >
                    <td>{idx + 1}</td>
                    <td>
                      {order.orderDate}
                      <span> at </span>
                      {order.orderTime}
                    </td>
                    <td>{order.id}</td>
                    <td className="review768">${order.orderAmount}</td>
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
      {showOrder && <OrderDetails id={orderId} setShowOrder={setShowOrder} />}
    </section>
  );
};

export default Order;
