import React, { useMemo, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { apiCall } from "./api";
import "./index.css";

export default function OAuthComponent() {  
  const cachedProfile = (() => {
    try {
      const saved = localStorage.getItem("oauth_profile_cache");
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  })();

  const [profile, setProfile] = useState(cachedProfile);
  const [message, setMessage] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const saveProfile = (data) => {
    setProfile(data);
    try {
      localStorage.setItem("oauth_profile_cache", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  const clearProfile = () => {
    setProfile(null);
    localStorage.removeItem("oauth_profile_cache");
  };

  const extractUserFromToken = (token) => {
    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(window.atob(base64Payload));
      return {
        displayName: decodedPayload.name || "",
        email: decodedPayload.email || "",
        googleId: decodedPayload.sub || ""
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const normalizedUser = useMemo(() => {
    if (!profile) {
      return null;
    }

    const user = profile.user || profile;
    return {
      displayName: user.displayName || user.name || "",
      email: user.email || "",
      googleId: user.googleId || user.sub || user.id || ""
    };
  }, [profile]);

  const isSignedIn = Boolean(normalizedUser && (normalizedUser.email || normalizedUser.googleId));

  const getProfile = async (isSilent = false) => {
    try {
      const data = await apiCall("http://localhost:5000/profile");
      saveProfile(data);
      if (!isSilent) {
        setMessage("Profile fetched successfully.");
      }
      console.log(data);
    } catch (error) {
      if (!isSilent) {
        setMessage("Unable to fetch profile. Please try again.");
      }
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include"
      });
      clearProfile();
      setShowLogoutConfirm(false);
      setMessage("Logged out successfully.");
    } catch (error) {
      setMessage("Logout failed. Please try again.");
      console.log(error);
    }
  };

  return (
  <GoogleOAuthProvider clientId="268591689770-n4l88t0ssu7ri8dbbagkt6ijmrfnt2dg.apps.googleusercontent.com">        
    <div className="oauth-page">
      <div className="oauth-card">
        <h2 className="oauth-title">Welcome Back</h2>
        <p className="oauth-subtitle">
          {isSignedIn
            ? "You are signed in. Manage your session and account details below."
            : "Sign in with Google to securely access your profile and manage your session."}
        </p>
        {!isSignedIn && (
          <GoogleLogin
              onSuccess={async (credentialResponse) => {
                  console.log("Google Response:", credentialResponse);
                  const idToken = credentialResponse.credential;
                  console.log("TOKEN:", idToken);

                  await fetch("http://localhost:5000/auth/google", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ idToken }),
                  credentials: "include"
                  });

                  const tokenUser = extractUserFromToken(idToken);
                  if (tokenUser) {
                    saveProfile({ user: tokenUser });
                  }
                  setMessage("Signed in successfully.");
              }}
              onError={() => {
                  setMessage("Login Failed");
                  console.log("Login Failed");
              }}
          />
        )}
        {isSignedIn && (
          <div className="oauth-actions">
            <button
              onClick={getProfile}
              className="oauth-button oauth-button-primary"
            >
              Refresh Profile
            </button>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="oauth-button oauth-button-danger"
            >
              Logout
            </button>
          </div>
        )}
        {isSignedIn && (
          <div className="oauth-panel">
            <h3 className="oauth-panel-title">Profile Details</h3>
            <p className="oauth-profile-item">
              <strong>Name:</strong> {normalizedUser?.displayName || "N/A"}
            </p>
            <p className="oauth-profile-item">
              <strong>Email:</strong> {normalizedUser?.email || "N/A"}
            </p>
            {normalizedUser?.googleId && (
              <p className="oauth-profile-item">
                <strong>Google ID:</strong> {normalizedUser.googleId}
              </p>
            )}
          </div>
        )}
        {showLogoutConfirm && isSignedIn && (
          <div className="oauth-modal-backdrop" onClick={() => setShowLogoutConfirm(false)}>
            <div className="oauth-modal" onClick={(event) => event.stopPropagation()}>
              <h3 className="oauth-panel-title">Confirm Logout</h3>
              <p className="oauth-profile-item">Are you sure you want to log out?</p>
              <div className="oauth-confirm-row">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="oauth-button oauth-button-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={logout}
                  className="oauth-button oauth-button-danger"
                >
                  Confirm Logout
                </button>
              </div>
            </div>
          </div>
        )}
        {message && <p className="oauth-message">{message}</p>}
      </div>
    </div>
  </GoogleOAuthProvider>
  );
}