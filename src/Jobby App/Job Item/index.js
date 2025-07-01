import React, { Component } from "react";
import { AiFillStar } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { IoIosBriefcase } from "react-icons/io";
import { Link } from "react-router-dom";
import "../index.css";

export class JobItem extends Component {
  render() {
    const { jobDetails } = this.props;
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails;

    return (
      <Link to={`/jobs/${id}`} className="jobby-app-job-items-link">
        <div className="jobby-app-job-items-main-container">
          <div className="jobby-app-job-items-icon-name-container">
            <img
              src={companyLogoUrl}
              alt={title}
              className="jobby-app-job-items-company-logo"
            />
            <div className="jobby-app-job-items-name-rating-container">
              <h1 className="jobby-app-job-items-name-title">{title}</h1>
              <div className="jobby-app-job-items-icon-name-container">
                <AiFillStar size={25} color="#fbbf24" />
                <p className="jobby-app-job-items-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="jobby-app-job-items-location-salary-container">
            <div className="jobby-app-job-items-icon-name-container">
              <div className="jobby-app-job-items-icon-name-container">
                <MdLocationOn size={25} color="#f1f5f9" />
                <p className="jobby-app-job-items-location">{location}</p>
              </div>
              <div className="jobby-app-job-items-icon-name-container">
                <IoIosBriefcase size={25} color="#f1f5f9" />
                <p className="jobby-app-job-items-location">{employmentType}</p>
              </div>
            </div>
            <h1 className="jobby-app-job-items-package">{packagePerAnnum}</h1>
          </div>
          <hr
            className="jobby-app-jobs-hr-line"
            style={{ marginTop: "10px", marginBottom: "20px" }}
          />
          <p className="jobby-app-job-items-description-title">Description</p>
          <p className="jobby-app-job-items-description">{jobDescription}</p>
        </div>
      </Link>
    );
  }
}

export default JobItem;
