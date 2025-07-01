import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../index.css";

function JobbyAppLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  async function fetchData() {
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      Cookies.set("jwt_token", data.jwt_token, { expires: 30 });
      navigate("/jobbyApp-home");
    } else {
      setErrorMessage(data.error_msg);
      setIsError(true);
    }
  }

  const onSubmitLogin = (event) => {
    event.preventDefault();
    fetchData();
    setUsername("");
    setPassword("");
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/jobbyApp-home" />;
  }

  return (
    <div className="jobby-app-login-container">
      <div className="jobby-app-login-mini-container">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="jobby-logo"
            className="jobby-app-login-logo"
          />
        </div>
        <form
          className="jobby-app-login-form-container"
          onSubmit={onSubmitLogin}
        >
          <label htmlFor="username" className="jobby-app-login-form-label">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            value={username}
            className="jobby-app-login-form-input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className="jobby-app-login-form-label">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            value={password}
            className="jobby-app-login-form-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="jobby-app-login-form-button">
            Login
          </button>
          <p className="jobby-app-login-form-error-message">
            {isError ? "*" + errorMessage : null}
          </p>
        </form>
      </div>
    </div>
  );
}

export default JobbyAppLogin;
