import { Component } from "react";
import { RevolvingDot } from "react-loader-spinner";
import Item from "./Item";
import "./index.css";

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

class ExtraGithubRepos extends Component {
  state = {
    activeItem: languageFiltersData[0].id,
    dataList: [],
    apiStatus: apiStatusConstants.initial,
    isLoading: false,
  };
  componentDidMount() {
    this.getRepoDetails();
  }
  getRepoDetails = async () => {
    const { activeItem } = this.state;
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      isLoading: true,
    });
    const url = `https://apis.ccbp.in/popular-repos?language=${activeItem}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const formattedFetchedData = data.popular_repos.map((eachData) => ({
        avatarUrl: eachData.avatar_url,
        forksCount: eachData.forks_count,
        id: eachData.id,
        namee: eachData.name,
        issuesCount: eachData.issues_count,
        starsCount: eachData.stars_count,
      }));
      this.setState({
        apiStatus: apiStatusConstants.success,
        dataList: formattedFetchedData,
        isLoading: false,
      });
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        isLoading: false,
      });
    }
  };
  onSelectItem = (id) => {
    this.setState({ activeItem: id }, this.getRepoDetails);
  };
  renderSuccessView = () => {
    const { dataList } = this.state;
    console.log("renderSuccessView");
    return (
      <div className="result-item-conatiner">
        {dataList.map((item) => {
          return (
            <div>
              <img src={item.avatarUrl} alt={item.name} />
              <p>{item.starsCount} stars</p>
              <p>{item.forksCount} forks</p>
              <p>{item.issuesCount} open issues</p>
            </div>
          );
        })}
      </div>
    );
  };
  renderApiStatusList = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case "IN_PROGRESS":
        return (
          <div data-testid="loader" className="extra-loader">
            <RevolvingDot color="#0284c7" height={80} width={80} />
          </div>
        );
      case "SUCCESS":
        return this.renderSuccessView();
      case "FAILURE":
        return <h1>Something went wrong!</h1>;
      default:
        return "";
    }
  };
  render() {
    const { activeItem } = this.state;
    return (
      <div className="extra-github-container">
        <h1>Popular</h1>
        <div className="tabs-list-container">
          {languageFiltersData.map((item) => {
            return (
              <Item
                key={item.id}
                tabDetails={item}
                onSelectItem={this.onSelectItem}
                activeItem={activeItem}
              />
            );
          })}
        </div>
        <div className="extra-github-results-container">
          {this.renderApiStatusList()}
        </div>
      </div>
    );
  }
}
export default ExtraGithubRepos;
