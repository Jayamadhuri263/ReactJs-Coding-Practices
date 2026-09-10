import React, { useState } from "react";
import "./WordCounter.css";

function WordCounter() {
  const [wordsList, setWordsList] = useState(["Jaya", "madhuri"]);
  const [inputWord, setInputWord] = useState("");

  const onAddWordCounter = () => {
    const trimmed = inputWord.trim();
    if (trimmed === "") {
      return;
    }
    setWordsList((prev) => [...prev, trimmed]);
    setInputWord("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onAddWordCounter();
    }
  };

  return (
    <div className="word-counter-main-container">
      <div className="word-counter-sub-container word-counter-sub-container-a">
        <div className="word-counter-a-heading-container">
          <h2>Count the characters like a Boss..</h2>
        </div>
        {wordsList.length <= 0 ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-user-inputs-img.png"
            alt="no-user-inputs"
            className="no-user-inputs-img"
          />
        ) : (
          <div>
            {wordsList.map((word, index) => (
              <div className="words-list-container" key={`${word}-${index}`}>
                <h4 style={{ marginBottom: "-8px" }}>
                  {word}: {word.length}
                </h4>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="word-counter-sub-container word-counter-sub-container-b">
        <h2 style={{ textAlign: "center" }}>Character Counter</h2>
        <div className="word-counter-input-button-container">
          <input
            type="text"
            className="input-word"
            placeholder="Enter the characters here"
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="add-button"
            onClick={onAddWordCounter}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default WordCounter;
