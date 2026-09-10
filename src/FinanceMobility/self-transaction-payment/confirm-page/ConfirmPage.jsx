import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobilityHeader from "../../MobilityHeader";
import { useSelfPayment } from "../../SelfPaymentContext";
import { MOBILITY } from "../../mobilityPaths";
import "./ConfirmPage.css";

export default function ConfirmPage() {
  const navigate = useNavigate();
  const { selfFormData } = useSelfPayment();
  const [showContainer, setShowContainer] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [primaryMessage, setPrimaryMessage] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      navigate(MOBILITY.LOGIN, { replace: true });
      return;
    }
    if (!selfFormData?.length) {
      navigate(MOBILITY.SELF_INITIATION, { replace: true });
      return;
    }
    fetch("http://localhost:8080/self-initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selfFormData),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        setShowContainer(true);
        if (!res.ok) {
          setErrorMessage(data?.error || data?.message || "Error");
          return;
        }
        if (
          data.message ===
          "Insufficient bank balance to make payment. Please check your available balance and try again!"
        ) {
          setPrimaryMessage(data.message);
          return;
        }
        setSuccessMessage(data.message);
        setReferenceNo(data.referenceNo);
        const origin = window.location.origin;
        setQrValue(`${origin}${MOBILITY.qrCode(data.referenceNo)}`);
      })
      .catch((err) => {
        setShowContainer(true);
        setErrorMessage(err?.message || "Network error");
      });
  }, [navigate, selfFormData]);

  const onClose = () => {
    navigate(MOBILITY.PAYMENTS);
  };

  const onQR = () => {
    setShowQrCode((s) => !s);
  };

  const qrImg =
    showQrCode && qrValue
      ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
          qrValue
        )}`
      : null;

  return (
    <>
      <MobilityHeader />
      <div className="finance-mobility-self-payment-main-container">
        <h2 className="finance-mobility-self-payment-main-heading">Confirmation</h2>
        {showContainer ? (
          <div className="finance-mobility-main-div">
            {successMessage ? (
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
                    width: "88%",
                  }}
                >
                  <h1 style={{ width: "60%", textAlign: "center", marginBottom: 0 }}>
                    {referenceNo}
                  </h1>
                  <h2
                    style={{ width: "60%", textAlign: "center" }}
                    className="text-success"
                  >
                    {successMessage}
                  </h2>
                </div>
              </div>
            ) : null}
            {errorMessage ? (
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <img
                  src="/assets/images/error.png"
                  style={{ height: 50, width: 50, marginLeft: "2em", marginRight: "3em" }}
                  alt="logo"
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "88%",
                  }}
                >
                  <h2 style={{ textAlign: "center" }} className="text-danger">
                    {errorMessage}
                  </h2>
                </div>
              </div>
            ) : null}
            {primaryMessage ? (
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <img
                  src="/assets/images/warning.webp"
                  style={{ height: 85, width: 100, marginRight: "3em" }}
                  alt="logo"
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "88%",
                  }}
                >
                  <h2
                    style={{ width: "60%", textAlign: "center" }}
                    className="text-warning"
                  >
                    {primaryMessage}
                  </h2>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {showContainer ? (
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
            <a href={qrValue} target="_blank" rel="noreferrer">
              ({qrValue})
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
