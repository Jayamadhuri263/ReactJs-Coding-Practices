import React, { useEffect } from "react";
import useState from "react-usestateref";

// Update June 2021: Use the NPM module "react-usestateref" to get always the latest state value. It's fully backward compatible with React useState API.

import "./index.css";
import MatchGameHeader from "./Match Game Header";
import MatchGameTabItem from "./Match Game Tab Item";
import MatchGameThumbnailItem from "./Match Game Thumbnail Item/index";

const tabsList = [
  { tabId: "FRUIT", displayText: "Fruits" },
  { tabId: "ANIMAL", displayText: "Animals" },
  { tabId: "PLACE", displayText: "Places" },
];
const imagesList = [
  {
    id: "b11ec8ce-35c9-4d67-a7f7-07516d0d8186",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/orange-thumbnail-img.png",
    category: "FRUIT",
  },
  {
    id: "04ac6b9f-b7e7-45f7-a8fc-fd48f3f72526",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/panda-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/panda-thumbnail-img.png",
    category: "ANIMAL",
  },
  {
    id: "a132f546-5b2b-4c0d-b9e4-e524bdf904cc",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/zebra-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/zebra-thumbnail-img.png",
    category: "ANIMAL",
  },
  {
    id: "d89386da-94db-4275-9cb5-249c6e071a19",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/paris-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/paris-thumbnail-img.png",
    category: "PLACE",
  },
  {
    id: "d810bbb0-1683-407a-8db6-898fe7b75782",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/giraffe-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/giraffe-thumbnail-img.png",
    category: "ANIMAL",
  },
  {
    id: "176aab62-e86a-4ccd-8b89-5b83c3f02506",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/taj-mahal-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/taj-mahal-thumbnail-img.png",
    category: "PLACE",
  },
  {
    id: "0e8daf1b-45b0-4eb0-9dde-383fede78a9b",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/monkey-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/monkey-thumbnail-img.png",
    category: "ANIMAL",
  },
  {
    id: "1a38bf4a-659d-4470-956c-56c1bedd26ac",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/cheetah-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/cheetah-thumbnail-img.png",
    category: "ANIMAL",
  },
  {
    id: "8f2ebd70-4fdd-47a0-b4f9-a6c654b519ab",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/ooti-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/ooti-thumbnail-img.png",
    category: "PLACE",
  },
  {
    id: "7a72c38e-a83d-48eb-b9ce-ae3c0361cc49",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/pineapple-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/pineapple-thumbnail-img.png",
    category: "FRUIT",
  },
  {
    id: "97a33ed5-98ed-4c95-a8f0-1595880b3b69",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/strawberry-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/strawberry-thumbnail-img.png",
    category: "FRUIT",
  },
  {
    id: "07e20159-a950-4c22-9ca8-5ed71563ae24",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/maldives-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/maldives-thumbnail-img.png",
    category: "PLACE",
  },
  {
    id: "43883239-8a28-47dc-9e93-43ef31654c17",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/emerald-lake-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/emerald-thumbnail-lake-img.png",
    category: "PLACE",
  },
  {
    id: "49865ac4-b5e8-4d04-893b-d69ad6004da8",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/watermelon-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/watermelon-thumbnail-img.png",
    category: "FRUIT",
  },
  {
    id: "649ab251-7fd6-4d65-aa0f-39020ce25932",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/elephant-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/elephant-thumbnail-img.png",
    category: "ANIMAL",
  },
  {
    id: "1d0d1c41-e05e-4820-8614-34ee5ada20e0",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/jammu-hills-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/jammu-thumbnail-hills-img.png",
    category: "PLACE",
  },
  {
    id: "88b4ab36-a0c1-4c56-9ce5-3b80dd8c7669",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/fierce-coyote-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/fierce-thumbnail-coyote-img.png",
    category: "ANIMAL",
  },
  {
    id: "8a841bf8-3222-44da-b0fb-4c60190402d7",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/lidder-valley-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/lidder-thumbnail-valley-img.png",
    category: "PLACE",
  },
  {
    id: "d406e63c-eaaf-49ea-88a6-ed6a1572eb97",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/kivi-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/kivi-thumbnail-img.png",
    category: "FRUIT",
  },
  {
    id: "e997ebf9-9a47-4b7e-9035-01ae372d73dc",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/dragon-fruit-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/dragon-thumbnail-fruit-img.png",
    category: "FRUIT",
  },
  {
    id: "c7fbe10e-3282-4fca-815b-91b75d5228cb",
    imageUrl: "https://assets.ccbp.in/frontend/react-js/match-game/goa-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/goa-thumbnail-img.png",
    category: "PLACE",
  },
  {
    id: "4210274c-7304-44d6-8690-c5251252cd10",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/papaya-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/papaya-thumbnail-img.png",
    category: "FRUIT",
  },
  {
    id: "057b6193-a80d-4036-9e6e-fe847c99fbb6",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/mixed-fruits-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/mixed-thumbnail-fruits-img.png",
    category: "FRUIT",
  },
  {
    id: "4e56c59b-835b-4802-87fe-77aaaa5b9526",
    imageUrl: "https://assets.ccbp.in/frontend/react-js/match-game/fox-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/fox-thumbnail-img.png",
    category: "ANIMAL",
  },
  {
    id: "ad75a7b1-0875-4700-977b-2c45924509aa",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/lotus-temple-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/lotus-thumbnail-temple-img.png",
    category: "PLACE",
  },
  {
    id: "525aba17-ed5c-4f09-ad1c-b6bff222c97a",
    imageUrl: "https://assets.ccbp.in/frontend/react-js/match-game/dog-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/dog-thumbnail-img.png",
    category: "ANIMAL",
  },
  {
    id: "c6c66b00-c130-47d2-9d3a-1c3378d08aba",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/apple-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/apple-thumbnail-img.png",
    category: "FRUIT",
  },
  {
    id: "6078b408-4f10-46d3-8815-db14403dbd73",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/bhadrinath-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/bhadrinath-thumbnail-img.png",
    category: "PLACE",
  },
  {
    id: "a2baca84-3beb-49d1-bced-f9a88c161bec",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/camel-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/camel-thumbnail-img.png",
    category: "ANIMAL",
  },
  {
    id: "1edac278-8390-4da9-b914-5f41fb49283c",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/cherry-img.png",
    thumbnailUrl:
      "https://assets.ccbp.in/frontend/react-js/match-game/cherry-thumbnail-img.png",
    category: "FRUIT",
  },
];

