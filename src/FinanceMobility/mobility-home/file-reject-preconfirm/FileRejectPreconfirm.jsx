import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import MobilityHeader from "../../MobilityHeader";
import { MOBILITY } from "../../mobilityPaths";
import "./FileRejectPreconfirm.css";

export default function FileRejectPreconfirm() {
  const { referenceNo } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [fileVerifyDetailsList, setFileVerifyDetailsList] = useState([]);
  const [rejectReason, setRejectReason] = useState("");

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

  const onRejectReasonForm = (e) => {
    e.preventDefault();
    const row = { ...fileVerifyDetailsList[0], reject_reason: rejectReason };
    const reference = row.referenceNo;
    fetch("http://localhost:8080/confirm-file-verify-reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    })
      .then(() => {
        navigate(MOBILITY.fileVerifyRejectConfirmation(reference));
      })
      .catch(() => {});
  };

  const onCloseReject = () => navigate(MOBILITY.HOME);

  return (
    <>
      <MobilityHeader />
      <div className="finance-mobility-home-main-container">
        <h2 className="mb-4 finance-mobility-self-payment-main-heading">
          File Verify Reject Pre-Confirmation
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
              <p style={{ width: "50%" }}>File Uploaded by </p>
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

            <label
              className="form-label"
              style={{ width: "30%", marginTop: "2em", fontSize: 20 }}
              htmlFor="file-reject-reason"
            >
              Reject Reason<sup className="text-danger">*</sup> :
            </label>
            <form onSubmit={onRejectReasonForm}>
              <textarea
                id="file-reject-reason"
                name="rejectReason"
                required
                maxLength={200}
                placeholder="Enter the Reject Reason"
                autoComplete="on"
                className="form-control form-control-md"
                style={{ width: "74%" }}
                rows={4}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
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
                  disabled={!rejectReason.trim()}
                >
                  <img
                    src="/assets/images/reject.webp"
                    alt="reject"
                    style={{ height: 36, width: 36 }}
                  />
                  <br />
                  <p style={{ color: "white", fontSize: 16 }}>Reject</p>
                </button>
                <button
                  type="button"
                  className="finance-mobility-auth-reject-button mr-3"
                  onClick={onCloseReject}
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
