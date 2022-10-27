import React, { useState, useEffect } from "react";
import "../../styles/Slider.css";
import { sliderData } from "./slider-data";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  let autoScroll = true;
  let slideInterval;
  let timeInterverl = 5000;

  const leftArrow = () => {
    setCurrentSlide(
      currentSlide === 0 ? sliderData.length - 1 : currentSlide - 1
    );
  };

  const rightArrow = () => {
    setCurrentSlide(
      currentSlide === sliderData.length - 1 ? 0 : currentSlide + 1
    );
  };

  //AutoScrool Setup
  const autoScrollTime = () => {
    slideInterval = setInterval(rightArrow, timeInterverl);
  };

  useEffect(() => {
    if (autoScroll) {
      autoScrollTime();
    }

    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <main>
      {sliderData.map((image, idx) => (
        <div key={idx}>
          {idx === currentSlide && (
            <li className="homeImageList">
              <div className="homeImg">
                <img src={image.image} alt="" />
              </div>

              <div className="listImgInfo">
                <h1>{image.heading}</h1>
                <p>{image.desc}</p>
                <p className="line"></p>
                <Link to="/explore">Shop Now</Link>
              </div>

              <div className="dic">
                <div className="arrow">
                  <div className="leftArrow" onClick={leftArrow}>
                    <FaArrowLeft className="leftIcon" />
                  </div>

                  <div className="rightArrow">
                    <FaArrowRight className="rightArrow" onClick={rightArrow} />
                  </div>
                </div>
              </div>
            </li>
          )}
        </div>
      ))}
    </main>
  );
};

export default Slider;
