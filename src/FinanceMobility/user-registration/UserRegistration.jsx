import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MOBILITY } from "../mobilityPaths";
import "../finance-mobility-auth.css";

const userTypeList = [{ type: "MAKER" }, { type: "CHECKER" }];

export default function UserRegistration() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [typeHasError, setTypeHasError] = useState(false);
  const [form, setForm] = useState({
    userId: "",
    userName: "",
    userType: "default",
    gcif: "",
    mobileNo: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    if (jwt) navigate(MOBILITY.HOME, { replace: true });
  }, [navigate]);

  const validateTopic = (topic) => {
    setTypeHasError(topic === "default");
  };

  const onRegister = async (e) => {
    e.preventDefault();
    setServerError("");
    if (form.userType === "default") {
      setTypeHasError(true);
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setServerError(err.message || "Registration failed");
        return;
      }
      navigate(`${MOBILITY.LOGIN}?registered=true`);
    } catch (err) {
      setServerError(err?.message || "Network error");
    }
  };

  const set = (k) => (ev) => setForm((f) => ({ ...f, [k]: ev.target.value }));

  return (
    <div className="finance-mobility-login-page">
      <div className="finance-mobility-login-shell finance-mobility-login-shell--wide">
        <div className="finance-mobility-login-card">
          <header className="finance-mobility-login-card-header">
            <h1 className="finance-mobility-login-brand">Finance Mobility</h1>
            <p className="finance-mobility-login-subtitle">
              Create your account to access payments and transfers
            </p>
          </header>

          <form
            className="finance-mobility-login-form"
            onSubmit={onRegister}
            noValidate
            autoComplete="on"
          >
            <div className="finance-mobility-login-field">
              <label className="finance-mobility-login-label" htmlFor="regUserId">
                User ID
              </label>
              <input
                id="regUserId"
                type="text"
                name="userId"
                required
                className="finance-mobility-login-input"
                placeholder="Enter user ID"
                value={form.userId}
                onChange={set("userId")}
              />
            </div>

            <div className="finance-mobility-login-field">
              <label
                className="finance-mobility-login-label"
                htmlFor="regUserName"
              >
                User name
              </label>
              <input
                id="regUserName"
                type="text"
                name="userName"
                required
                className="finance-mobility-login-input"
                style={{ textTransform: "uppercase" }}
                placeholder="Enter display name"
                value={form.userName}
                onChange={set("userName")}
              />
            </div>

            <div className="finance-mobility-login-field">
              <label
                className="finance-mobility-login-label"
                htmlFor="regUserType"
              >
                User type
              </label>
              <select
                id="regUserType"
                className={`finance-mobility-login-input ${
                  typeHasError ? "finance-mobility-login-input--invalid" : ""
                }`}
                name="userType"
                value={form.userType}
                onChange={(ev) => {
                  setForm((f) => ({ ...f, userType: ev.target.value }));
                  validateTopic(ev.target.value);
                }}
                onBlur={(ev) => validateTopic(ev.target.value)}
                required
              >
                <option value="default">Select maker or checker</option>
                {userTypeList.map((t) => (
                  <option key={t.type} value={t.type}>
                    {t.type}
                  </option>
                ))}
              </select>
              {typeHasError ? (
                <p className="finance-mobility-login-hint">
                  User type must be selected
                </p>
              ) : null}
            </div>

            <div className="finance-mobility-login-field">
              <label className="finance-mobility-login-label" htmlFor="regGcif">
                GCIF
              </label>
              <input
                id="regGcif"
                type="text"
                name="gcif"
                required
                className="finance-mobility-login-input"
                placeholder="GCIF"
                value={form.gcif}
                onChange={set("gcif")}
              />
            </div>

            <div className="finance-mobility-login-field">
              <label
                className="finance-mobility-login-label"
                htmlFor="regMobile"
              >
                Mobile number
              </label>
              <input
                id="regMobile"
                type="text"
                name="mobileNo"
                required
                pattern="[0-9]{10}"
                inputMode="numeric"
                maxLength={10}
                className="finance-mobility-login-input"
                placeholder="10-digit mobile number"
                value={form.mobileNo}
                onChange={set("mobileNo")}
              />
            </div>

            <div className="finance-mobility-login-field">
              <label className="finance-mobility-login-label" htmlFor="regEmail">
                Email
              </label>
              <input
                id="regEmail"
                type="email"
                name="email"
                required
                autoComplete="email"
                className="finance-mobility-login-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
              />
            </div>

            <div className="finance-mobility-login-field">
              <label
                className="finance-mobility-login-label"
                htmlFor="regPassword"
              >
                Password
              </label>
              <input
                id="regPassword"
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

            {serverError ? (
              <div
                className="finance-mobility-login-alert finance-mobility-login-alert--error"
                role="alert"
              >
                {serverError}
              </div>
            ) : null}

            <button type="submit" className="finance-mobility-login-submit">
              Create account
            </button>

            <div className="finance-mobility-login-footer">
              <span>
                Already registered?{" "}
                <Link to={MOBILITY.LOGIN}>Sign in</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
