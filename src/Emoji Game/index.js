import React from "react";
import useState from "react-usestateref";
import EmojiGameHeader from "./Emoji Game Header";
import EmojiItem from "./Emoji Item";
import "./index.css";

const emojisList = [
  {
    id: 0,
    emojiName: "Face with stuck out tongue",
    emojiUrl:
      "https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-img.png",
  },
  {
    id: 1,
    emojiName: "Face with head bandage",
    emojiUrl:
      "https://assets.ccbp.in/frontend/react-js/face-with-head-bandage-img.png",
  },
  {
    id: 2,
    emojiName: "Face with hugs",
    emojiUrl: "https://assets.ccbp.in/frontend/react-js/face-with-hugs-img.png",
  },
  {
    id: 3,
    emojiName: "Face with laughing",
    emojiUrl:
      "https://assets.ccbp.in/frontend/react-js/face-with-laughing-img.png",
  },
  {
    id: 4,
    emojiName: "Laughing face with hand in front of mouth",
    emojiUrl:
      "https://assets.ccbp.in/frontend/react-js/face-with-laughing-with-hand-infront-mouth-img.png",
  },
  {
    id: 5,
    emojiName: "Face with mask",
    emojiUrl: "https://assets.ccbp.in/frontend/react-js/face-with-mask-img.png",
  },
  {
    id: 6,
    emojiName: "Face with silence",
    emojiUrl:
      "https://assets.ccbp.in/frontend/react-js/face-with-silence-img.png",
  },
  {
    id: 7,
    emojiName: "Face with stuck out tongue and winked eye",
    emojiUrl:
      "https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-and-winking-eye-img.png",
  },
  {
    id: 8,
    emojiName: "Grinning face with sweat",
    emojiUrl:
      "https://assets.ccbp.in/frontend/react-js/grinning-face-with-sweat-img.png",
  },
  {
    id: 9,
    emojiName: "Smiling face with heart eyes",
    emojiUrl:
      "https://assets.ccbp.in/frontend/react-js/smiling-face-with-heart-eyes-img.png",
  },
  {
    id: 10,
    emojiName: "Grinning face",
    emojiUrl: "https://assets.ccbp.in/frontend/react-js/grinning-face-img.png",
  },
  {
    id: 11,
    emojiName: "Smiling face with star eyes",
    emojiUrl:
      "https://assets.ccbp.in/frontend/react-js/smiling-face-with-star-eyes-img.png",
  },
];

function EmojiGame() {
  const [bestScore] = useState(0);
  const [selectedEmojis, setSelectedEmojis] = useState([]);

  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const randomList = shuffleArray(emojisList);

  const selectedEmoji = (emoji) => {
    setSelectedEmojis(emoji);

    setSelectedEmojis({ ...selectedEmojis, emoji });
  };

  return (
    <div className="emoji-game-first-main-container">
      <EmojiGameHeader bestScore={bestScore} />
      <div className="emoji-game-content-container">
        {randomList.map((eachEmoji) => (
          <EmojiItem
            key={eachEmoji.id}
            emojiDetails={eachEmoji}
            selectedEmoji={selectedEmoji}
          />
        ))}
      </div>
    </div>
  );
}

export default EmojiGame;
