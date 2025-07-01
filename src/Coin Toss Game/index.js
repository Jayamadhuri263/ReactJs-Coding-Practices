import React, { useState } from "react";
import "./index.css";

function CoinTossGame() {
  const [tailsCount, setTailsCount] = useState(0);
  const [headsCount, setHeadsCount] = useState(0);

  const randomToss = Math.round(Math.random());
  // console.log(randomToss);

  const onClickCoinToss = () => {
    randomToss === 0
      ? setTailsCount(tailsCount + 1)
      : setHeadsCount(headsCount + 1);
  };

  const tossImage =
    randomToss === 0
      ? "https://assets.ccbp.in/frontend/react-js/tails-img.png"
      : "https://assets.ccbp.in/frontend/react-js/heads-img.png";

  return (
    <div className="coin-toss-game-container">
      <div className="coin-toss-game-mini-container">
        <h1 className="coin-toss-game-heading">Coin Toss Game</h1>
        <p className="coin-toss-game-description">Heads (or) Tails</p>
        <img src={tossImage} alt="toss-icon" className="coin-toss-game-image" />
        <button
          className="coin-toss-game-button"
          type="button"
          onClick={onClickCoinToss}
        >
          Toss Coin
        </button>
        <div className="coin-toss-game-result-container">
          <h1 className="coin-toss-game-count-label">
            Total: {headsCount + tailsCount}
          </h1>
          <h1 className="coin-toss-game-count-label">Heads: {headsCount}</h1>
          <h1 className="coin-toss-game-count-label">Tails: {tailsCount}</h1>
        </div>
      </div>
    </div>
  );
}

export default CoinTossGame;
