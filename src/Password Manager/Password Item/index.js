import React from "react";
import "../index.css";

function PasswordItem(props) {
  const { passwordDetails, deletePassword, checkboxValue } = props;
  const { id, website, username, password, hiddenPassword, userInitial } =
    passwordDetails;

  const onDeletePassword = () => {
    deletePassword(id);
  };

  const passwordShow = checkboxValue ? password : hiddenPassword;

  return (
    <div className="password-item-container">
      <div className="password-item-row">
        <div className="password-item-profile-container">
          <h1 className="password-item-profile-initial">{userInitial}</h1>
        </div>
        <div className="password-item-mini-container">
          <p className="user-details">{website}</p>
          <p className="user-details username">{username}</p>
          <p className="user-details username">{passwordShow}</p>
        </div>
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onDeletePassword}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="password-manager-app-website-image"
        />
      </button>
    </div>
  );
}

export default PasswordItem;
