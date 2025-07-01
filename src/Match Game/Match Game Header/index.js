import "../index.css";

function MatchGameHeader(props) {
  const { score, timer } = props;
  return (
    <div className="match-game-header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
        alt="game logo"
        className="match-game-header-game-logo"
      />
      <div className="match-game-header-score-timer-container">
        <h1 className="match-game-header-score">
          Score: <span className="match-game-header-score-count">{score}</span>
        </h1>
        <div className="match-game-header-score-timer-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
            alt="game timer"
            className="match-game-header-timer"
          />
          <h1 className="match-game-header-score-count">{timer} sec</h1>
        </div>
      </div>
    </div>
  );
}

export default MatchGameHeader;
