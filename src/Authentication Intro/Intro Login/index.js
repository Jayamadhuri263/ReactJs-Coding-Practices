import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../index.css";

function IntroLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const navigate = useNavigate();

  async function fetchData() {
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    // console.log("Login jwt created= ", data.jwt_token);
    if (response.ok === true) {
      Cookies.set("jwt_token", data.jwt_token, { expires: 30 });
      navigate("/authenticationHome");
    } else {
      setErrorMsg(data.error_msg);
      setIsError(true);
    }
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    fetchData();
    setUsername("");
    setPassword("");
  };

  function _onBlur() {
    setTimeout(() => {
      if (isFocus) {
        setIsFocus(false);
      }
    }, 0);
  }
  function _onFocus() {
    if (!isFocus) {
      setIsFocus(true);
    }
  }

  // console.log("errorMsg", errorMsg);
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/authenticationHome" />;
  }

  return (
    <div className="authentication-login-page-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-website-logo-mobile-image"
        alt="website bg"
      />
      <div className="authentication-login-form-container">
        <div className="authentication-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-image"
            alt="website logo"
          />
        </div>
        <form onSubmit={onSubmitForm} className="authentication-form-container">
          <label htmlFor="username" className="form-label-name">
            Username
          </label>
          <input
            type="text"
            value={username}
            id="username"
            placeholder="Enter Username"
            className="form-label-input"
            onChange={(e) => setUsername(e.target.value)}
            onFocus={_onFocus}
            onBlur={_onBlur}
          />
          <label htmlFor="password" className="form-label-name">
            Password
          </label>
          <input
            type="password"
            value={password}
            id="password"
            placeholder="Enter Password"
            className="form-label-input"
            onChange={(e) => setPassword(e.target.value)}
            onFocus={_onFocus}
            onBlur={_onBlur}
          />
          <p className="login-error-message">{isError ? errorMsg : null}</p>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default IntroLogin;
