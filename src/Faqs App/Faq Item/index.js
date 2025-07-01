import React, { useState } from "react";
import "../index.css";

function FaqItem(props) {
  const [isShow, setIsShow] = useState(false);
  const { faqDetails } = props;
  const { questionText, answerText } = faqDetails;

  const onClickShowAnswer = () => {
    setIsShow(!isShow);
  };

  const showAnswerIcon = isShow
    ? "https://assets.ccbp.in/frontend/react-js/faqs-minus-icon-img.png"
    : "https://assets.ccbp.in/frontend/react-js/faqs-plus-icon-img.png";
  const showAnswerAlt = isShow ? "Minus" : "Plus";
  const showAnswer = isShow ? "show" : "hide";

  return (
    <li className="faqs-app-list-item">
      <div className="faqs-app-question-button-container">
        <h1 className="faqs-app-list-question">{questionText}</h1>
        <button
          type="button"
          className="faqs-app-list-button"
          onClick={onClickShowAnswer}
        >
          <img
            src={showAnswerIcon}
            alt={showAnswerAlt}
            className="faqs-app-list-icon"
          />
        </button>
      </div>
      {isShow ? (
        <div className={`faqs-app-answer-container ${showAnswer}`}>
          <hr className="faqs-app-line" />
          <p className="faqs-app-answer">{answerText}</p>
        </div>
      ) : null}
    </li>
  );
}

export default FaqItem;
