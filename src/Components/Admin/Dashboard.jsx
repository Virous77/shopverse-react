import React, { useEffect } from "react";
import "../../styles/AdminCss/Dashboard.css";
import Infobox from "./infobox/Infobox";
import { AiFillDollarCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import useFirestoreData from "../../customHooks/useFirestoreData";
import { TOTAL_EARNING, selectTotalEarning } from "../../Redux/orderSlice";

const Dashboard = () => {
  const totalEarning = useSelector(selectTotalEarning);

  const dispatch = useDispatch();

  const { data } = useFirestoreData("shopverseItem");
  const { data: order } = useFirestoreData("orders");

  useEffect(() => {
    dispatch(TOTAL_EARNING(order));
  }, [dispatch, order]);

  return (
    <section className="dashboardBar">
      <h1>Dashboard</h1>

      <div className="dashboard">
        <Infobox
          title={"Earnings"}
          count={`$${totalEarning}`}
          icon={<AiFillDollarCircle />}
        />

        <Infobox
          title={"Products"}
          count={data?.length}
          icon={<AiOutlineShoppingCart />}
        />

        <Infobox
          title={"Orders"}
          count={order?.length}
          icon={<BsFillCartPlusFill />}
        />
      </div>
    </section>
  );
};

export default Dashboard;
