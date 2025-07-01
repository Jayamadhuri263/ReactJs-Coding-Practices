import React, { Component } from "react";
import { BsSearch } from "react-icons/bs";
import { Hearts } from "react-loader-spinner";
import Cookies from "js-cookie";
import "../index.css";
import JobbyAppHeader from "../Jobby App Header";
import JobItem from "../Job Item";

const employmentTypesList = [
  {
    label: "Full Time",
    employmentTypeId: "FULLTIME",
  },
  {
    label: "Part Time",
    employmentTypeId: "PARTTIME",
  },
  {
    label: "Freelance",
    employmentTypeId: "FREELANCE",
  },
  {
    label: "Internship",
    employmentTypeId: "INTERNSHIP",
  },
];

const salaryRangesList = [
  {
    salaryRangeId: "1000000",
    label: "10 LPA and above",
  },
  {
    salaryRangeId: "2000000",
    label: "20 LPA and above",
  },
  {
    salaryRangeId: "3000000",
    label: "30 LPA and above",
  },
  {
    salaryRangeId: "4000000",
    label: "40 LPA and above",
  },
];

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const apiJobsStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

export class JobbyAppJobs extends Component {
  state = {
    searchInputJob: "",
    profileDetails: [],
    apiProfileStatus: apiStatusConstants.initial,
    jobsData: [],
    radioInput: "",
    apiJobStatus: apiJobsStatusConstants.initial,
    checkboxInput: [],
  };

  componentDidMount() {
    this.getProfileDetails();
    this.getJobsDetails();
  }

