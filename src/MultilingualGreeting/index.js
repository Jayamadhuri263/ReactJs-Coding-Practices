import React, { useState } from "react";
import "./MultilingualGreeting.css";

const languageGreetingsList = [
  {
    id: "89537778-7a46-4c58-988c-0adc931d087c",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/multilingual_greeting/telugu-greetings-img.png",
    buttonText: "Telugu",
  },
  {
    id: "bfdf40eb-eec9-4a66-a493-752fe689f0d0",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/multilingual_greeting/english-greetings-img.png",
    buttonText: "English",
  },
  {
    id: "0ceda891-2a0c-49e2-8c62-68e78180bac6",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/multilingual_greeting/tamil-greetings-img.png",
    buttonText: "Tamil",
  },
];

function MultilingualGreeting() {
  const [img, setImg] = useState(languageGreetingsList[0].imageUrl);

  const onGreetings = (btn) => {
    if (btn === "telugu") {
      setImg(languageGreetingsList[0].imageUrl);
    } else if (btn === "eng") {
      setImg(languageGreetingsList[1].imageUrl);
    } else {
      setImg(languageGreetingsList[2].imageUrl);
    }
  };

  return (
    <div className="multilingual-greeting-main-container">
      <h1>Multilingual Greetings</h1>
      <div className="multilingual-greeting-buttons-container">
        <button
          type="button"
          className="multilingual-greeting-button"
          onClick={() => onGreetings("telugu")}
        >
          Telugu
        </button>
        <button
          type="button"
          className="multilingual-greeting-button"
          onClick={() => onGreetings("eng")}
        >
          English
        </button>
        <button
          type="button"
          className="multilingual-greeting-button"
          onClick={() => onGreetings("tamil")}
        >
          Tamil
        </button>
      </div>
      <div>
        <img
          src={img}
          className="multilingual-greeting-image"
          alt="greetings-img"
        />
      </div>
    </div>
  );
}

export default MultilingualGreeting;
