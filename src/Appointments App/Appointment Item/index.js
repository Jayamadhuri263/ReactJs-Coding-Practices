import React from "react";
import "../index.css";

function AppointmentItem(props) {
  const { appointmentDetails, toggleIsFavorite } = props;
  const { id, title, date, isFavorite } = appointmentDetails;
  const favImage = isFavorite
    ? "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
    : "https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png";

  const onClickFavorite = () => {
    toggleIsFavorite(id);
  };

  return (
    <div className="appointment-item-container">
      <div className="appointment-item-mini-container">
        <h1 className="comments-list-name   appointment-list-title">{title}</h1>
        <button
          className="comments-list-button"
          type="button"
          onClick={onClickFavorite}
        >
          <img src={favImage} alt="favorite" className="comments-list-delete" />
        </button>
      </div>
      <p className="comments-list-comment appointment-list-date">{date}</p>
    </div>
  );
}

export default AppointmentItem;
