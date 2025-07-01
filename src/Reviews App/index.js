import React, { useState } from "react";
import "./index.css";

const reviewsData = [
  {
    imgUrl: "https://assets.ccbp.in/frontend/react-js/wade-warren-img.png",
    username: "Wade Warren",
    companyName: "Rang",
    description:
      "The most important thing I learnt is that nothing is a failure, but what we learn from that is a rich and rewarding experience.",
  },
  {
    imgUrl: "https://assets.ccbp.in/frontend/react-js/adrian-williams-img.png",
    username: "Adrian Williams",
    companyName: "WheelO",
    description:
      "Coming to Startup School is the best thing that has happened to me. I wish every startup in the country should get this opportunity.",
  },
  {
    imgUrl: "https://assets.ccbp.in/frontend/react-js/sherry-jhonson-img.png",
    username: "Sherry Johnson",
    companyName: "MedX",
    description:
      "I am glad to have such experienced mentors guiding us in every step through out the 4 weeks. I have improved personally and developed many interpersonal skills.",
  },
  {
    imgUrl: "https://assets.ccbp.in/frontend/react-js/ronald-jones-img.png",
    username: "Ronald Jones",
    companyName: "Infinos Tech",
    description:
      "I am really loving the way how mentors are taking care of us, the way they are explaining big theories with lots of case studies and innovative methods.",
  },
];

function ReviewsApp() {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const currentActiveReview = reviewsData[activeReviewIndex];

  const renderActiveReview = (review) => {
    const { imgUrl, username, companyName, description } = review;
    return (
      <div className="reviews-app-mini-container">
        <img
          src={imgUrl}
          alt={username}
          className="reviews-app-profile-image"
        />
        <h1 className="reviews-app-profile-username">{username}</h1>
        <p className="reviews-app-profile-company-name">{companyName}</p>
        <p className="reviews-app-profile-description">{description}</p>
      </div>
    );
  };

  const onRightClick = () => {
    if (activeReviewIndex < reviewsData.length - 1) {
      setActiveReviewIndex(activeReviewIndex + 1);
    }
  };

  const onLeftClick = () => {
    if (activeReviewIndex > 0) {
      setActiveReviewIndex(activeReviewIndex - 1);
    }
  };

  return (
    <div className="reviews-app-container">
      <h1 className="reviews-app-heading">Reviews</h1>
      <div className="reviews-app-reviews-container">
        <button
          type="button"
          className="reviews-app-button"
          onClick={onLeftClick}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/left-arrow-img.png"
            alt="left arrow"
            className="reviews-app-arrow"
          />
        </button>

        {renderActiveReview(currentActiveReview)}

        <button
          type="button"
          className="reviews-app-button"
          onClick={onRightClick}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/right-arrow-img.png"
            alt="right arrow"
            className="reviews-app-arrow"
          />
        </button>
      </div>
    </div>
  );
}

export default ReviewsApp;
