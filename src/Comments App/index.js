import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import CommentItem from "./Comment Item";
import "./index.css";

const initialContainerBackgroundClassNames = [
  "amber",
  "blue",
  "orange",
  "emerald",
  "teal",
  "red",
  "light-blue",
];

const initialCommentsList = [
  {
    id: 1,
    name: "jaya",
    comment:
      "RRR: A fearless warrior on a perilous mission comes face to face with a steely cop serving British forces in this epic saga set in pre-independent India.",
    isLiked: true,
    date: new Date(),
  },
];

function CommentsApp() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState(initialCommentsList);

  const onSubmitForm = (e) => {
    e.preventDefault();

    let newComment = {
      id: uuid(),
      name,
      comment,
      date: new Date(),
      isLiked: false,
    };
    setCommentsList([...commentsList, newComment]);
    setName("");
    setComment("");
  };

  //   console.log("comments List: ", commentsList);
  const initialBackgroundClassNames =
    initialContainerBackgroundClassNames[Math.round(Math.random())];

  const toggleIsLiked = (item) => {
    setCommentsList(
      commentsList.map((comment) => {
        if (item === comment.id) {
          return { ...comment, isLiked: !comment.isLiked };
        }
        return comment;
      })
    );
  };

  const deleteComment = (id) => {
    setCommentsList(
      commentsList.filter((eachComment) => eachComment.id !== id)
    );
    // console.log("deleteList: ", commentsList);
  };

  return (
    <div className="comments-app-container">
      <h1 className="comments-app-heading">Comments</h1>
      <div className="comments-app-mini-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png "
          alt="comments"
          className="comments-app-image"
        />
        <form className="comments-app-form-container" onSubmit={onSubmitForm}>
          <h1 className="comments-app-form-heading">
            Say something about 4.0 Technologies
          </h1>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="comments-app-form-name-input"
          />
          <textarea
            type="text"
            placeholder="Your Comment"
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="comments-app-form-name-input textarea-input"
          />
          <button type="submit" className="comments-app-button">
            Add Comment
          </button>
        </form>
      </div>
      <hr className="comments-app-line" />
      <div className="comments-app-comments-count-container">
        <h2 className="comments-app-comments-count">
          <span className="comments-app-comments-count-value">
            {commentsList.length}
          </span>
          comments
        </h2>
      </div>
      <div className="comments-list-container">
        {commentsList.map((eachComment) => (
          <CommentItem
            key={eachComment.id}
            commentDetails={eachComment}
            initialBackgroundClassNames={initialBackgroundClassNames}
            toggleIsLiked={toggleIsLiked}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
}

export default CommentsApp;
