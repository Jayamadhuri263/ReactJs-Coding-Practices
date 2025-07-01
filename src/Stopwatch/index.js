import React, { useState, useEffect } from "react";
import "./index.css";

function Stopwatch() {
  const [timer, setTimer] = useState(0);
  const [isStart, setStart] = useState(false);

  const TimeInMinutesAndSeconds = () => {
    const TimeInMinutes = Math.floor(timer / 60);
    const TimeInSeconds = Math.floor(timer % 60);
    const stringifiedMinutes =
      TimeInMinutes < 10 ? `0${TimeInMinutes}` : TimeInMinutes;
    const stringifiedSeconds =
      TimeInSeconds < 10 ? `0${TimeInSeconds}` : TimeInSeconds;

    const time = `${stringifiedMinutes}:${stringifiedSeconds}`;
    return time;
  };

  useEffect(() => {
    let id = null;
    if (isStart) {
      id = setInterval(() => {
        setTimer((old) => old + 1);
      }, 1000);
    } else {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [timer, isStart]);

  const onStart = () => {
    setStart(true);
  };

  const onStop = () => {
    setStart(false);
  };

  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch-heading">Stopwatch</h1>
      <div className="stopwatch-timer-container">
        <div className="stopwatch-timer-image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
            alt="timer"
            className="timer-image"
          />
          <p className="timer-heading">Timer</p>
        </div>
        <h1 className="timer-count">{TimeInMinutesAndSeconds()}</h1>
        <div className="timer-buttons-container">
          <button
            type="button"
            className="timer-button start-timer"
            onClick={onStart}
          >
            Start
          </button>
          <button
            type="button"
            className="timer-button stop-timer"
            onClick={onStop}
          >
            Stop
          </button>
          <button type="button" className="timer-button reset-timer">
            Reset
          </button>
        </div>
      </div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/stopwatch-sm-bg.png"
        alt="stopwatch"
        className="stopwatch-image"
      />
    </div>
  );
}

export default Stopwatch;
