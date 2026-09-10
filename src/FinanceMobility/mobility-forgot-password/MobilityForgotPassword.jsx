import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { MOBILITY } from "../mobilityPaths";
import "../finance-mobility-auth.css";

export default function MobilityForgotPassword() {
  const [passwordMatched, setPasswordMatched] = useState(true);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [form, setForm] = useState({
    userName: "",
    password: "",
    c_password: "",
  });

  const onChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");
    if (form.password !== form.c_password) {
      setPasswordMatched(false);
      return;
    }
    setPasswordMatched(true);
    try {
      const res = await fetch("http://localhost:8080/change-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setPasswordError(err.message || "");
        setPasswordSuccess(err.text || "");
        return;
      }
      setPasswordSuccess("Password updated");
    } catch (err) {
      setPasswordError(err?.message || "");
    }
  };

  const set = (k) => (ev) => setForm((f) => ({ ...f, [k]: ev.target.value }));

  return (
    <div className="finance-mobility-login-page">
      <div className="finance-mobility-login-shell">
        <div className="finance-mobility-login-card">
          <header className="finance-mobility-login-card-header">
            <h1 className="finance-mobility-login-brand">Finance Mobility</h1>
            <p className="finance-mobility-login-subtitle">
              Set a new password for your account
            </p>
          </header>

          <form
            className="finance-mobility-login-form"
            onSubmit={onChangePassword}
            noValidate
          >
            {passwordSuccess ? (
              <div
                className="finance-mobility-login-alert finance-mobility-login-alert--info"
                role="status"
              >
                {passwordSuccess}.{" "}
                <Link to={MOBILITY.LOGIN}>Sign in</Link>
              </div>
            ) : null}

            {!passwordSuccess && passwordError ? (
              <div
                className="finance-mobility-login-alert finance-mobility-login-alert--error"
                role="alert"
              >
                {passwordError}
              </div>
            ) : null}

            {!passwordSuccess ? (
              <Fragment>
                <div className="finance-mobility-login-field">
                  <label
                    className="finance-mobility-login-label"
                    htmlFor="forgotUserName"
                  >
                    User name
                  </label>
                  <input
                    id="forgotUserName"
                    type="text"
                    name="userName"
                    required
                    autoComplete="username"
                    className="finance-mobility-login-input"
                    style={{ textTransform: "uppercase" }}
                    placeholder="Enter your user name"
                    value={form.userName}
                    onChange={set("userName")}
                  />
                </div>

                <div className="finance-mobility-login-field">
                  <label
                    className="finance-mobility-login-label"
                    htmlFor="forgotPassword"
                  >
                    New password
                  </label>
                  <input
                    id="forgotPassword"
                    type="password"
                    name="password"
                    required
                    minLength={7}
                    autoComplete="new-password"
                    className="finance-mobility-login-input"
                    placeholder="At least 7 characters"
                    value={form.password}
                    onChange={set("password")}
                  />
                </div>

                <div className="finance-mobility-login-field">
                  <label
                    className="finance-mobility-login-label"
                    htmlFor="forgotConfirmPassword"
                  >
                    Confirm new password
                  </label>
                  <input
                    id="forgotConfirmPassword"
                    type="password"
                    name="c_password"
                    required
                    minLength={7}
                    autoComplete="new-password"
                    className="finance-mobility-login-input"
                    placeholder="Re-enter password"
                    value={form.c_password}
                    onChange={set("c_password")}
                  />
                </div>

                {!passwordMatched ? (
                  <p className="finance-mobility-login-hint">
                    Password and confirm password must match.
                  </p>
                ) : null}

                <button type="submit" className="finance-mobility-login-submit">
                  Update password
                </button>

                <div className="finance-mobility-login-footer">
                  <Link to={MOBILITY.LOGIN}>Back to sign in</Link>
                </div>
              </Fragment>
            ) : (
              <div className="finance-mobility-login-footer">
                <Link to={MOBILITY.LOGIN}>Back to sign in</Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
