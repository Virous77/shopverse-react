import React from "react";
import "../../../styles/AdminCss/Chart.css";
import { selectOrderHistory } from "../../../Redux/orderSlice";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Tooltip,
  Legend,
  Title,
  BarElement,
  LinearScale,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const orderHistory = useSelector(selectOrderHistory);
  const orderList = orderHistory?.map((item) => item.orderStatus);

  console.log(orderList);

  const getorders = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };

  const [q1, q2, q3, q4] = [
    "Order Placed...",
    "Processing",
    "Shipped",
    "Deliverd",
  ];

  const placed = getorders(orderList, q1);
  const processing = getorders(orderList, q2);
  const shipped = getorders(orderList, q3);
  const Deliverd = getorders(orderList, q4);

  const labels = ["Placed Orders", "Processing", "Shipped", "Deliverd"];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: `Order Count`,
        data: [placed, processing, shipped, Deliverd],
        backgroundColor: `rgba(53, 162, 235, 0.5)`,
      },
    ],
  };

  return (
    <section className="chartBar">
      <h1>Order Summary Chart</h1>
      <Bar options={options} data={data} />
    </section>
  );
};

export default Chart;
