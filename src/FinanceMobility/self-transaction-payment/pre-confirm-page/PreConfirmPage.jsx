import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobilityHeader from "../../MobilityHeader";
import { useSelfPayment } from "../../SelfPaymentContext";
import { MOBILITY } from "../../mobilityPaths";
import "./PreConfirmPage.css";

const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(Number(n) || 0);

function genReference() {
  const chars = "0123456789";
  let s = "";
  for (let i = 0; i < 13; i += 1) {
    s += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AB${s}`;
}

export default function PreConfirmPage() {
  const navigate = useNavigate();
  const { selfFormData, setSelfFormData } = useSelfPayment();
  const [makerDate] = useState(() => new Date());
  const appended = useRef(false);
  const [referenceNo, setReferenceNo] = useState("");

  const getFormData = useMemo(() => selfFormData || [], [selfFormData]);

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
    if (appended.current) return;
    appended.current = true;
    const ref = genReference();
    setReferenceNo(ref);
    setSelfFormData((prev) => [...prev, { referenceNo: ref }]);
  }, [navigate, selfFormData?.length, setSelfFormData]);

  const row = getFormData[0];
  if (!row?.debit_acc) {
    return (
      <>
        <MobilityHeader />
        <div className="finance-mobility-self-payment-main-container">
          <p>Loading…</p>
        </div>
      </>
    );
  }

  const onCancelForm = () => {
    if (window.confirm("Are you sure to Cancel?")) {
      navigate(MOBILITY.PAYMENTS);
    }
  };

  const onBackForm = () => {
    navigate(MOBILITY.SELF_INITIATION);
  };

  const onConfirmForm = () => {
    navigate(MOBILITY.SELF_CONFIRM);
  };

  return (
    <>
      <MobilityHeader />
      <div className="finance-mobility-self-payment-main-container">
        <h2 className="finance-mobility-self-payment-main-heading">
          Review & Confirmation - Internal Fund Transfer(Self)
        </h2>
        <div>
          <h3 className="finance-mobility-self-payment-sub-heading">Debit Information</h3>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Account Number</label>
            <p style={{ width: "50%" }}>{row.debit_acc.accountNo}</p>
          </div>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Name</label>
            <p style={{ width: "50%" }}>{row.debit_acc.name}</p>
          </div>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Currency</label>
            <p style={{ width: "50%" }}>{row.debit_acc.currency}</p>
          </div>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Available balance</label>
            <p style={{ width: "50%" }}>{inr(row.debit_acc.amount)}</p>
          </div>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Type</label>
            <p style={{ width: "50%" }}>{row.debit_acc.accountType}</p>
          </div>

          <h3 className="finance-mobility-self-payment-sub-heading">Beneficiary Information</h3>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Account Number</label>
            <p style={{ width: "50%" }}>{row.bene_acc.accountNo}</p>
          </div>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Name</label>
            <p style={{ width: "50%" }}>{row.bene_acc.name}</p>
          </div>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Currency</label>
            <p style={{ width: "50%" }}>{row.bene_acc.currency}</p>
          </div>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Available balance</label>
            <p style={{ width: "50%" }}>{inr(row.bene_acc.amount)}</p>
          </div>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Type</label>
            <p style={{ width: "50%" }}>{row.bene_acc.accountType}</p>
          </div>

          <h3 className="finance-mobility-self-payment-sub-heading">Payment Information</h3>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Payment Type</label>
            <p style={{ width: "50%" }}>{row.pay_type}</p>
          </div>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Debit Amount</label>
            <p style={{ width: "50%" }}>Rs. {row.debit_amount}</p>
          </div>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Payment Date</label>
            <p style={{ width: "50%" }}>{row.pay_date}</p>
          </div>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Customer Reference</label>
            <p style={{ width: "50%" }}>{row.custom_ref}</p>
          </div>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Nature of payment</label>
            <p style={{ width: "50%" }}>{row.pay_nature}</p>
          </div>

          <h3 className="finance-mobility-self-payment-sub-heading">Transaction Information</h3>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Reference Number</label>
            <p style={{ width: "50%" }}>{referenceNo || "…"}</p>
          </div>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Status</label>
            <p style={{ width: "50%" }}> Pending Confirmation </p>
          </div>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Maker Date</label>
            <p style={{ width: "50%" }}>{makerDate.toLocaleString()}</p>
          </div>
          <div className="finance-mobility-self-review-sub-container">
            <label className="finance-mobility-self-review-sub-heading">Maker Name</label>
            <p style={{ width: "50%" }}> Jaya madhuri </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 27,
              width: "60%",
            }}
          >
            <button
              type="button"
              onClick={onConfirmForm}
              className="btn btn-primary"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={onBackForm}
              className="btn btn-secondary"
            >
              Back
            </button>
            <button
              type="button"
              onClick={onCancelForm}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
