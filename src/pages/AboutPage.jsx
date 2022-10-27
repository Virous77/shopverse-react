import React from "react";
import cool from "../assest/cool.jpg";
import "../styles/About.css";

const AboutPage = () => {
  return (
    <section className="shopverseAboutBar">
      <h1>Who we Are?</h1>

      <div className="shopverseAbout">
        <img src={cool} alt="About us" />

        <div>
          <div className="aboutWrap">
            <h2>ShopVerse</h2>

            <p className="aboutMessage">
              ShopVerse “Day 1” mentality is our approach of doing everything
              with the energy and entrepreneurial spirit of a new organization
              on its first day.
            </p>

            <p>
              Launched in 2022, Our technology platform connects to customers &
              helping in their multiple needs. Customers use our platform to
              search and discover new fashion trends clothes & gadgets , read
              and write customer generated reviews. We work every day to earn
              and keep customers’ trust. We do this through convenient services
              and the thousands of small and medium businesses that add
              significantly to our product selection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
