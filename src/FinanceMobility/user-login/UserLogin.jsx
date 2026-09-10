import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MOBILITY } from "../mobilityPaths";
import "../finance-mobility-auth.css";

export default function UserLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [infoMessage, setInfoMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ userName: false, password: false });

  useEffect(() => {
    const registered = searchParams.get("registered");
    const logout = searchParams.get("logout");
    if (registered === "true") {
      setInfoMessage("Registration successful. You can sign in now.");
    } else if (logout === "logout") {
      setInfoMessage("You have been signed out.");
    }
  }, [searchParams]);

  useEffect(() => {
    const jwtWebToken = localStorage.getItem("jwtToken");
    if (jwtWebToken) {
      navigate(MOBILITY.HOME, { replace: true });
    }
  }, [navigate]);

  const onLogin = async (e) => {
    e.preventDefault();
    setServerError("");
    const url = "http://localhost:8080/login";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(data.message || "Login failed");
        return;
      }
      if (data.status === 0) {
        setServerError("Please try again after sometime!");
        return;
      }
      const userType = data.isChecker ? "CHECKER" : "MAKER";
      localStorage.setItem("jwtToken", data.jwtWebToken);
      localStorage.setItem("query", userType);
      localStorage.setItem("username", data.username);
      localStorage.setItem("lastLoginTime", `${data.lastLoginTime}`);
      navigate(`${MOBILITY.HOME}?user=${encodeURIComponent(data.username)}`);
    } catch (err) {
      setServerError(err?.message || "Network error");
    }
  };

  const invalidUser = touched.userName && !userName.trim();
  const invalidPass = touched.password && !password;

  return (
    <div className="finance-mobility-login-page">
      <div className="finance-mobility-login-shell">
        <div className="finance-mobility-login-card">
          <header className="finance-mobility-login-card-header">
            <h1 className="finance-mobility-login-brand">Finance Mobility</h1>
            <p className="finance-mobility-login-subtitle">
              Secure access to payments and transfers
            </p>
          </header>

          {infoMessage ? (
            <div
              className="finance-mobility-login-banner finance-mobility-login-alert finance-mobility-login-alert--info"
              role="status"
            >
              {infoMessage}
            </div>
          ) : null}

          <form className="finance-mobility-login-form" onSubmit={onLogin} noValidate>
            <div className="finance-mobility-login-field">
              <label
                className="finance-mobility-login-label"
                htmlFor="loginUserName"
              >
                User name
              </label>
              <input
                id="loginUserName"
                type="text"
                name="userName"
                autoComplete="username"
                required
                className={`finance-mobility-login-input ${
                  invalidUser ? "finance-mobility-login-input--invalid" : ""
                }`}
                style={{ textTransform: "uppercase" }}
                placeholder="Enter your user name"
                value={userName}
                onChange={(ev) => setUserName(ev.target.value)}
                onBlur={() =>
                  setTouched((t) => ({ ...t, userName: true }))
                }
                aria-invalid={invalidUser}
              />
              {invalidUser ? (
                <p className="finance-mobility-login-hint">User name is required</p>
              ) : null}
            </div>

            <div className="finance-mobility-login-field">
              <label
                className="finance-mobility-login-label"
                htmlFor="loginPassword"
              >
                Password
              </label>
              <input
                id="loginPassword"
                type="password"
                name="password"
                autoComplete="current-password"
                required
                className={`finance-mobility-login-input ${
                  invalidPass ? "finance-mobility-login-input--invalid" : ""
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                onBlur={() =>
                  setTouched((t) => ({ ...t, password: true }))
                }
                aria-invalid={invalidPass}
              />
              {invalidPass ? (
                <p className="finance-mobility-login-hint">Password is required</p>
              ) : null}
            </div>

            {serverError ? (
              <div
                className="finance-mobility-login-alert finance-mobility-login-alert--error"
                role="alert"
              >
                {serverError}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={!userName.trim() || !password}
              className="finance-mobility-login-submit"
            >
              Sign in
            </button>

            <div className="finance-mobility-login-footer">
              <span>
                New user?{" "}
                <Link to={MOBILITY.REGISTER}>Create an account</Link>
              </span>
              <div className="finance-mobility-login-divider" aria-hidden />
              <Link to={MOBILITY.FORGOT_PASSWORD}>Forgot password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
