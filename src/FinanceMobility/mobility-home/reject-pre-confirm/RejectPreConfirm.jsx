import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MobilityHeader from "../../MobilityHeader";
import { MOBILITY } from "../../mobilityPaths";
import "./RejectPreConfirm.css";

export default function RejectPreConfirm() {
  const { referenceNo } = useParams();
  const navigate = useNavigate();
  const [authPaymentDetailsList, setAuthPaymentDetailsList] = useState([]);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      navigate(MOBILITY.LOGIN, { replace: true });
      return;
    }
    fetch(
      `http://localhost:8080/paymentAuthorizeDetails?referenceNo=${encodeURIComponent(
        referenceNo
      )}`
    )
      .then((r) => r.json())
      .then((response) => {
        if (Array.isArray(response) && response[0]) {
          setAuthPaymentDetailsList([response[0]]);
        }
      })
      .catch(() => {});
    fetch("http://localhost:8080/getOTP").catch(() => {});
  }, [navigate, referenceNo]);

  const onRejectReasonForm = (e) => {
    e.preventDefault();
    const row = { ...authPaymentDetailsList[0], reject_reason: rejectReason };
    const ref = row.referenceNo;
    fetch("http://localhost:8080/confirm-reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    })
      .then((r) => r.json())
      .then((response) => {
        navigate(
          `${MOBILITY.rejectConfirmation(ref)}?record=${encodeURIComponent(
            JSON.stringify(response)
          )}`
        );
      })
      .catch(() => {});
  };

  const onCloseReject = () => navigate(MOBILITY.HOME);

  return (
    <>
      <MobilityHeader />
      <div className="finance-mobility-home-main-container">
        <h1 className="finance-mobility-self-payment-main-heading">
          Transaction Reject Pre-Confirmation
        </h1>
        <table>
          <thead>
            <tr>
              <th>Reference No</th>
              <th>Payment Type</th>
              <th>Debit Amount</th>
            </tr>
          </thead>
          <tbody>
            {authPaymentDetailsList.map((payment) => (
              <tr key={payment.referenceNo}>
                <td>{payment.referenceNo}</td>
                <td>
                  {payment.paymentType === "SELF_FORM"
                    ? "Internal Fund Transfer(Self)"
                    : payment.paymentType === ""
                    ? "-"
                    : ""}
                </td>
                <td>Rs. {payment.debit_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <label
          className="form-label"
          style={{ width: "30%", marginTop: 10, fontSize: 20 }}
          htmlFor="rejectReason"
        >
          Reject Reason<sup className="text-danger">*</sup> :
        </label>
        <form onSubmit={onRejectReasonForm}>
          <textarea
            id="rejectReason"
            rows={4}
            name="rejectReason"
            required
            maxLength={200}
            placeholder="Enter the Reject Reason"
            autoComplete="on"
            className="form-control form-control-md"
            style={{ width: "42%" }}
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
            <button type="submit" className="finance-mobility-auth-reject-button mr-5">
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
    </>
  );
}
