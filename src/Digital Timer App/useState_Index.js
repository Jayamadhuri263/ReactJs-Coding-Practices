import React, { useState, useEffect } from "react";
import "./index.css";

function DigitalTimerApp() {
  const [timeElapsedInSec, setTimeElapsedInSec] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [limit, setLimit] = useState(25);

  useEffect(() => {
    const isTimerCompleted = timeElapsedInSec === limit * 60;
    let id = null;

    if (isTimerCompleted) {
      setTimeElapsedInSec(0);
    }
    if (!isPlay) {
      clearInterval(id);
      //   console.log("isPlay=", isPlay);
    }
    if (isPlay) {
      id = setInterval(() => {
        setTimeElapsedInSec((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(id);
  }, [timeElapsedInSec, isPlay, limit]);

  const onReset = () => {
    setLimit(25);
    setIsPlay(false);
    setTimeElapsedInSec(0);
    clearInterval();
  };

  const onDecrement = () => {
    setLimit(limit - 1);
  };

  const onIncrement = () => {
    setLimit(limit + 1);
  };

  const getElapsedTimeInSeconds = () => {
    const totalSecondsRemaining = limit * 60 - timeElapsedInSec;
    const minutes = Math.floor(totalSecondsRemaining / 60);
    const seconds = Math.floor(totalSecondsRemaining % 60);
    const stringifiedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const stringifiedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${stringifiedMinutes}:${stringifiedSeconds}`;
  };

  const onClickStart = () => {
    setIsPlay(!isPlay);
  };

  const toggleIsPlay = () => {
    setIsPlay(!isPlay);
    onClickStart();
    // console.log(isPlay);
  };

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
            {getElapsedTimeInSeconds()}
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
              onClick={toggleIsPlay}
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
              onClick={onReset}
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
            onClick={onDecrement}
            disabled={isPlay}
          >
            -
          </button>
          <div className="digital-timer-limit-count">{limit}</div>
          <button
            type="button"
            className="digital-timer-limit-button"
            onClick={onIncrement}
            disabled={isPlay}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default DigitalTimerApp;
