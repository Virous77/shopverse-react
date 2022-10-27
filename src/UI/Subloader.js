import React from "react";
import { ImSpinner2 } from "react-icons/im";
import "./Subloader.css";

const Subloader = () => {
  return (
    <main className="subloader">
      <ImSpinner2 className="subloaderIcon" />
    </main>
  );
};

export default Subloader;
