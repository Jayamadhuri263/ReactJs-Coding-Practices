import React from "react";
import { IoIosBriefcase } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { withRouter } from "../Protected Route";
import "../index.css";

function JobbyAppHeader() {
  let navigate = useNavigate();
  const onLogOut = () => {
    Cookies.remove("jwt_token");
    navigate("/jobbyApp-login");
  };

  return (
    <div className="jobby-app-header-main-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="jobby-logo"
        className="jobby-app-header-logo"
      />
      <div className="jobby-app-header-mini-container">
        <Link to="/jobbyApp-home" className="jobby-app-header-link">
          <AiFillHome
            size={30}
            color="#fff"
            className="jobby-app-header-icon"
          />
          <h1 className="jobby-app-header-name">Home</h1>
        </Link>
        <Link to="/jobbyApp-jobs" className="jobby-app-header-link">
          <IoIosBriefcase
            size={30}
            color="#fff"
            className="jobby-app-header-icon"
          />
          <h1 className="jobby-app-header-name">Jobs</h1>
        </Link>
        <button
          type="button"
          className="jobby-app-header-button"
          onClick={onLogOut}
        >
          <FiLogOut size={30} color="#fff" />
          <h1 className="jobby-app-header-button-name">Logout</h1>
        </button>
        <button
          type="button"
          className="jobby-app-header-button-name"
          onClick={onLogOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default withRouter(JobbyAppHeader);
