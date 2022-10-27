import React from "react";
import "../styles/Error.css";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="errorBar">
      <h1>Error 404</h1>
      <p>Page Not Found</p>

      <div className="backShopverseHome">
        <Link to="/">
          <h2>Back Home</h2>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
