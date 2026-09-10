import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobilityHeader from "../../../MobilityHeader";
import { MOBILITY } from "../../../mobilityPaths";
import { mobilityPostFileWithProgress } from "../../../mobilityApi";
import "./UserProfile.css";

export default function UserProfile() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") ?? "";

  const [userDetailsList, setUserDetailsList] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      navigate(MOBILITY.LOGIN, { replace: true });
      return;
    }
    fetch(
      `http://localhost:8080/user-profile?username=${encodeURIComponent(username)}`
    )
      .then((r) => r.json())
      .then((res) => {
        if (Array.isArray(res) && res[0]) {
          setUserDetailsList([res[0]]);
        }
      })
      .catch(() => {});
  }, [navigate, username]);

  const selectFile = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
    setMessage("");
    setFileName("");
    setErrorMessage("");
    setProgress(0);
  };

  const onUploadFile = () => {
    setProgress(0);
    if (!selectedFiles?.length) return;
    const file = selectedFiles.item(0);
    if (!file) return;
    setFileName(file.name);
    setCurrentFile(file);
    mobilityPostFileWithProgress({
      path: "/update-profile",
      file,
      queryParam: "updatedBy",
      queryValue: username,
      onProgress: setProgress,
    })
      .then((body) => {
        setMessage(body.message ?? "");
      })
      .catch((err) => {
        setProgress(0);
        if (err?.status === 500) {
          setMessage("Please upload images only!");
        } else if (err?.text) {
          setErrorMessage(err.text);
        }
        setCurrentFile(undefined);
      });
    setSelectedFiles(null);
  };

  return (
    <>
      <MobilityHeader />
      <div className="finance-mobility-home-main-container">
        <h2 className="finance-mobility-self-payment-main-heading mb-4">User Profile</h2>
        {userDetailsList.map((detail) => (
          <div key={detail.userId} className="finance-mobility-user-details-list-container">
            <div style={{ display: "flex" }}>
              <p>Username</p>
              <span>{detail.userName}</span>
            </div>
            <div style={{ display: "flex" }}>
              <p>User ID</p>
              <span>{detail.userId}</span>
            </div>
            <div style={{ display: "flex" }}>
              <p>User Type</p>
              <span>{detail.userType}</span>
            </div>
            <div style={{ display: "flex" }}>
              <p>Mobile Number</p>
              <span>+91 {detail.mobileNo}</span>
            </div>
            <div style={{ display: "flex" }}>
              <p>Email ID</p>
              <span>{detail.email}</span>
            </div>
            <div style={{ display: "flex" }}>
              <p>GCIF</p>
              <span>{detail.gcif}</span>
            </div>
          </div>
        ))}

        <div className="form-outline mb-3 mt-3 d-flex flex-column">
          <h2 className="form-label" style={{ width: "28%", marginTop: 10 }}>
            Update Profile
          </h2>
          <div style={{ display: "flex", flexDirection: "column", width: "40%" }}>
            <input
              type="file"
              name="file"
              required
              autoComplete="on"
              className="form-control form-control-md"
              onChange={selectFile}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          disabled={!selectedFiles}
          onClick={onUploadFile}
          style={{ width: "14%" }}
        >
          Update Profile
        </button>

        {currentFile ? (
          <div className="progress my-3" style={{ width: "45%" }}>
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        ) : null}

        {errorMessage ? (
          <h1 className="text-success mt-4">{errorMessage}</h1>
        ) : null}
        {message ? (
          <h4 className="text-danger mt-4">*{message}</h4>
        ) : null}
      </div>
    </>
  );
}
