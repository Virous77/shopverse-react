import React from "react";
import "./Loader.css";
import { ImSpinner2 } from "react-icons/im";

const Loader = () => {
  return (
    <main className="loader">
      <ImSpinner2 className="loaderIcon" />
    </main>
  );
};

export default Loader;
