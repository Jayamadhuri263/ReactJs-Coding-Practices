import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import MobilityHeader from "../../MobilityHeader";
import { MOBILITY } from "../../mobilityPaths";
import "./FileVerify.css";

export default function FileVerify() {
  const { referenceNo } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [fileVerifyDetailsList, setFileVerifyDetailsList] = useState([]);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    const username = localStorage.getItem("username");
    if (!jwt) {
      navigate(MOBILITY.LOGIN, { replace: true });
      return;
    }
    if (!searchParams.get("user") && username) {
      setSearchParams({ user: username }, { replace: true });
    }
    fetch(
      `http://localhost:8080/fileVerifyDetails?referenceNo=${encodeURIComponent(
        referenceNo
      )}`
    )
      .then((r) => r.json())
      .then((response) => {
        if (Array.isArray(response) && response[0]) {
          setFileVerifyDetailsList([response[0]]);
        }
      })
      .catch(() => {});
  }, [navigate, referenceNo, searchParams, setSearchParams]);

  const onVerifyFileUpload = (e) => {
    e.preventDefault();
    if (otp !== "12345") {
      window.alert("Entered invalid OTP, please try again!");
      setOtp("");
      return;
    }
    const row = fileVerifyDetailsList[0];
    if (!row) return;
    const reference = row.referenceNo;
    fetch("http://localhost:8080/confirm-file-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    })
      .then((r) => r.json())
      .then((response) => {
        navigate(
          `${MOBILITY.fileVerifyConfirmation(reference)}?record=${encodeURIComponent(
            JSON.stringify(response)
          )}`
        );
      })
      .catch(() => {});
    setOtp("");
  };

  const onCloseFileVerify = () => navigate(MOBILITY.HOME);

  return (
    <>
      <MobilityHeader />
      <div className="finance-mobility-home-main-container">
        <h2 className="mb-4 finance-mobility-self-payment-main-heading">
          File Upload Verify Pre-Confirmation
        </h2>
        {fileVerifyDetailsList.map((subRecord) => (
          <div key={subRecord.referenceNo}>
            <div style={{ display: "flex", width: "100%" }}>
              <p style={{ width: "50%" }}>Reference Number </p>
              <span style={{ width: "50%" }}>{subRecord.referenceNo}</span>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <p style={{ width: "50%" }}>File name </p>
              <span style={{ width: "50%" }}>{subRecord.fileName}</span>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <p style={{ width: "50%" }}>Uploaded By </p>
              <span style={{ width: "50%" }}>{subRecord.uploadedBy}</span>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <p style={{ width: "50%" }}>Verify/Authorize To </p>
              <span style={{ width: "50%" }}>{subRecord.authorizeTo}</span>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <p style={{ width: "50%" }}>Beneficiary Account Number </p>
              <span style={{ width: "50%" }}>{subRecord.beneAccountNo}</span>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <p style={{ width: "50%" }}>Beneficiary Name </p>
              <span style={{ width: "50%" }}>{subRecord.beneName}</span>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <p style={{ width: "50%" }}>Debit Account Number </p>
              <span style={{ width: "50%" }}>{subRecord.debitAccountNo}</span>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <p style={{ width: "50%" }}>Debit Name </p>
              <span style={{ width: "50%" }}>{subRecord.debitName}</span>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <p style={{ width: "50%" }}>Amount </p>
              <span style={{ width: "50%" }}>Rs. {subRecord.debit_amount}</span>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <p style={{ width: "50%" }}>Status </p>
              <span style={{ width: "50%" }}>{subRecord.status}</span>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <p style={{ width: "50%" }}>Payment Type </p>
              <span style={{ width: "50%" }}>
                {subRecord.paymentType === "SELF_FORM"
                  ? "Internal Fund Transfer(Self)"
                  : null}
              </span>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <p style={{ width: "50%" }}>File Uploaded Date</p>
              <span style={{ width: "50%" }}>
                {subRecord.createdAt
                  ? new Date(subRecord.createdAt).toLocaleString()
                  : ""}
              </span>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <p style={{ width: "50%" }}>Customer Reference </p>
              <span style={{ width: "50%" }}>
                {subRecord.custom_ref === "" ? "-" : subRecord.custom_ref}
              </span>
            </div>

            <form onSubmit={onVerifyFileUpload}>
              <div
                className="form-outline mb-3 d-flex flex-row mt-3"
                style={{ width: "75%" }}
              >
                <label
                  className="form-label"
                  style={{ width: "30%", marginTop: 10, fontSize: 20 }}
                  htmlFor="file-verify-otp"
                >
                  OTP<sup className="text-danger">*</sup> :
                </label>
                <div
                  style={{ display: "flex", flexDirection: "column", width: "61%" }}
                >
                  <input
                    id="file-verify-otp"
                    type="password"
                    name="otp"
                    required
                    maxLength={5}
                    pattern="[0-9]{5}"
                    placeholder="Enter One Time Password"
                    autoComplete="on"
                    className="form-control form-control-md"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "60%",
                  justifyContent: "space-between",
                  marginTop: "4em",
                }}
              >
                <button
                  type="submit"
                  className="finance-mobility-auth-reject-button mr-5"
                  disabled={otp.length !== 5}
                >
                  <img
                    src="/assets/images/auth.webp"
                    alt="authorize"
                    style={{ height: 36, width: 36 }}
                  />
                  <br />
                  <p style={{ color: "white", fontSize: 16 }}>Accept</p>
                </button>
                <button
                  type="button"
                  className="finance-mobility-auth-reject-button mr-3"
                  onClick={onCloseFileVerify}
                >
                  <img
                    src="/assets/images/close.webp"
                    alt="close"
                    style={{ height: 25, width: 25 }}
                  />
                  <br />
                  <p style={{ color: "white", fontSize: 16 }}>Close</p>
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </>
  );
}
