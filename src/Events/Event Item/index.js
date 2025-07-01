import React from "react";
import "../index.css";

function EventItem(props) {
  const { eventDetails, onEventSelect, eventActiveItem } = props;
  const { imageUrl, name, location, id } = eventDetails;
  const activeEventClassName = eventActiveItem
    ? "active-class"
    : "non-active-class";

  const onTabItemClicked = () => {
    onEventSelect(id);
  };

  return (
    <div className={`event-item-container`}>
      <button
        type="button"
        className={` active-evnt-button ${activeEventClassName}`}
        onClick={onTabItemClicked}
      >
        <img src={imageUrl} alt={name} className="event-item-image" />
      </button>
      <h1 className="event-item-name">{name}</h1>
      <p className="event-item-location">{location}</p>
    </div>
  );
}

export default EventItem;
