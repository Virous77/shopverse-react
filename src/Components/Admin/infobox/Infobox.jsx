import React from "react";
import "../../../styles/AdminCss/Infobox.css";

const Infobox = ({ title, count, icon }) => {
  return (
    <section className="infoboxBar">
      <h3>{title}</h3>

      <span>
        <h4>{count}</h4>
        <p>{icon}</p>
      </span>
    </section>
  );
};

export default Infobox;
