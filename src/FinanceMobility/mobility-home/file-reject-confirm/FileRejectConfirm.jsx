import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import MobilityHeader from "../../MobilityHeader";
import { MOBILITY } from "../../mobilityPaths";
import "./FileRejectConfirm.css";

export default function FileRejectConfirm() {
  const { referenceNo } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showQrCode, setShowQrCode] = useState(false);
  const [value, setValue] = useState("");

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
    const origin = window.location.origin;
    setValue(`${origin}${MOBILITY.qrCode(referenceNo)}`);
  }, [navigate, referenceNo, searchParams, setSearchParams]);

  const onClose = () => navigate(MOBILITY.HOME);
  const onQR = () => setShowQrCode((s) => !s);
  const qrImg =
    showQrCode && value
      ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
          value
        )}`
      : null;

  return (
    <>
      <MobilityHeader />
      <div className="finance-mobility-home-main-container">
        <h2 className="finance-mobility-self-payment-main-heading mb-5">
          File Verify Reject Confirmation
        </h2>
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
                <h1 style={{ width: "80%", textAlign: "center", marginBottom: 0 }}>
                  {referenceNo}
                </h1>
                <h2 style={{ width: "80%", textAlign: "center" }} className="text-success">
                  File Verify request has been rejected successfully!
                </h2>
              </div>
            </div>
          ) : null}
        </div>

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
