import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../index.css";
import { withRouter } from "../Protected Route";

function AuthenticationIntroHeader() {
  let navigate = useNavigate();
  const onLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/authenticationLogin");
  };

  return (
    <div className="authentication-intro-header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className="login-website-logo-image-header"
        alt="website logo"
      />
      <div className="authentication-intro-header-container-mini">
        <Link to="/authenticationHome" className="header-home-intro">
          Home
        </Link>
        <Link to="/authenticationProducts" className="header-home-intro">
          Products
        </Link>
        <Link to="/authenticationCart" className="header-home-intro">
          Cart
        </Link>
        <button
          type="button"
          className="submit-button header-logout-button"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default withRouter(AuthenticationIntroHeader);
