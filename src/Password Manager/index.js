import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./index.css";
import PasswordItem from "./Password Item";

const initialPasswordList = [
  {
    id: uuid(),
    website: "www.google.com",
    userInitial: "Jaya".charAt(0),
    username: "jaya",
    password: "Jaya@123",
    hiddenPassword: String("*").repeat(String("Jaya@123").length),
  },
];

function PasswordManager() {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [passwordList, setPasswordList] = useState([]);

  const onAddPassword = (e) => {
    e.preventDefault();
    const newPassword = {
      id: uuid(),
      username,
      userInitial: username?.charAt(0),
      website,
      password: password,
      hiddenPassword: String("*").repeat(password.length),
    };
    setPasswordList([...passwordList, newPassword]);
    setWebsite("");
    setUsername("");
    setPassword("");
  };

  const searchPasswordList = passwordList.filter((searchPassword) =>
    searchPassword.website.toLowerCase().includes(searchValue.toLowerCase())
  );

  const deletePassword = (item) => {
    setPasswordList(passwordList.filter((password) => password.id !== item));
  };

  // console.log(checkboxValue);

  return (
    <div className="password-manager-app-main-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        alt="app logo"
        className="password-manager-app-main-bg-image"
      />

      <div className="password-manager-app-first-container ">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
          alt="password manager"
          className="password-manager-app-manager-image"
        />
        <form
          className="password-manager-form-container"
          onSubmit={onAddPassword}
        >
          <p className="password-manager-form-heading">Add New Password</p>
          <div className="password-manager-input-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
              className="password-manager-app-website-image"
            />
            <input
              type="text"
              value={website}
              placeholder="Enter Website"
              onChange={(e) => setWebsite(e.target.value)}
              className="password-manager-app-input"
            />
          </div>
          <div className="password-manager-input-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
              className="password-manager-app-website-image"
            />
            <input
              type="text"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
              className="password-manager-app-input capitalize"
            />
          </div>
          <div className="password-manager-input-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
              className="password-manager-app-website-image"
            />
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              className="password-manager-app-input"
            />
          </div>
          <div className="password-manager-app-add-button-container">
            <button type="submit" className="password-manager-app-add-button">
              Add
            </button>
          </div>
        </form>
      </div>

      <div className="password-manager-app-second-container">
        <div className="passwords-count-search-bar-container">
          <h1 className="passwords-count-heading">
            Your Passwords <span>{passwordList.length}</span>
          </h1>
          <div className="password-manager-input-image-container search-input">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
              className="password-manager-app-website-image search-bar"
            />
            <input
              type="search"
              value={searchValue}
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
              className="password-manager-app-input search-bar-input "
            />
          </div>
        </div>
        <hr className="password-manager-hr-line" />
        <div className="password-manager-show-passwords-container">
          <div className="password-manager-show-password-checkbox-container">
            <input
              type="checkbox"
              id="checkboxValue"
              value={checkboxValue}
              className="checkbox-input"
              onChange={() => setCheckboxValue(!checkboxValue)}
            />
            <label htmlFor="checkboxValue" className="passwords-count-heading">
              Show Passwords
            </label>
          </div>
        </div>

        <div className="passwords-list-container">
          {passwordList.length === 0 || searchPasswordList.length === 0 ? (
            <div className="no-passwords-list-view-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="password-manager-app-manager-image no-passwords-image"
              />
              <p className="password-manager-form-heading">No Passwords</p>
            </div>
          ) : (
            <div className="no-passwords-list-view-container">
              {searchPasswordList.map((eachPassword) => (
                <PasswordItem
                  key={eachPassword.id}
                  passwordDetails={eachPassword}
                  deletePassword={deletePassword}
                  checkboxValue={checkboxValue}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PasswordManager;
