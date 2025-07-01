import React, { useEffect, useState } from "react";
import "./index.css";

const currentDate = new Date().toLocaleTimeString();

function ShowHideClockExample() {
  const [time, setTime] = useState(currentDate);
  const [showClock, setShowClock] = useState(true);
  const onClickShowHideClock = () => {
    setShowClock(!showClock);
  };

  const tick = () => {
    setTime(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    const timerId = setInterval(tick, 1000);

    clearInterval(timerId);
  }, [time]);

  console.log(time);

  return (
    <div className="show-hide-clock-container">
      <button
        type="button"
        className="show-hide-clock-button"
        onClick={onClickShowHideClock}
      >
        Show/Hide Clock
      </button>
      {showClock && (
        <div className="show-hide-clock-div">
          <h1 className="show-hide-clock-heading">Clock</h1>
          <p className="show-hide-clock-time">{time}</p>
        </div>
      )}
    </div>
  );
}

export default ShowHideClockExample;
