import React from "react";
import { useState } from "react";
import "../../styles/AdminCss/ChangeOrderStatus.css";
import { orderStatus } from "../../Utils/data";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/Firebase.config";
import { toast } from "react-toastify";

const ChangeOrderStatus = ({ userData, id }) => {
  const [status, setStatus] = useState("");

  const statusSubmit = (e, id) => {
    e.preventDefault();

    const orderConfig = {
      userId: userData.userId,
      userEmail: userData.userEmail,
      orderDate: userData.orderDate,
      orderTime: userData.orderTime,
      orderAmount: userData.orderAmount,
      orderStatus: status,
      cartItem: userData.cartItem,
      userShippingAdd: userData.userShippingAdd,
      createdAt: userData.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "orders", id), orderConfig);
      toast.success("Order Status Changed successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="changeOrderStatusBar">
      <h2>Update Order Status</h2>

      <form onSubmit={(e) => statusSubmit(e, id)}>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option disabled value="">
            Select one
          </option>
          {orderStatus.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <button>Submit</button>
      </form>
    </section>
  );
};

export default ChangeOrderStatus;
