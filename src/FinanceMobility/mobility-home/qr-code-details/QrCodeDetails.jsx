import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./QrCodeDetails.css";

function titleCase(s) {
  if (s == null || s === "") return "";
  return String(s).replace(/\w\S*/g, (w) =>
    w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
  );
}

export default function QrCodeDetails() {
  const { referenceNo } = useParams();
  const [allRecordsList, setAllRecordsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!referenceNo) return;
    let cancelled = false;
    fetch(
      `http://localhost:8080/getAuthDetailsByQRCode?reference=${encodeURIComponent(
        referenceNo
      )}`
    )
      .then(async (r) => {
        const data = await r.json().catch(() => null);
        if (!r.ok) {
          const msg =
            data?.error?.message ?? data?.message ?? "not available";
          throw new Error(msg);
        }
        return data;
      })
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data) && data[0]) {
          setAllRecordsList([data[0]]);
          setErrorMessage("");
        } else {
          setAllRecordsList([]);
          setErrorMessage("not available");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setAllRecordsList([]);
        setErrorMessage(
          err?.message ?? err?.error?.message ?? "not available"
        );
      })
      .finally(() => {
        if (!cancelled) setFetched(true);
      });
    return () => {
      cancelled = true;
    };
  }, [referenceNo]);

  return (
    <div className="finance-mobility-all-records-main-container">
      <h1 className="finance-mobility-all-records-main-heading">Summary Details</h1>
      {fetched && (errorMessage || allRecordsList.length === 0) ? (
        <h2 className="text-danger mt-5">
          * For the reference number &apos;{referenceNo}&apos;, details are{" "}
          {errorMessage || "not available"}
        </h2>
      ) : null}
      {allRecordsList.length > 0 ? (
        <div>
          {allRecordsList.map((subRecord) => (
            <div
              key={subRecord.referenceNo || referenceNo}
              className="finance-mobility-all-records-data-list-container"
            >
              {subRecord.referenceNo ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Reference Number </p>
                  <span style={{ width: "50%" }}>{subRecord.referenceNo}</span>
                </div>
              ) : null}
              {subRecord.fileName ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>File name </p>
                  <span style={{ width: "50%" }}>{subRecord.fileName}</span>
                </div>
              ) : null}
              {subRecord.uploadedBy ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>File Uploaded By</p>
                  <span style={{ width: "50%" }}>{subRecord.uploadedBy}</span>
                </div>
              ) : null}
              {subRecord.beneAccountNo ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Beneficiary Account Number </p>
                  <span style={{ width: "50%" }}>{subRecord.beneAccountNo}</span>
                </div>
              ) : null}
              {subRecord.beneName ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Beneficiary Name </p>
                  <span style={{ width: "50%" }}>{subRecord.beneName}</span>
                </div>
              ) : null}
              {subRecord.beneCurrency ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Beneficiary Currency </p>
                  <span style={{ width: "50%" }}>{subRecord.beneCurrency}</span>
                </div>
              ) : null}
              {subRecord.beneAccountType ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Beneficiary Account Type </p>
                  <span style={{ width: "50%" }}>{subRecord.beneAccountType}</span>
                </div>
              ) : null}
              {subRecord.debitAccountNo ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Debit Account Number </p>
                  <span style={{ width: "50%" }}>{subRecord.debitAccountNo}</span>
                </div>
              ) : null}
              {subRecord.debitName ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Debit Name </p>
                  <span style={{ width: "50%" }}>{subRecord.debitName}</span>
                </div>
              ) : null}
              {subRecord.debitCurrency ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Debit Currency </p>
                  <span style={{ width: "50%" }}>{subRecord.debitCurrency}</span>
                </div>
              ) : null}
              {subRecord.debitAccountType ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Debit Account Type </p>
                  <span style={{ width: "50%" }}>{subRecord.debitAccountType}</span>
                </div>
              ) : null}
              {subRecord.debit_amount ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Amount </p>
                  <span style={{ width: "50%" }}>Rs. {subRecord.debit_amount}</span>
                </div>
              ) : null}
              {subRecord.status ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Status </p>
                  <span style={{ width: "50%" }}>
                    {subRecord.status === "RA"
                      ? "Ready for Authorization"
                      : titleCase(subRecord.status)}
                  </span>
                </div>
              ) : null}
              {subRecord.createdBy ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Created By </p>
                  <span style={{ width: "50%" }}>{subRecord.createdBy}</span>
                </div>
              ) : null}
              {subRecord.authorizeTo ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Authorize/Verify By</p>
                  <span style={{ width: "50%" }}>{subRecord.authorizeTo}</span>
                </div>
              ) : null}
              {subRecord.paymentType ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Payment Type </p>
                  <span style={{ width: "50%" }}>
                    {subRecord.paymentType === "SELF_FORM"
                      ? "Internal Fund Transfer(Self)"
                      : null}
                  </span>
                </div>
              ) : null}
              {subRecord.pay_date ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Payment Date </p>
                  <span style={{ width: "50%" }}>{subRecord.pay_date}</span>
                </div>
              ) : null}
              {subRecord.pay_nature ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Payment Nature </p>
                  <span style={{ width: "50%" }}>{titleCase(subRecord.pay_nature)}</span>
                </div>
              ) : null}
              {subRecord.createdAt ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Created Date</p>
                  <span style={{ width: "50%" }}>
                    {new Date(subRecord.createdAt).toLocaleString()}
                  </span>
                </div>
              ) : null}
              {subRecord.authorizedAt ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Authorized Date </p>
                  <span style={{ width: "50%" }}>
                    {new Date(subRecord.authorizedAt).toLocaleString()}
                  </span>
                </div>
              ) : null}
              {subRecord.verifiedAt ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Verified Date </p>
                  <span style={{ width: "50%" }}>
                    {new Date(subRecord.verifiedAt).toLocaleString()}
                  </span>
                </div>
              ) : null}
              {subRecord.rejectedAt ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Rejected Date </p>
                  <span style={{ width: "50%" }}>
                    {new Date(subRecord.rejectedAt).toLocaleString()}
                  </span>
                </div>
              ) : null}
              {subRecord.reject_reason ? (
                <div style={{ display: "flex", width: "100%" }}>
                  <p style={{ width: "50%" }}>Reject Reason</p>
                  <span style={{ width: "50%" }}>
                    {titleCase(subRecord.reject_reason)}
                  </span>
                </div>
              ) : null}
              <div style={{ display: "flex", width: "100%" }}>
                <p style={{ width: "50%" }}>Customer Reference </p>
                <span style={{ width: "50%" }}>
                  {subRecord.custom_ref === "" ||
                  subRecord.custom_ref == null
                    ? "-"
                    : titleCase(subRecord.custom_ref)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
