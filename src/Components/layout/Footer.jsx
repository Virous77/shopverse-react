import React from "react";
import "../../styles/Footer.css";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {date} All Rights Reserve</p>
    </footer>
  );
};

export default Footer;
