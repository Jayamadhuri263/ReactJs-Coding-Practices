import { Component } from "react";
import Popup from "reactjs-popup";
import "./index.css";
import Button from "./Button";

const choicesList = [
  {
    id: "ROCK",
    image:
      "https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png",
  },
  {
    id: "SCISSORS",
    image:
      "https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png",
  },
  {
    id: "PAPER",
    image:
      "https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png",
  },
];

class RockPaperScissors extends Component {
  state = {
    score: 0,
    isPLaying: true,
    result: "",
    userChoice: "",
    deviceChoice: "",
    activeClass: "",
  };

  onClickButton = (id) => {
    const selected = choicesList.find((each) => each.id === id);
    const UserSelected = selected.id;
    const deviceButton = Math.floor(Math.random() * 3);
    const deviceSelected = choicesList[deviceButton].id;
    if (UserSelected === "ROCK" && deviceSelected === "SCISSORS") {
      this.setState((prevState) => ({
        isPLaying: false,
        result: "You Won",
        score: prevState.score + 1,
        userChoice: selected.image,
        deviceChoice: choicesList[deviceButton].image,
        activeClass: "text-won",
      }));
    } else if (UserSelected === "ROCK" && deviceSelected === "PAPER") {
      this.setState((prevState) => ({
        isPLaying: false,
        result: "You Lose",
        score: prevState.score - 1,
        userChoice: selected.image,
        deviceChoice: choicesList[deviceButton].image,
        activeClass: "text-lose",
      }));
    } else if (UserSelected === "SCISSORS" && deviceSelected === "PAPER") {
      this.setState((prevState) => ({
        isPLaying: false,
        result: "You Won",
        score: prevState.score + 1,
        userChoice: selected.image,
        deviceChoice: choicesList[deviceButton].image,
        activeClass: "text-won",
      }));
    } else if (UserSelected === "SCISSORS" && deviceSelected === "ROCK") {
      this.setState((prevState) => ({
        isPLaying: false,
        result: "You Lose",
        score: prevState.score - 1,
        userChoice: selected.image,
        deviceChoice: choicesList[deviceButton].image,
        activeClass: "text-lose",
      }));
    } else if (UserSelected === "PAPER" && deviceSelected === "ROCK") {
      this.setState((prevState) => ({
        isPLaying: false,
        result: "You Won",
        score: prevState.score + 1,
        userChoice: selected.image,
        deviceChoice: choicesList[deviceButton].image,
        activeClass: "text-won",
      }));
    } else if (UserSelected === "PAPER" && deviceSelected === "SCISSORS") {
      this.setState((prevState) => ({
        isPLaying: false,
        result: "You Lose",
        score: prevState.score - 1,
        userChoice: selected.image,
        deviceChoice: choicesList[deviceButton].image,
        activeClass: "text-lose",
      }));
    } else {
      this.setState((prevState) => ({
        isPLaying: false,
        result: "It's Draw",
        score: prevState.score,
        userChoice: selected.image,
        deviceChoice: choicesList[deviceButton].image,
        activeClass: "text-draw",
      }));
    }
  };

  onPlayAgain = () => {
    this.setState({ isPLaying: true });
  };

  render() {
    const { score, result, isPLaying, userChoice, deviceChoice, activeClass } =
      this.state;
    return (
      <div className="rock-paper-scissors-container">
        <div className="score-container">
          <h1>
            ROCK
            <br />
            PAPER
            <br />
            SCISSORS
          </h1>
          <div>
            <h1>
              Score <br />
              <span>{score}</span>
            </h1>
          </div>
        </div>
        {isPLaying ? (
          <>
            <div className="buttons-main-container">
              {choicesList.map((each) => (
                <Button
                  key={each.id}
                  details={each}
                  onClickButton={this.onClickButton}
                />
              ))}
            </div>
            <div className="rules-container">
              <Popup
                trigger={
                  <button
                    className="play-again-button"
                    style={{ width: 12 + "%" }}
                  >
                    Rules
                  </button>
                }
                modal
              >
                {(close) => (
                  <div className="modal">
                    <button className="close" onClick={close}>
                      X
                    </button>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                      alt="rules"
                      className="rules-image"
                    />
                  </div>
                )}
              </Popup>
            </div>
          </>
        ) : (
          <div className="buttons-main-container result-sub-container">
            <div>
              <div>
                <p>YOU</p>
                <img
                  src={userChoice}
                  alt="User-choice"
                  className="choice-image"
                />
              </div>
              <div>
                <p>OPPONENT</p>
                <img
                  src={deviceChoice}
                  alt="Device-choice"
                  className="choice-image"
                />
              </div>
            </div>
            <h1 className={`result ${activeClass}`}>{result}</h1>
            <button
              type="button"
              className="play-again-button"
              onClick={this.onPlayAgain}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default RockPaperScissors;
