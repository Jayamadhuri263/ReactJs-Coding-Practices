import React from "react";
import { Link } from "react-router-dom";
import "./TechEra.css";

export default function TechEraHeader() {
  return (
    <div className="tech-era-header-container">
      <Link to="/tech-era" className="tech-era-header-button">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="logo"
          className="tech-era-header-logo"
        />
      </Link>
    </div>
  );
}
