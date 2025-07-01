import React from "react";
import "../index.css";

function ContactItem(props) {
  const { contactDetails, toggleIsFavorite } = props;
  const { name, mobileNo, isFavorite, id } = contactDetails;

  const favIcon = isFavorite
    ? "https://assets.ccbp.in/frontend/react-js/star-filled-img.png"
    : "https://assets.ccbp.in/frontend/react-js/star-outline-img.png";

  const onClickFav = () => {
    toggleIsFavorite(id);
  };

  return (
    <div className="contact-item-container">
      <h1 className="contact-item-name">{name}</h1>
      <p className="contact-item-mobile">{mobileNo}</p>
      <button className="contact-item-button" onClick={onClickFav}>
        <img src={favIcon} alt="favourite" className="image" />
      </button>
    </div>
  );
}

export default ContactItem;
