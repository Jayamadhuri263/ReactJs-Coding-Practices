import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import "../index.css";

function CommentItem(props) {
  const {
    commentDetails,
    initialBackgroundClassNames,
    toggleIsLiked,
    deleteComment,
  } = props;
  const { id, name, comment, date, isLiked } = commentDetails;
  const likedIcon = isLiked
    ? "https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png"
    : "https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png";
  const likeContent = isLiked ? "Liked" : "Like";

  const onClickLike = () => {
    toggleIsLiked(id);
    // console.log("isLiked: ", isLiked);
  };

  const onClickDelete = () => {
    deleteComment(id);
  };

  TimeAgo.addLocale(en);
  // Create a new instance
  const timeAgo = new TimeAgo("en-US");
  const inSeconds = new Date(date).getTime();
  const minutesAgo = timeAgo.format(inSeconds - 60 * 1000);

  return (
    <>
      <div className="comments-list-mini-container">
        <div
          style={{ backgroundColor: toString(initialBackgroundClassNames) }}
          className={`comments-list-profile-container`}
        >
          <h1 className="comment-list-name-initial">
            {name.toUpperCase().charAt(0)}
          </h1>
        </div>
        <div className="comments-list-profile-details-container">
          <div className="comments-list-name-date-container">
            <h1 className="comments-list-name">{name}</h1>
            <p className="comments-list-date">{minutesAgo}</p>
          </div>
          <p className="comments-list-comment">{comment}</p>
        </div>
      </div>
      <div className="comments-list-like-container">
        <div className="like-icon-name-container">
          <button
            type="button"
            className="comments-list-button"
            onClick={onClickLike}
            id="buttonLike"
          >
            <img
              src={likedIcon}
              alt="like"
              className="comments-list-like-icon"
            />
          </button>
          <label htmlFor="buttonLike" className="comments-list-like-name">
            {likeContent}
          </label>
        </div>
        <button
          type="button"
          className="comments-list-button comments-list-delete-button"
          onClick={onClickDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="comments-list-delete"
          />
        </button>
      </div>
      <hr className="comments-app-line" />
    </>
  );
}

export default CommentItem;