  getProfileDetails = async () => {
    this.setState({ apiProfileStatus: apiStatusConstants.inProgress });
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch("https://apis.ccbp.in/profile", options);
    if (response.ok) {
      const dataResponse = [await response.json()];
      const fetchedData = dataResponse.map((each) => ({
        name: each.profile_details.name,
        profileImageUrl: each.profile_details.profile_image_url,
        shortBio: each.profile_details.short_bio,
      }));
      this.setState({
        profileDetails: fetchedData,
        responseSuccess: true,
        apiProfileStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({ apiProfileStatus: apiStatusConstants.failure });
    }
  };

  getJobsDetails = async () => {
    const { searchInputJob, radioInput, checkboxInput } = this.state;
    this.setState({ apiJobStatus: apiJobsStatusConstants.inProgress });
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${checkboxInput}&minimum_package=${radioInput}&search=${searchInputJob}`,
      options
    );
    if (response.ok) {
      const data = await response.json();
      const fetchedJobData = data.jobs.map((job) => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }));
      console.log(fetchedJobData);
      this.setState({
        apiJobStatus: apiJobsStatusConstants.success,
        jobsData: fetchedJobData,
      });
    } else {
      this.setState({ apiJobStatus: apiJobsStatusConstants.failure });
    }
  };

  onSearchInputJob = (event) => {
    this.setState({ searchInputJob: event.target.value }, this.getJobsDetails);
  };

  onRetryProfileDetails = () => {
    this.getProfileDetails();
  };

  onRetryJobDetails = () => {
    this.getJobsDetails();
  };

  renderProfileSuccessView = () => {
    const { profileDetails, responseSuccess } = this.state;
    if (responseSuccess) {
      const { name, profileImageUrl, shortBio } = profileDetails[0];
      return (
        <div
          className="jobby-app-jobs-profile-filter-main-container"
          style={{ paddingLeft: "0px" }}
        >
          <div className="jobby-app-jobs-profile-main-container">
            <img src={profileImageUrl} alt={name} className="vbhddj" />
            <h1 className="jobby-app-jobs-profile-name">{name}</h1>
            <p className="jobby-app-jobs-profile-bio">{shortBio}</p>
          </div>
        </div>
      );
    }
  };

  renderProfileFailureView = () => {
    return (
      <div
        className="jobby-app-jobs-profile-failure-view-container"
        style={{ paddingLeft: "45px" }}
      >
        <button
          type="button"
          className="jobby-app-home-jobs-button"
          onClick={this.onRetryProfileDetails}
        >
          Retry
        </button>
      </div>
    );
  };

  renderProfileLoadingView = () => {
    return (
      <div
        className="jobby-app-jobs-profile-failure-view-container"
        data-testid="loader"
        style={{ paddingLeft: "45px" }}
      >
        <Hearts color="#4f46e5" size={60} />
      </div>
    );
  };

  onChangeCheckboxJob = (event) => {
    const { checkboxInput } = this.state;
    const inputNotInList = checkboxInput.filter(
      (each) => each === event.target.id
    );
    if (inputNotInList.length === 0) {
      this.setState(
        (prevState) => ({
          checkboxInput: [...prevState.checkboxInput, event.target.id],
        }),
        this.getJobsDetails
      );
    } else {
      const filteredData = checkboxInput.filter(
        (each) => each !== event.target.id
      );
      this.setState({ checkboxInput: filteredData }, this.getJobsDetails);
    }
  };

  onChangeRadioButton = (event) => {
    this.setState({ radioInput: event.target.id }, this.getJobsDetails);
  };

  renderTypeOfEmployment = () => {
    return (
      <div className="jobby-app-jobs-employment-type-container">
        {employmentTypesList.map((eachType) => (
          <li
            className="jobby-app-jobs-employment-type-list-container"
            key={eachType.employmentTypeId}
          >
            <input
              type="checkbox"
              id={eachType.employmentTypeId}
              onChange={this.onChangeCheckboxJob}
              className="jobby-app-jobs-employment-type-list-input"
            />
            <label
              htmlFor={eachType.employmentTypeId}
              className="jobby-app-jobs-employment-type-list-label"
            >
              {eachType.label}
            </label>
          </li>
        ))}
      </div>
    );
  };

  renderSalaryRange = () => {
    return (
      <div className="jobby-app-jobs-employment-type-container">
        {salaryRangesList.map((eachType) => (
          <li
            className="jobby-app-jobs-employment-type-list-container"
            key={eachType.salaryRangeId}
          >
            <input
              type="radio"
              id={eachType.salaryRangeId}
              onChange={this.onChangeRadioButton}
              name="option"
              className="jobby-app-jobs-employment-type-list-input"
            />
            <label
              htmlFor={eachType.salaryRangeId}
              className="jobby-app-jobs-employment-type-list-label"
            >
              {eachType.label}
            </label>
          </li>
        ))}
      </div>
    );
  };

  renderProfileStatus = () => {
    const { apiProfileStatus } = this.state;
    switch (apiProfileStatus) {
      case "SUCCESS":
        return this.renderProfileSuccessView();
      case "FAILURE":
        return this.renderProfileFailureView();
      case "IN_PROGRESS":
        return this.renderProfileLoadingView();
      default:
        return null;
    }
  };

  renderJobFailureView = () => {
    return (
      <div className="jobby-app-jobs-jobs-failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure"
          className="jobby-app-jobs-jobs-failure-view-image"
        />
        <h1 className="jobby-app-jobs-jobs-failure-view-main-heading">
          Oops! Something went wrong
        </h1>
        <p className="jobby-app-jobs-jobs-failure-view-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="jobby-app-home-jobs-button"
          onClick={this.onRetryJobDetails}
        >
          Retry
        </button>
      </div>
    );
  };

  renderJobSuccessView = () => {
    const { jobsData, searchInputJob } = this.state;
    if (jobsData.length === 0) {
      return (
        <div className="jobby-app-jobs-jobs-failure-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="jobby-app-jobs-jobs-failure-view-image"
          />
          <h1 className="jobby-app-jobs-jobs-failure-view-main-heading">
            No Jobs Found
          </h1>
          <p className="jobby-app-jobs-jobs-failure-view-description">
            We could not find any jobs. Try other filters
          </p>
        </div>
      );
    }
    return (
      <div className="gbvgvddjb">
        <div className="jobby-app-jobs-search-container-large">
          <input
            type="search"
            value={searchInputJob}
            className="jobby-app-jobs-search-input"
            onChange={this.onSearchInputJob}
            placeholder="Search"
          />
          <button type="button" className="jobby-app-jobs-search-button">
            <BsSearch size={26} color="#f1f5f9" />
          </button>
        </div>

        <div className="jobby-app-jobs-job-success-view-container">
          {jobsData.map((job) => (
            <JobItem key={job.id} jobDetails={job} />
          ))}
        </div>
      </div>
    );
  };

  renderJobStatus = () => {
    const { apiJobStatus } = this.state;
    console.log(apiJobStatus);
    switch (apiJobStatus) {
      case "SUCCESS":
        return this.renderJobSuccessView();
      case "FAILURE":
        return this.renderJobFailureView();
      // case "IN_PROGRESS":
      //   return this.renderProfileLoadingView();
      default:
        return null;
    }
  };

  render() {
    const { searchInputJob } = this.state;

    return (
      <>
        <JobbyAppHeader />
        <div className="jobby-app-jobs-main-container">
          <div className="jobby-app-jobs-search-container">
            <input
              type="search"
              value={searchInputJob}
              className="jobby-app-jobs-search-input"
              onChange={this.onSearchInputJob}
              placeholder="Search"
            />
            <button type="button" className="jobby-app-jobs-search-button">
              <BsSearch size={26} color="#f1f5f9" />
            </button>
          </div>
          <div className="jfdvbfn">
            {this.renderProfileStatus()}
            <hr className="jobby-app-jobs-hr-line" />
            <h1 className="jobby-app-jobs-employment-type-heading">
              Type of Employee
            </h1>
            {this.renderTypeOfEmployment()}
            <hr
              className="jobby-app-jobs-hr-line"
              style={{ marginTop: "30px" }}
            />
            <h1 className="jobby-app-jobs-employment-type-heading">
              Salary Range
            </h1>
            {this.renderSalaryRange()}
          </div>
          <div>{this.renderJobStatus()}</div>
        </div>
      </>
    );
  }
}

export default JobbyAppJobs;