function MatchGame() {
  const [activeTabId, setActiveTabId] = useState(tabsList[0].tabId);
  const [selectedImage, setSelectedImage] = useState(imagesList[0].imageUrl);
  const [selectedImageId, setSelectedImageId] = useState(imagesList[0].id);
  const [, setActiveImageId, counterRef] = useState("");
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let timerID = null;
    if (isPlaying && timer >= 0) {
      timerID = setInterval(() => {
        setTimer((old) => old - 1);
      }, 1000);
    } else {
      setTimer(0);
      setIsPlaying(false);
      clearInterval(timerID);
    }
    return () => {
      clearInterval(timerID);
    };
  }, [isPlaying, timer]);

  const onSelectActiveTab = (tabActive) => {
    setActiveTabId(tabActive);
  };

  const categoryImageList = imagesList.filter(
    (thumbnail) => thumbnail.category === activeTabId
  );

  const onSelectAnswer = (answer) => {
    setActiveImageId(answer);

    // console.log("answer = ", answer);
    const random =
      imagesList[Math.round(Math.random() * imagesList.length - 1)];
    const randomSelectedImage = random.imageUrl;
    const randomSelectedId = random.id;

    // console.log("activeImageId = ", counterRef.current);
    // console.log("selectedImageId = ", selectedImageId);

    if (counterRef.current === selectedImageId) {
      setScore((prevScore) => prevScore + 1);
      setSelectedImage(randomSelectedImage);
      setSelectedImageId(randomSelectedId);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const onPlayAgain = () => {
    setIsPlaying(true);
    setActiveTabId(tabsList[0].tabId);
    setSelectedImage(imagesList[0].imageUrl);
    setSelectedImageId(imagesList[0].id);
    setActiveImageId("");
    setScore(0);
    setTimer(60);
  };

  return (
    <div className="match-game-first-main-container">
      <MatchGameHeader score={score} timer={timer} />

      {isPlaying && timer > 0 ? (
        <div className="match-game-main-container">
          <img
            src={selectedImage}
            alt="game logo"
            className="match-game-main-image"
          />

          <div className="match-game-tabs-list-container">
            {tabsList.map((eachTab) => (
              <MatchGameTabItem
                tabDetails={eachTab}
                key={eachTab.tabId}
                activeTab={eachTab.tabId === activeTabId}
                onSelectActiveTab={onSelectActiveTab}
              />
            ))}
          </div>

          <div className="match-game-images-list-container">
            {categoryImageList.map((eachImage) => (
              <MatchGameThumbnailItem
                key={eachImage.id}
                thumbnailDetails={eachImage}
                onSelectAnswer={onSelectAnswer}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="match-game-over-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
            alt="trophy"
            className="match-game-trophy-image"
          />
          <h1 className="match-game-over-your-score-heading">YOUR SCORE</h1>
          <p className="match-game-over-your-score">{score}</p>
          <button
            type="button"
            className="match-game-over-button"
            onClick={onPlayAgain}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
              alt="trophy"
              className="match-game-play-again-image"
            />
            <h1 className="play-again-heading">Play Again!</h1>
          </button>
        </div>
      )}
    </div>
  );
}

export default MatchGame;
