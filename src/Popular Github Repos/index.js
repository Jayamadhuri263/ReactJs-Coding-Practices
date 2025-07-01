import React, { Component } from "react";
import { ColorRing } from "react-loader-spinner";
import "./index.css";
import LanguageFilterItem from "./Language Filter Item";
import ReposItem from "./Repos Item";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const languageFiltersData = [
  { id: "ALL", language: "All" },
  { id: "JAVASCRIPT", language: "Javascript" },
  { id: "RUBY", language: "Ruby" },
  { id: "JAVA", language: "Java" },
  { id: "CSS", language: "CSS" },
];

export class PopularGithubRepos extends Component {
  state = {
    isLoading: false,
    languagesList: [],
    activeLanguageId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getPopularGitRepos();
  }

  getPopularGitRepos = async () => {
    const { activeLanguageId } = this.state;
    this.setState({
      isLoading: true,
      apiStatus: apiStatusConstants.inProgress,
    });
    const url = "https://apis.ccbp.in/popular-repos?language=";
    const response = await fetch(`${url}${activeLanguageId}`);
    if (response.ok) {
      const fetchedData = await response.json();
      const formattedFetchedData = fetchedData.popular_repos.map(
        (eachData) => ({
          avatarUrl: eachData.avatar_url,
          forksCount: eachData.forks_count,
          id: eachData.id,
          namee: eachData.name,
          issuesCount: eachData.issues_count,
          starsCount: eachData.stars_count,
        })
      );
      this.setState({
        languagesList: formattedFetchedData,
        isLoading: false,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({
        isLoading: false,
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  clickActiveLanguage = (id) => {
    this.setState({ activeLanguageId: id }, this.getPopularGitRepos);
  };

  renderLoadingView = () => {
    return <ColorRing height={80} width={80} />;
  };

  renderFailureView = () => {
    return (
      <div className="popular-github-repos-failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure-view"
          className="popular-github-repos-failure-view-image"
        />
        <h1 className="popular-github-repos-failure-view-heading">
          Something went wrong
        </h1>
      </div>
    );
  };

  renderSuccessView = () => {
    const { languagesList } = this.state;
    return (
      <div className="popular-github-repos-result-main-container">
        {languagesList.map((eachRepo) => (
          <ReposItem key={eachRepo.id} reposDetails={eachRepo} />
        ))}
      </div>
    );
  };

  renderStatusApiCall = () => {
    const { apiStatus } = this.state;
    // console.log(apiStatus);

    switch (apiStatus) {
      case "IN_PROGRESS":
        return this.renderLoadingView();
      case "SUCCESS":
        return this.renderSuccessView();
      case "FAILURE":
        return this.renderFailureView();
      default:
        return null;
    }
  };

  render() {
    const { activeLanguageId } = this.state;

    return (
      <div className="popular-github-repos-main-container">
        <h1 className="popular-github-repos-main-heading">
          Popular Github Repos
        </h1>
        <ul className="popular-github-repos-lang-container">
          {languageFiltersData.map((eachLang) => (
            <LanguageFilterItem
              key={eachLang.id}
              langOptions={eachLang}
              activeLanguage={eachLang.id === activeLanguageId}
              clickActiveLanguage={this.clickActiveLanguage}
            />
          ))}
        </ul>
        <ul className="popular-github-repos-result-container">
          {this.renderStatusApiCall()}
        </ul>
      </div>
    );
  }
}

export default PopularGithubRepos;
