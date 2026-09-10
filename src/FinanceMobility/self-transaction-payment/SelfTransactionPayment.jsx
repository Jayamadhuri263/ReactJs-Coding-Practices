import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobilityHeader from "../MobilityHeader";
import { useSelfPayment } from "../SelfPaymentContext";
import { MOBILITY } from "../mobilityPaths";
import "./SelfTransactionPayment.css";

const mainAccountStaticList = {
  paymentNatureList: [
    { number: "1000009878", name: "Salary", currency: "Rs. " },
    { number: "5645646574", name: "Bonus", currency: "Rs. " },
    { number: "6576746543", name: "Increment", currency: "Rs. " },
    { number: "4534453334", name: "debutant", currency: "Rs. " },
    { number: "3724736477", name: "Other", currency: "Rs. " },
  ],
};

const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(Number(n) || 0);

export default function SelfTransactionPayment() {
  const navigate = useNavigate();
  const { setSelfFormData } = useSelfPayment();
  const [mainAccountList, setMainAccountList] = useState([]);
  const [userName, setUserName] = useState("");
  const [debitAmount, setDebitAmount] = useState("");
  const [topicHasError, setTopicHasError] = useState(true);
  const [topicHasErrorBene, setTopicHasErrorBene] = useState(true);
  const [topicHasErrorPayType, setTopicHasErrorPayType] = useState(true);
  const [, setTopicHasErrorPayNature] = useState(false);
  const [mainDebitAccountListDetails, setMainDebitAccountListDetails] =
    useState(null);
  const [mainBeneAccountListDetails, setMainBeneAccountListDetails] =
    useState(null);
  const todayDate = useMemo(
    () => new Date().toISOString().slice(0, 10),
    []
  );
  const [selfPayment, setSelfPayment] = useState({
    debit_acc: null,
    bene_acc: null,
    debit_amount: 0,
    pay_date: "",
    custom_ref: "",
    pay_nature: "default",
    pay_type: "",
  });

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    const username = localStorage.getItem("username") ?? "";
    setUserName(username);
    if (!jwt) {
      navigate(MOBILITY.LOGIN, { replace: true });
      return;
    }
    fetch("http://localhost:8080/getAccountDetails")
      .then((r) => r.json())
      .then((res) => {
        setMainAccountList(Array.isArray(res) ? res : []);
      })
      .catch(() => {});
  }, [navigate]);

  const validateDebit = (acc) => {
    if (!acc || acc === "default") {
      setMainDebitAccountListDetails(null);
      setTopicHasError(true);
      return;
    }
    setMainDebitAccountListDetails(acc);
    setTopicHasError(false);
  };

  const validateBene = (acc) => {
    if (!acc || acc === "default") {
      setMainBeneAccountListDetails(null);
      setTopicHasErrorBene(true);
      return;
    }
    setMainBeneAccountListDetails(acc);
    setTopicHasErrorBene(false);
  };

  const validatePayType = (topic) => {
    setTopicHasErrorPayType(!topic || topic === "default");
  };

  const validatePaymentNature = (topic) => {
    setTopicHasErrorPayNature(topic === "default");
  };

  const onSubmitSelf = (e) => {
    e.preventDefault();
    const debit = mainDebitAccountListDetails;
    const bene = mainBeneAccountListDetails;
    if (!debit || !bene) return;
    if (debit.accountNo === bene.accountNo) {
      window.alert(
        `Selected same Account number '${bene.accountNo}' for both Debit and Beneficiary`
      );
      return;
    }
    const amt = Number(debitAmount);
    let authorizeTo = "SUPERC";
    if (amt <= 9999) authorizeTo = "JAYAC";
    else if (amt >= 10000 && amt <= 99999) authorizeTo = "USERC";
    else if (amt >= 100000 && amt <= 999999) authorizeTo = "FAZILC";

    const msgFromChild1 = [
      {
        debit_acc: debit,
        bene_acc: bene,
        debit_amount: amt,
        pay_date: selfPayment.pay_date,
        custom_ref: selfPayment.custom_ref,
        pay_nature: selfPayment.pay_nature,
        pay_type:
          selfPayment.pay_type === "default" ? "SELF_FORM" : selfPayment.pay_type,
      },
      { username: userName },
      { authorizeTo },
    ];
    setSelfFormData(msgFromChild1);
    navigate(MOBILITY.SELF_PRE_CONFIRM);
  };

  const onClearForm = () => {
    setSelfPayment({
      debit_acc: null,
      bene_acc: null,
      debit_amount: 0,
      pay_date: "",
      custom_ref: "",
      pay_nature: "default",
      pay_type: "",
    });
    setDebitAmount("");
  };

  const onCancelForm = () => {
    if (window.confirm("Are you sure to Cancel?")) {
      navigate(MOBILITY.PAYMENTS);
    }
  };

  return (
    <>
      <MobilityHeader />
      <div className="finance-mobility-self-payment-main-container">
        <h2 className="finance-mobility-self-payment-main-heading">Internal Fund Transfer(Self)</h2>
        <form onSubmit={onSubmitSelf}>
          <h3 className="finance-mobility-self-payment-sub-heading">Debit Information</h3>
          <label
            style={{
              fontSize: 15,
              marginBottom: 7,
              fontWeight: 600,
            }}
          >
            Account Number<sup>
              <span style={{ color: "brown", fontSize: 17 }}>*</span>
            </sup>
          </label>
          <div
            className="form-group"
            style={{ marginTop: 2, marginBottom: 0, width: "60%" }}
          >
            <select
              className={`form-select ${topicHasError ? "is-invalid" : ""}`}
              required
              defaultValue=""
              onChange={(ev) => {
                const v = ev.target.value;
                const acc = mainAccountList.find(
                  (x) => String(x.accountNo) === v
                );
                validateDebit(acc || "default");
              }}
            >
              <option value="">Please select anyone </option>
              {mainAccountList.map((debit) => (
                <option key={debit.accountNo} value={debit.accountNo}>
                  {debit.accountNo}
                </option>
              ))}
            </select>
            {topicHasError ? (
              <small className="text-danger">
                A Debit number must be selected!
              </small>
            ) : null}
            {mainDebitAccountListDetails ? (
              <div className="finance-mobility-debit-info-details-main-container">
                <div className="finance-mobility-debit-info-details-container">
                  <p style={{ width: "50%", fontWeight: 600 }}>Name: </p>
                  <p style={{ width: "50%" }}>{mainDebitAccountListDetails.name}</p>
                </div>
                <div className="finance-mobility-debit-info-details-container">
                  <p style={{ width: "50%", fontWeight: 600 }}>Currency: </p>
                  <p style={{ width: "50%" }}>
                    {mainDebitAccountListDetails.currency}
                  </p>
                </div>
                <div className="finance-mobility-debit-info-details-container">
                  <p style={{ width: "50%", fontWeight: 600 }}>
                    Available balance:{" "}
                  </p>
                  <p style={{ width: "50%" }}>
                    {inr(mainDebitAccountListDetails.amount)}
                  </p>
                </div>
                <div className="finance-mobility-debit-info-details-container">
                  <p style={{ width: "50%", fontWeight: 600 }}>Type: </p>
                  <p style={{ width: "50%" }}>
                    {mainDebitAccountListDetails.accountType}
                  </p>
                </div>
                <div className="finance-mobility-debit-info-details-container">
                  <p style={{ width: "50%", fontWeight: 600 }}>City: </p>
                  <p style={{ width: "50%" }}>{mainDebitAccountListDetails.city}</p>
                </div>
                <div className="finance-mobility-debit-info-details-container">
                  <p style={{ width: "50%", fontWeight: 600 }}>State: </p>
                  <p style={{ width: "50%" }}>{mainDebitAccountListDetails.state}</p>
                </div>
              </div>
            ) : null}
          </div>

          <h3 className="finance-mobility-self-payment-sub-heading">Beneficiary Information</h3>
          <label
            style={{
              fontSize: 15,
              marginBottom: 7,
              fontWeight: 600,
            }}
          >
            Account Number<sup>
              <span style={{ color: "brown", fontSize: 17 }}>*</span>
            </sup>
          </label>
          <div
            className="form-group"
            style={{ marginTop: 2, marginBottom: 0, width: "60%" }}
          >
            <select
              className={`form-select ${topicHasErrorBene ? "is-invalid" : ""}`}
              required
              defaultValue=""
              onChange={(ev) => {
                const v = ev.target.value;
                const acc = mainAccountList.find(
                  (x) => String(x.accountNo) === v
                );
                validateBene(acc || "default");
              }}
            >
              <option value="">Please select anyone </option>
              {mainAccountList.map((bene) => (
                <option key={`b-${bene.accountNo}`} value={bene.accountNo}>
                  {bene.accountNo}
                </option>
              ))}
            </select>
            {topicHasErrorBene ? (
              <small className="text-danger">
                A Beneficiary account number must be selected!
              </small>
            ) : null}
            {mainBeneAccountListDetails ? (
              <div className="finance-mobility-debit-info-details-main-container">
                <div className="finance-mobility-debit-info-details-container">
                  <p style={{ width: "50%", fontWeight: 600 }}>Name: </p>
                  <p style={{ width: "50%" }}>{mainBeneAccountListDetails.name}</p>
                </div>
                <div className="finance-mobility-debit-info-details-container">
                  <p style={{ width: "50%", fontWeight: 600 }}>Currency: </p>
                  <p style={{ width: "50%" }}>
                    {mainBeneAccountListDetails.currency}
                  </p>
                </div>
                <div className="finance-mobility-debit-info-details-container">
                  <p style={{ width: "50%", fontWeight: 600 }}>
                    Available balance:{" "}
                  </p>
                  <p style={{ width: "50%" }}>
                    {inr(mainBeneAccountListDetails.amount)}
                  </p>
                </div>
                <div className="finance-mobility-debit-info-details-container">
                  <p style={{ width: "50%", fontWeight: 600 }}>Type: </p>
                  <p style={{ width: "50%" }}>
                    {mainBeneAccountListDetails.accountType}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <h3 className="finance-mobility-self-payment-sub-heading">Payment Information</h3>
          <label
            style={{
              fontSize: 15,
              marginBottom: 7,
              fontWeight: 600,
            }}
          >
            Payment type<sup>
              <span style={{ color: "brown", fontSize: 17 }}>*</span>
            </sup>
          </label>
          <div
            className="form-group"
            style={{ marginTop: 2, marginBottom: 20, width: "60%" }}
          >
            <select
              className="form-select"
              required
              value={selfPayment.pay_type}
              onChange={(ev) => {
                const v = ev.target.value;
                setSelfPayment((s) => ({ ...s, pay_type: v }));
                validatePayType(v);
              }}
            >
              <option value="default">Please select anyone </option>
              <option value="SELF_FORM">Internal Fund Transfer(Self)</option>
            </select>
            {topicHasErrorPayType ? (
              <small className="text-danger">
                A Payment type must be selected!
              </small>
            ) : null}
          </div>
          <div style={{ width: "60%" }}>
            <label
              style={{
                fontSize: 15,
                marginBottom: 7,
                fontWeight: 600,
                width: "50%",
              }}
            >
              Debit Amount<sup>
                <span style={{ color: "brown", fontSize: 17 }}>*</span>
              </sup>
            </label>
            <div className="form-group" style={{ width: "100%" }}>
              <input
                type="number"
                name="debit_amount"
                required
                className="form-control"
                placeholder="Enter the debit amount here"
                value={debitAmount}
                onChange={(ev) => setDebitAmount(ev.target.value)}
              />
            </div>
            <label
              style={{
                fontSize: 15,
                marginBottom: 7,
                marginTop: 16,
                fontWeight: 600,
                width: "50%",
              }}
            >
              Payment Date<sup>
                <span style={{ color: "brown", fontSize: 17 }}>*</span>
              </sup>
            </label>
            <div className="form-group" style={{ width: "100%" }}>
              <input
                type="date"
                min={todayDate}
                name="pay_date"
                required
                className="form-control"
                value={selfPayment.pay_date}
                onChange={(ev) =>
                  setSelfPayment((s) => ({ ...s, pay_date: ev.target.value }))
                }
              />
            </div>
            <label
              style={{
                fontSize: 15,
                marginBottom: 7,
                marginTop: 16,
                fontWeight: 600,
                width: "50%",
              }}
            >
              Customer Reference
            </label>
            <div className="form-group" style={{ width: "100%" }}>
              <textarea
                name="custom_ref"
                rows={3}
                className="form-control"
                placeholder="Enter reference"
                value={selfPayment.custom_ref}
                onChange={(ev) =>
                  setSelfPayment((s) => ({ ...s, custom_ref: ev.target.value }))
                }
              />
            </div>
            <label
              style={{
                fontSize: 15,
                marginBottom: 7,
                marginTop: 16,
                fontWeight: 600,
                width: "50%",
              }}
            >
              Nature of Payment
            </label>
            <div
              className="form-group"
              style={{ marginTop: 2, marginBottom: 0, width: "100%" }}
            >
              <select
                className="form-select"
                value={selfPayment.pay_nature}
                onChange={(ev) => {
                  setSelfPayment((s) => ({
                    ...s,
                    pay_nature: ev.target.value,
                  }));
                  validatePaymentNature(ev.target.value);
                }}
              >
                <option value="default">Please select anyone </option>
                {mainAccountStaticList.paymentNatureList.map((p) => (
                  <option key={p.number} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 27,
              width: "60%",
            }}
          >
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              onClick={onClearForm}
              className="btn btn-secondary"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={onCancelForm}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
