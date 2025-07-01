import "../index.css";

function EmojiGameHeader(props) {
  const { score, bestScore } = props;
  return (
    <div className="emoji-game-header-container">
      <div className="emoji-game-header-score-timer-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
          alt="game logo"
          className="emoji-game-header-game-logo"
        />
        <h1 className="emoji-game-header-game-name">Emoji Game</h1>
      </div>
      <div className="emoji-game-header-score-timer-container">
        <h1 className="emoji-game-header-score">
          Score: <span className="emoji-game-header-score-count">{score}</span>
        </h1>
        <h1 className="emoji-game-header-score">
          Best Score:
          <span className="emoji-game-header-score-count">{bestScore}</span>
        </h1>
      </div>
    </div>
  );
}

export default EmojiGameHeader;
