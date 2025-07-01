import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function RouterHome() {
  return (
    <div className="routing-mini-container">
      <li style={{ listStyleType: "none", textDecoration: "none" }}>
        <Link to="/routerHome" className="link-class-name">
          Home
        </Link>
      </li>
      <li style={{ listStyleType: "none", textDecoration: "none" }}>
        <Link to="/about" className="link-class-name">
          About
        </Link>
      </li>
      <li style={{ listStyleType: "none", textDecoration: "none" }}>
        <Link to="/contact" className="link-class-name">
          Contact
        </Link>
      </li>
      <div className="router-home-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/home-blog-img.png"
          alt="home"
          className="home-image"
        />
        <h1>Home</h1>
      </div>
    </div>
  );
}
