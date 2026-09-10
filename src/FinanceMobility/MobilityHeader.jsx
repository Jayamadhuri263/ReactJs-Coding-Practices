import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MOBILITY } from "./mobilityPaths";
import "./mobility-home/mobility-header/MobilityHeader.css";

function arrayBufferToBase64(buffer) {
  if (!buffer) return "";
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function MobilityHeader() {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState("");
  const [lastLoginTime, setLastLoginTime] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setLoginUser(localStorage.getItem("username") ?? "");
    setLastLoginTime(localStorage.getItem("lastLoginTime") ?? "");
  }, []);

  useEffect(() => {
    const u = localStorage.getItem("username");
    if (!u) return;
    fetch(
      `http://localhost:8080/get-profile-logo?updatedBy=${encodeURIComponent(
        u
      )}`
    )
      .then((r) => r.json())
      .then((res) => {
        if (res && res[0]?.data) setProfile(res[0].data);
      })
      .catch(() => {});
  }, []);

  const onDropdown = () => {
    document
      .getElementById("myDropdown")
      ?.classList.toggle("finance-mobility-show");
  };

  const onLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("query");
    navigate(`${MOBILITY.LOGIN}?logout=logout`);
  };

  const onChangePassword = () => {
    navigate(MOBILITY.FORGOT_PASSWORD);
  };

  const onShowUserDetails = () => {
    navigate(MOBILITY.USER_PROFILE);
  };

  const imgSrc =
    profile?.data
      ? `data:image/jpg;base64,${arrayBufferToBase64(profile.data)}`
      : null;

  const lastLoginDisplay = lastLoginTime
    ? (() => {
        const d = new Date(lastLoginTime);
        return Number.isNaN(d.getTime()) ? lastLoginTime : d.toLocaleString();
      })()
    : "";

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
        crossOrigin="anonymous"
      />
      <nav className="navbar navbar-expand-lg fixed-top navbar-light finance-mobility-navbar-custom">
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item" style={{ display: "flex" }}>
              <i className="fa fa-home" style={{ fontSize: 36 }} />
              <Link className="nav-link" to={MOBILITY.HOME}>
                Home
              </Link>
            </li>
          </ul>
        </div>
        <div style={{ display: "flex" }}>
          <div className="collapse navbar-collapse">
            <h2 className="mt-3">
              Last Logged in: <span>{lastLoginDisplay}</span>
            </h2>
          </div>
          <div
            className="nav-item dropdown mt-2"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <h2 style={{ color: "white" }} className="mr-0 ml-4">
              {loginUser.toUpperCase()}
            </h2>
            <button
              type="button"
              className="nav-link dropdown-toggle ml-0"
              onClick={onDropdown}
              id="navbarDropdownMenuLink"
              style={{ display: "flex" }}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {imgSrc ? (
                <img src={imgSrc} alt="profile" />
              ) : (
                <span
                  role="img"
                  aria-label="profile"
                  style={{ width: 40, height: 40, background: "#ccc" }}
                />
              )}
            </button>
            <div
              className="dropdown-menu finance-mobility-dropdown-content"
              id="myDropdown"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <button
                type="button"
                className="dropdown-item"
                onClick={onShowUserDetails}
              >
                Profile
              </button>
              <button
                type="button"
                className="dropdown-item"
                onClick={onChangePassword}
              >
                Change Password
              </button>
              <button
                type="button"
                className="dropdown-item"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default MobilityHeader;
