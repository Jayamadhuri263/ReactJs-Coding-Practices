import React from "react";
import "./index.css";

function CongratsCard() {
  return (
    <div className="congratsCard-container">
      <h1 className="congrats-heading">Congratulations</h1>
      <div className="congrats-mini-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/congrats-card-profile-img.png"
          alt="congrats-profile"
          className="congrats-profile"
        />
        <h1 className="congrats-profile-name">Kiran V</h1>
        <p className="congrats-profile-description">
          Vishnu Institute of Computer Education and Technology, Bhimavaram
        </p>
        <img
          src="https://assets.ccbp.in/frontend/react-js/congrats-card-watch-img.png"
          alt="congrats-watch"
          className="congrats-profile"
        />
      </div>
    </div>
  );
}

export default CongratsCard;
