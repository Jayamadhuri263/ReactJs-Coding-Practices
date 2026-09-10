import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MobilityHeader from "../../MobilityHeader";
import { MOBILITY } from "../../mobilityPaths";
import "./AuthorizePreConfirm.css";

export default function AuthorizePreConfirm() {
  const { referenceNo } = useParams();
  const navigate = useNavigate();
  const [authPaymentDetailsList, setAuthPaymentDetailsList] = useState([]);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
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

  const onConfirmAuthorize = (e) => {
    e.preventDefault();
    if (otp !== "12345") {
      window.alert("Entered invalid OTP, please try again!");
      setOtp("");
      return;
    }
    const row = authPaymentDetailsList[0];
    if (!row) return;
    const ref = row.referenceNo;
    fetch("http://localhost:8080/confirm-authorize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    })
      .then((r) => r.json())
      .then((response) => {
        navigate(
          `${MOBILITY.authorizeConfirmation(ref)}?record=${encodeURIComponent(
            JSON.stringify(response)
          )}`
        );
      })
      .catch(() => {});
    setOtp("");
  };

  const onCloseAuthorize = () => {
    navigate(MOBILITY.HOME);
  };

  return (
    <>
      <MobilityHeader />
      <div className="finance-mobility-home-main-container">
        <h1 className="finance-mobility-self-payment-main-heading">
          Transaction Authorize Pre-Confirmation
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
        <form onSubmit={onConfirmAuthorize}>
          <div
            className="form-outline mb-3 d-flex flex-row mt-3"
            style={{ width: "35%" }}
          >
            <label
              className="form-label"
              style={{ width: "30%", marginTop: 10, fontSize: 20 }}
              htmlFor="otp"
            >
              OTP<sup className="text-danger">*</sup> :
            </label>
            <div style={{ display: "flex", flexDirection: "column", width: "61%" }}>
              <input
                id="otp"
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
            <button type="submit" className="finance-mobility-auth-reject-button mr-5">
              <img
                src="/assets/images/auth.webp"
                alt="authorize"
                style={{ height: 36, width: 36 }}
              />
              <br />
              <p style={{ color: "white", fontSize: 16 }}>Authorize</p>
            </button>
            <button
              type="button"
              className="finance-mobility-auth-reject-button mr-3"
              onClick={onCloseAuthorize}
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
