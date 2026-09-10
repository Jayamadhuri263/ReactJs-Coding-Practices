import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MobilityHeader from "../MobilityHeader";
import { MOBILITY } from "../mobilityPaths";
import "./MobilityPayment.css";

export default function MobilityPayment() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      navigate(MOBILITY.LOGIN, { replace: true });
    }
  }, [navigate]);

  const onClose = () => {
    navigate(MOBILITY.HOME);
  };

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />
      <MobilityHeader />
      <div className="finance-mobility-finance-mobility-mobility-main-container">
        <li
          style={{
            listStyleType: "none",
            display: "flex",
            justifyContent: "space-between",
            width: "40%",
            marginBottom: 30,
            cursor: "pointer",
          }}
        >
          <Link
            to={MOBILITY.SELF_INITIATION}
            style={{
              color: "rgb(5, 28, 92)",
              fontSize: 24,
              textDecoration: "none",
            }}
            className="mt-3"
          >
            Internal Fund Transfer(Self)
          </Link>
          <i
            className="fa-solid fa-arrow-right"
            style={{ marginTop: 4, fontSize: 20, color: "rgb(5, 28, 92)" }}
          />
        </li>
        <li
          style={{
            listStyleType: "none",
            display: "flex",
            justifyContent: "space-between",
            width: "40%",
            marginBottom: 30,
            cursor: "pointer",
          }}
        >
          <p
            style={{
              color: "rgb(5, 28, 92)",
              fontSize: 24,
              textDecoration: "none",
            }}
          >
            Intra Bank Fund Transfer(Third party)
          </p>
          <i
            className="fa-solid fa-arrow-right"
            style={{ marginTop: 4, fontSize: 20, color: "rgb(5, 28, 92)" }}
          />
        </li>
        <li
          style={{
            listStyleType: "none",
            display: "flex",
            justifyContent: "space-between",
            width: "40%",
            marginBottom: 30,
            cursor: "pointer",
          }}
        >
          <p
            style={{
              color: "rgb(5, 28, 92)",
              fontSize: 24,
              textDecoration: "none",
            }}
          >
            NEFT/RTGS/IMPS/UPI Fund Transfer
          </p>
          <i
            className="fa-solid fa-arrow-right"
            style={{ marginTop: 4, fontSize: 20, color: "rgb(5, 28, 92)" }}
          />
        </li>
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
