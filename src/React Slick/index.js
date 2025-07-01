import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

function ReactSlick() {
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <h1 style={{ textAlign: "center" }}>1</h1>
        </div>
        <div>
          <h1 style={{ textAlign: "center" }}>2</h1>
        </div>
        <div>
          <h1 style={{ textAlign: "center" }}>3</h1>
        </div>
        <div>
          <h1 style={{ textAlign: "center" }}>4</h1>
        </div>
      </Slider>
    </div>
  );
}

export default ReactSlick;
