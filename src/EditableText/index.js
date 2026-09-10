import React, { useState } from "react";
import "./EditableText.css";

function EditableText() {
  const [buttonText, setButtonText] = useState("Save");
  const [savedText, setSavedText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showText, setShowText] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const onClick = () => {
    if (buttonText === "Save") {
      setSavedText(inputValue);
      setButtonText("Edit");
      setShowInput(true);
      setShowText(false);
    } else {
      setButtonText("Save");
      setSavedText(inputValue);
      setShowInput(false);
      setShowText(true);
    }
  };

  return (
    <div className="editable-main-container">
      <div className="editable-sub-container">
        <h2 style={{ color: "#8e07af", marginTop: "14px" }}>
          Editable Text Field
        </h2>
        <div className="editable-input-button-container">
          <input
            type="text"
            className={`editable-input ${showInput ? "d-none" : ""}`}
            placeholder="Please Enter something.."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <p
            className={`${showText ? "d-none" : ""}`}
            style={{ fontSize: "20px", marginTop: "8px" }}
          >
            {savedText}
          </p>
          <button type="button" className="editable-button" onClick={onClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditableText;
