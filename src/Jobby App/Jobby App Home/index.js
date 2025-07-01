import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import "../index.css";
import JobbyAppHeader from "../Jobby App Header";

export class JobbyAppHome extends Component {
  render() {
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken === undefined || jwtToken === null) {
      return <Navigate to="/jobbyApp-login" replace />;
    }

    return (
      <>
        <JobbyAppHeader />
        <div className="jobby-app-home-main-container">
          <h1 className="jobby-app-home-main-heading">
            find the job that fits your life
          </h1>
          <p className="jobby-app-home-description">
            Million of peoples are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobbyApp-jobs" className="jobby-app-header-link">
            <button className="jobby-app-home-jobs-button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </>
    );
  }
}

export default JobbyAppHome;
