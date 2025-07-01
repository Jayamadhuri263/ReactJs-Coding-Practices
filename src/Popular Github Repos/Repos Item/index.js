import React from "react";
import "../index.css";

function ReposItem(props) {
  const { reposDetails } = props;
  const { avatarUrl, forksCount, issuesCount, starsCount, namee } =
    reposDetails;

  return (
    <div className="repos-item-container">
      <img src={avatarUrl} alt={namee} className="repos-item-avatar" />
      <h1 className="repos-item-heading">{namee}</h1>
      <div className="repos-item-mini-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="repos-item-stars"
        />
        <h1 className="repos-item-stars-count">{starsCount} stars</h1>
      </div>
      <div className="repos-item-mini-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="repos-item-stars"
        />
        <h1 className="repos-item-stars-count">{forksCount} forks</h1>
      </div>
      <div className="repos-item-mini-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="issues"
          className="repos-item-stars"
        />
        <h1 className="repos-item-stars-count">{issuesCount} open issues</h1>
      </div>
    </div>
  );
}

export default ReposItem;
