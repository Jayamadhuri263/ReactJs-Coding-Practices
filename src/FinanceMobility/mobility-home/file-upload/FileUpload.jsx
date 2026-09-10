import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MobilityHeader from "../../MobilityHeader";
import { MOBILITY } from "../../mobilityPaths";
import { mobilityPostFileWithProgress } from "../../mobilityApi";
import "./FileUpload.css";

export default function FileUpload() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const userName = localStorage.getItem("username") ?? "";

  const [selectedFiles, setSelectedFiles] = useState(null);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorText, setErrorText] = useState("");
  const [errorColumnFieldsMessage, setErrorColumnFieldsMessage] = useState(null);
  const [referenceNo, setReferenceNo] = useState("");
  const [status, setStatus] = useState("");
  const [showResultContainer, setShowResultContainer] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      navigate(MOBILITY.LOGIN, { replace: true });
      return;
    }
    if (!searchParams.get("user") && userName) {
      setSearchParams({ user: userName }, { replace: true });
    }
  }, [navigate, searchParams, setSearchParams, userName]);

  const selectFile = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
    setMessage("");
    setFileName("");
    setErrorMessage("");
    setErrorText("");
    setProgress(0);
    setShowResultContainer(false);
  };

  const onUploadFile = () => {
    setProgress(0);
    if (!selectedFiles?.length) return;
    const file = selectedFiles.item(0);
    if (!file) return;
    setFileName(file.name);
    setCurrentFile(file);
    mobilityPostFileWithProgress({
      path: "/file-upload",
      file,
      queryParam: "uploadedBy",
      queryValue: userName,
      onProgress: setProgress,
    })
      .then((body) => {
        setShowResultContainer(true);
        setMessage(body.message ?? "");
        setReferenceNo(body.referenceNo);
        setStatus(body.status ?? "");
        const origin = window.location.origin;
        setValue(`${origin}${MOBILITY.qrCode(body.referenceNo)}`);
      })
      .catch((err) => {
        setProgress(0);
        setShowResultContainer(false);
        if (err && typeof err === "object" && err.message !== undefined) {
          setErrorMessage(err.message);
          setErrorText(err.errorText);
          setErrorColumnFieldsMessage(err.error);
        } else {
          setMessage("Could not upload the file!");
        }
        setCurrentFile(undefined);
      });
    setSelectedFiles(null);
  };

  const onClose = () => {
    navigate(MOBILITY.HOME);
  };

  const onQR = () => setShowQrCode((s) => !s);

  const qrImg =
    showQrCode && value
      ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
          value
        )}`
      : null;

  const lastMod =
    selectedFiles?.[0]?.lastModified != null
      ? new Date(selectedFiles[0].lastModified).toLocaleString()
      : null;

  return (
    <>
      <MobilityHeader />
      <div className="finance-mobility-home-main-container">
        <h2 className="finance-mobility-self-payment-main-heading mb-3">File Upload</h2>

        <div
          className="form-outline mb-3 d-flex flex-column mt-0"
          style={{ width: "60%" }}
        >
          <label
            className="form-label mb-3"
            style={{ width: "30%", marginTop: 10, fontSize: 20 }}
            htmlFor="mobility-file-input"
          >
            Upload a file here<sup className="text-danger">*</sup>
          </label>
          <div style={{ display: "flex", flexDirection: "column", width: "71%" }}>
            <input
              id="mobility-file-input"
              type="file"
              name="file"
              required
              autoComplete="on"
              className="form-control form-control-md"
              onChange={selectFile}
            />
          </div>
          {lastMod ? (
            <p className="mt-3">
              <span style={{ fontWeight: 700 }}>Last modified:</span> {lastMod}
            </p>
          ) : null}
          <button
            type="button"
            className="btn btn-primary mt-5"
            disabled={!selectedFiles}
            onClick={onUploadFile}
            style={{ width: "12%" }}
          >
            Upload
          </button>
        </div>

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

        {progress === 100 ? (
          <h3 className="text-success">{message}</h3>
        ) : null}
        {errorMessage && progress !== 100 ? (
          <h3 className="text-danger mb-0">
            {errorMessage} &quot;<i>{fileName}</i>&quot;
          </h3>
        ) : null}
        {progress !== 100 && errorText ? (
          <h3 className="text-danger mt-0" style={{ fontWeight: 800 }}>
            *{errorText}
          </h3>
        ) : null}
        {errorColumnFieldsMessage != null && progress !== 100 && !errorText ? (
          <h3 className="text-danger mt-0" style={{ fontWeight: 800 }}>
            *{String(errorColumnFieldsMessage)}
          </h3>
        ) : null}

        {showResultContainer ? (
          <div className="finance-mobility-main-div">
            {referenceNo ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <img
                  src="/assets/images/a.webp"
                  className="finance-mobility-e-bank-home-header-logo"
                  alt="logo"
                  style={{ marginRight: "3em" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "95%",
                    marginTop: "-1.5em",
                  }}
                >
                  <h1
                    style={{ width: "80%", textAlign: "center", marginBottom: 0 }}
                  >
                    {referenceNo}
                  </h1>
                  <h2
                    style={{ width: "80%", textAlign: "center" }}
                    className="text-success"
                  >
                    File upload request has been sent to {status} successfully!
                  </h2>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {showResultContainer ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: "4em",
            }}
          >
            <button type="button" onClick={onQR} className="btn btn-danger">
              {!showQrCode ? "Show" : "Hide"} QR Code
            </button>
          </div>
        ) : null}

        {qrImg ? (
          <div className="mt-5">
            <img src={qrImg} alt="QR" className="finance-mobility-bshadow" />
            <a href={value} target="_blank" rel="noreferrer">
              ({value})
            </a>
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: "4em",
          }}
        >
          <button type="button" onClick={onClose} className="btn btn-danger">
            Close
          </button>
        </div>
      </div>
    </>
  );
}
