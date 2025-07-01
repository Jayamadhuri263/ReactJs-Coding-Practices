import React, { Component } from "react";
import "./index.css";

export class DigitalTimerApp extends Component {
  state = { isPlay: false, limit: 25, timeElapsedInSec: 0 };

  onDecrement = () => {
    this.setState((prevState) => ({ limit: prevState.limit - 1 }));
  };

  onIncrement = () => {
    this.setState((prevState) => ({ limit: prevState.limit + 1 }));
  };

  getElapsedTimeInSeconds = () => {
    const { limit, timeElapsedInSec } = this.state;
    const totalSecondsRemaining = limit * 60 - timeElapsedInSec;
    const minutes = Math.floor(totalSecondsRemaining / 60);
    const seconds = Math.floor(totalSecondsRemaining % 60);
    const stringifiedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const stringifiedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${stringifiedMinutes}:${stringifiedSeconds}`;
  };

  toggleIsPlay = () => {
    const { timeElapsedInSec, limit, isPlay } = this.state;
    this.setState((prevState) => ({ isPlay: !prevState.isPlay }));
    const isTimerCompleted = timeElapsedInSec === limit * 60;
    if (isTimerCompleted) {
      this.setState({ timeElapsedInSec: 0 });
    }
    if (!isPlay) {
      this.timerId = setInterval(() => {
        this.setState((prevState) => ({
          timeElapsedInSec: prevState.timeElapsedInSec + 1,
        }));
        // console.log("timeElapsedInSec= ", timeElapsedInSec);
      }, 1000);
    } else {
      clearInterval(this.timerId);
    }
  };

  onReset = () => {
    this.setState({
      limit: 25,
      isPlay: false,
      timeElapsedInSec: 0,
    });
    clearInterval(this.timerId);
  };

  render() {
    const { isPlay, limit } = this.state;
    const timerStatus = isPlay ? "Running" : "Paused";
    const playOrPauseImage = isPlay
      ? "https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
      : "https://assets.ccbp.in/frontend/react-js/play-icon-img.png";
    const playOrPauseAlt = isPlay ? "Start" : "Pause";
    const playOrPauseText = isPlay ? "Pause" : "Start";

    return (
      <div className="digital-timer-app-container">
        <h1 className="digital-timer-app-heading">Digital Timer</h1>
        <div className="digital-timer-app-timer-container">
          <div className="digital-timer-app-timer-mini-container">
            <h1 className="digital-timer-app-timer">
              {this.getElapsedTimeInSeconds()}
            </h1>
            <p className="digital-timer-app-status">{timerStatus}</p>
          </div>
        </div>

        <div className="digital-timer-start-reset-main-container">
          <div className="digital-timer-ulta-container">
            <div className="digital-timer-start-reset-container">
              <button
                type="button"
                className="digital-timer-start-button"
                onClick={this.toggleIsPlay}
              >
                <img
                  src={playOrPauseImage}
                  alt={playOrPauseAlt}
                  className="digital-timer-button-image"
                />
              </button>
              <h1 className="digital-timer-app-status start">
                {playOrPauseText}
              </h1>
            </div>
            <div className="digital-timer-start-reset-container">
              <button
                type="button"
                className="digital-timer-start-button"
                onClick={this.onReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset"
                  className="digital-timer-button-image"
                />
              </button>
              <h1 className="digital-timer-app-status start">Reset</h1>
            </div>
          </div>
          <p className="digital-timer-app-status limit">Set Timer Limit</p>
          <div className="digital-timer-limit-container">
            <button
              type="button"
              className="digital-timer-limit-button"
              onClick={this.onDecrement}
              disabled={isPlay}
            >
              -
            </button>
            <div className="digital-timer-limit-count">{limit}</div>
            <button
              type="button"
              className="digital-timer-limit-button"
              onClick={this.onIncrement}
              disabled={isPlay}
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DigitalTimerApp;
