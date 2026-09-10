import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import MobilityHeader from "../MobilityHeader";
import { MOBILITY } from "../mobilityPaths";
import "./MobilityHome.css";

export default function MobilityHome() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [makerContainer, setMakerContainer] = useState(false);
  const [checkerContainer, setCheckerContainer] = useState(false);
  const [showAuthContainer, setShowAuthContainer] = useState(false);
  const [paymentTransactionList, setPaymentTransactionList] = useState([]);
  const [paymentTransactionListLength, setPaymentTransactionListLength] =
    useState(0);
  const [errorMessageForTransaction, setErrorMessageForTransaction] =
    useState("");
  const [showRecordDetails, setShowRecordDetails] = useState(false);
  const [filteredPaymentTransactionList, setFilteredPaymentTransactionList] =
    useState([]);
  const [recordId, setRecordId] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [disabledPreviousButton, setDisabledPreviousButton] = useState(true);
  const [disabledNextButton, setDisabledNextButton] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showFileUploadContainer, setShowFileUploadContainer] = useState(false);
  const [pageCountFileUpload, setPageCountFileUpload] = useState(0);
  const [fileUploadList, setFileUploadList] = useState([]);
  const [FileUploadListLength, setFileUploadListLength] = useState(0);
  const [errorMessageForFileUpload, setErrorMessageForFileUpload] =
    useState("");
  const [showFileUploadRecordDetails, setShowFileUploadRecordDetails] =
    useState(false);
  const [filteredFileUploadList, setFilteredFileUploadList] = useState([]);
  const [searchTextFileUpload, setSearchTextFileUpload] = useState("");
  const [disabledUploadPreviousButton, setDisabledUploadPreviousButton] =
    useState(true);
  const [disabledUploadNextButton, setDisabledUploadNextButton] =
    useState(false);

  const username = localStorage.getItem("username") ?? "";

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    const query = localStorage.getItem("query");
    if (!jwt) {
      navigate(MOBILITY.LOGIN, { replace: true });
      return;
    }
    setDisabledPreviousButton(pageCount <= 0);
    setDisabledUploadPreviousButton(pageCountFileUpload <= 0);

    if (query === "MAKER") {
      setMakerContainer(true);
    } else if (query === "CHECKER") {
      setCheckerContainer(true);
    } else {
      const u = searchParams.get("user");
      if (u === "MAKER") setMakerContainer(true);
      else if (u === "CHECKER") setCheckerContainer(true);
    }

    const jwtBody = localStorage.getItem("jwtToken");
    fetch("http://localhost:8080/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwtWebToken: jwtBody }),
    }).catch(() => {
      window.alert("Got invalid authentication token, redirecting to login!");
      localStorage.removeItem("jwtToken");
      navigate(MOBILITY.LOGIN);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync pagination disable flags on mount/auth only
  }, [navigate, searchParams]);

  useEffect(() => {
    if (!checkerContainer) return;
    const u = encodeURIComponent(username);
    fetch(
      `http://localhost:8080/getTransactionDetails?page=${pageCount}&authorizeTo=${u}`
    )
      .then((r) => r.json())
      .then((data) => {
        const len = Array.isArray(data) ? data.length : 0;
        setPaymentTransactionListLength(len);
        setPaymentTransactionList([data]);
        setDisabledNextButton(len < 10);
      })
      .catch((err) => {
        setErrorMessageForTransaction(err?.message || String(err));
      });
  }, [checkerContainer, pageCount, username]);

  useEffect(() => {
    if (!checkerContainer) return;
    const u = encodeURIComponent(username);
    fetch(
      `http://localhost:8080/getFileUploadDetails?page=${pageCountFileUpload}&authorizeTo=${u}`
    )
      .then((r) => r.json())
      .then((data) => {
        const len = Array.isArray(data) ? data.length : 0;
        setFileUploadListLength(len);
        setFileUploadList([data]);
        setDisabledUploadNextButton(len < 10);
      })
      .catch((err) => {
        setErrorMessageForFileUpload(err?.message || String(err));
      });
  }, [checkerContainer, pageCountFileUpload, username]);

  const onToggleAuthContainer = () =>
    setShowAuthContainer((s) => !s);

  const onShowRecordDetails = (record) => {
    setShowRecordDetails((s) => !s);
    setRecordId(record.ID);
    setFilteredPaymentTransactionList([record]);
  };

  const loadNextTransactions = () => {
    const next = pageCount + 1;
    setPageCount(next);
    setDisabledPreviousButton(false);
    setPaymentTransactionList([]);
    fetch(
      `http://localhost:8080/getTransactionDetails?page=${next}`
    )
      .then((r) => r.json())
      .then((data) => {
        const len = Array.isArray(data) ? data.length : 0;
        setPaymentTransactionListLength(len);
        if (len < 10 || len === 0) setDisabledNextButton(true);
        else setDisabledNextButton(false);
        setPaymentTransactionList([data]);
      })
      .catch((err) => {
        setErrorMessageForTransaction(err?.message || String(err));
      });
  };

  const loadPreviousTransactions = () => {
    if (pageCount <= 0) {
      setDisabledPreviousButton(true);
      return;
    }
    const prev = pageCount - 1;
    setPageCount(prev);
    setPaymentTransactionList([]);
    fetch(
      `http://localhost:8080/getTransactionDetails?page=${prev}`
    )
      .then((r) => r.json())
      .then((data) => {
        setPaymentTransactionListLength(Array.isArray(data) ? data.length : 0);
        setPaymentTransactionList([data]);
      })
      .catch((err) => {
        setErrorMessageForTransaction(err?.message || String(err));
      });
    if (prev <= 0) setDisabledPreviousButton(true);
    else setDisabledPreviousButton(false);
  };

  const onSearch = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:8080/search?referenceNo=${encodeURIComponent(searchText)}`
    )
      .then((r) => r.json())
      .then((data) => {
        setPaymentTransactionList([]);
        setPaymentTransactionList([data]);
        setPaymentTransactionListLength(Array.isArray(data) ? data.length : 0);
      })
      .catch(() => {});
  };

  const goFileUpload = () => navigate(MOBILITY.FILE_UPLOAD);

  const onAuthorize = (record) =>
    navigate(MOBILITY.authorizePreConfirm(record.referenceNo));

  const onReject = (record) =>
    navigate(MOBILITY.rejectPreConfirm(record.referenceNo));

  const loadPreviousFileUpload = () => {
    if (pageCountFileUpload <= 0) {
      setDisabledUploadPreviousButton(true);
      return;
    }
    const prev = pageCountFileUpload - 1;
    setPageCountFileUpload(prev);
    setFileUploadList([]);
    fetch(
      `http://localhost:8080/getFileUploadDetails?page=${prev}`
    )
      .then((r) => r.json())
      .then((data) => {
        setFileUploadListLength(Array.isArray(data) ? data.length : 0);
        setFileUploadList([data]);
      })
      .catch((err) => {
        setErrorMessageForFileUpload(err?.message || String(err));
      });
    if (prev <= 0) setDisabledUploadPreviousButton(true);
    else setDisabledUploadPreviousButton(false);
  };

  const loadNextFileUpload = () => {
    const next = pageCountFileUpload + 1;
    setPageCountFileUpload(next);
    setDisabledUploadPreviousButton(false);
    setFileUploadList([]);
    fetch(
      `http://localhost:8080/getFileUploadDetails?page=${next}`
    )
      .then((r) => r.json())
      .then((data) => {
        const len = Array.isArray(data) ? data.length : 0;
        setFileUploadListLength(len);
        if (len < 10 || len === 0) setDisabledUploadNextButton(true);
        else setDisabledUploadNextButton(false);
        setFileUploadList([data]);
      })
      .catch((err) => {
        setErrorMessageForFileUpload(err?.message || String(err));
      });
  };

  const onToggleFileUploadContainer = () =>
    setShowFileUploadContainer((s) => !s);

  const onSearchFileUpload = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:8080/fileUploadSearch?referenceNo=${encodeURIComponent(
        searchTextFileUpload
      )}`
    )
      .then((r) => r.json())
      .then((data) => {
        setFileUploadList([]);
        setFileUploadList([data]);
        setFileUploadListLength(Array.isArray(data) ? data.length : 0);
      })
      .catch(() => {});
  };

  const onShowRecordFileUploadDetails = (record) => {
    setShowFileUploadRecordDetails((s) => !s);
    setRecordId(record.id);
    setFilteredFileUploadList([record]);
  };

  const onVerifyFileUpload = (record) =>
    navigate(MOBILITY.fileVerify(record.referenceNo));

  const onRejectFileUpload = (record) =>
    navigate(MOBILITY.fileRejectPreConfirm(record.referenceNo));

  const list = paymentTransactionList[0];
  const sliceList = Array.isArray(list) ? list.slice(0, 11) : [];
  const fileList = fileUploadList[0];
  const sliceFile = Array.isArray(fileList) ? fileList.slice(0, 11) : [];

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <MobilityHeader />
      <div className="finance-mobility-home-main-container">
        {makerContainer ? (
          <div className="finance-mobility-maker-main-container">
            <Link to={MOBILITY.PAYMENTS} className="mt-3">
              Payments
            </Link>
            <button
              type="button"
              className="mt-5 finance-mobility-file-upload-link btn btn-link p-0"
              style={{ color: "#007bff" }}
              onClick={goFileUpload}
            >
              File Upload
            </button>
          </div>
        ) : null}

        {checkerContainer ? (
          <div className="finance-mobility-maker-main-container">
            <h2>Online transaction - Ready for Authorization</h2>
            <span>Click on the Count to display the online transaction details.</span>
            <button
              type="button"
              className="btn btn-secondary mt-2"
              style={{
                width: "7%",
                height: "6vh",
                textAlign: "center",
                fontSize: 24,
                marginBottom: "1.4em",
                paddingTop: 0,
                outline: "none",
                backgroundColor: !showAuthContainer ? "#767e85" : undefined,
              }}
              onClick={onToggleAuthContainer}
            >
              {paymentTransactionListLength}
            </button>

            {showAuthContainer ? (
              <div className="finance-mobility-show-auth-main-container">
                <form onSubmit={onSearch}>
                  <div
                    className="form-outline mb-3 d-flex flex-row mt-3"
                    style={{
                      width: "80%",
                      border: "1px solid white",
                      borderRadius: 5,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", width: "98%" }}>
                      <input
                        type="search"
                        placeholder="Search transactions with Reference number"
                        name="search"
                        autoComplete="on"
                        className="form-control form-control-md"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="finance-mobility-auth-reject-button search ml-0">
                      <img
                        src="/assets/images/search.jpg"
                        alt="authorize"
                        style={{ height: 26, width: 26 }}
                      />
                    </button>
                  </div>
                </form>

                {errorMessageForTransaction ? (
                  <h1 className="text-danger">{errorMessageForTransaction}</h1>
                ) : null}
                {paymentTransactionListLength === 0 ? (
                  <h1 className="pt-4">Sorry, there is no data to act upon. </h1>
                ) : null}
                {sliceList.map((record) => (
                  <div key={record.ID} className="finance-mobility-show-auth-sub-container">
                    <div
                      role="presentation"
                      onClick={() => onShowRecordDetails(record)}
                      onKeyDown={() => {}}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 0,
                        marginBottom: "-0.1em",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <h4> {record.referenceNo} </h4>
                        <span style={{ marginTop: "-1.26em", marginBottom: "0.5em" }}>
                          {record.pay_date}
                        </span>
                      </div>
                      <h4> Rs. {record.debit_amount} </h4>
                    </div>
                    <hr
                      width="100%"
                      style={{ marginBottom: 0, marginTop: "0.8em" }}
                    />
                    {showRecordDetails && recordId === record.ID ? (
                      <div
                        style={{
                          backgroundColor: "transparent",
                          border: "2px solid black",
                          borderRadius: 8,
                          padding: "1em",
                          cursor: "initial",
                        }}
                      >
                        {filteredPaymentTransactionList.map((subRecord) => (
                          <div key={subRecord.ID}>
                            <div style={{ display: "flex", width: "100%" }}>
                              <p style={{ width: "50%" }}>Beneficiary Account Number: </p>
                              <span style={{ width: "50%" }}>{subRecord.beneAccountNo}</span>
                            </div>
                            <div style={{ display: "flex", width: "100%" }}>
                              <p style={{ width: "50%" }}>Beneficiary Name: </p>
                              <span style={{ width: "50%" }}>{subRecord.beneName}</span>
                            </div>
                            <div style={{ display: "flex", width: "100%" }}>
                              <p style={{ width: "50%" }}>Debit Account Number: </p>
                              <span style={{ width: "50%" }}>{subRecord.debitAccountNo}</span>
                            </div>
                            <div style={{ display: "flex", width: "100%" }}>
                              <p style={{ width: "50%" }}>Debit Name: </p>
                              <span style={{ width: "50%" }}>{subRecord.debitName}</span>
                            </div>
                            <div style={{ display: "flex", width: "100%" }}>
                              <p style={{ width: "50%" }}>Payment Type: </p>
                              <span style={{ width: "50%" }}>
                                {record.paymentType === "SELF_FORM"
                                  ? "Internal Fund Transfer(Self)"
                                  : record.paymentType === ""
                                  ? "-"
                                  : null}
                              </span>
                            </div>
                            <div style={{ display: "flex", width: "100%" }}>
                              <p style={{ width: "50%" }}>Status: </p>
                              <span style={{ width: "50%" }}>
                                {record.status === "RA"
                                  ? "Ready for Authorization"
                                  : record.status === ""
                                  ? "-"
                                  : null}
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginTop: "1em",
                              }}
                            >
                              <button
                                type="button"
                                className="finance-mobility-auth-reject-button mr-5"
                                onClick={() => onAuthorize(record)}
                              >
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
                                onClick={() => onReject(record)}
                              >
                                <img
                                  src="/assets/images/reject.webp"
                                  alt="reject"
                                  style={{ height: 36, width: 36 }}
                                />
                                <br />
                                <p style={{ color: "white", fontSize: 16 }}>Reject</p>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            <div style={{ display: "flex", marginTop: "2em" }}>
              <button
                type="button"
                disabled={disabledPreviousButton}
                onClick={loadPreviousTransactions}
                className="btn btn-primary mr-5"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={disabledNextButton}
                onClick={loadNextTransactions}
                className="btn btn-primary"
              >
                Next
              </button>
            </div>

            <h2 className="mt-5">File upload - Ready for Verification</h2>
            <span>Click on the Count to display the file upload details.</span>
            <button
              type="button"
              className="btn btn-secondary mt-2"
              style={{
                width: "7%",
                height: "6vh",
                textAlign: "center",
                fontSize: 24,
                marginBottom: "1.4em",
                paddingTop: 0,
                outline: "none",
                backgroundColor: !showFileUploadContainer ? "#767e85" : undefined,
              }}
              onClick={onToggleFileUploadContainer}
            >
              {FileUploadListLength}
            </button>

            {showFileUploadContainer ? (
              <div className="finance-mobility-show-auth-main-container">
                <form onSubmit={onSearchFileUpload}>
                  <div
                    className="form-outline mb-3 d-flex flex-row mt-3"
                    style={{
                      width: "80%",
                      border: "1px solid white",
                      borderRadius: 5,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", width: "98%" }}>
                      <input
                        type="search"
                        placeholder="Search file upload with Reference number"
                        name="searchFile"
                        className="form-control form-control-md"
                        value={searchTextFileUpload}
                        onChange={(e) => setSearchTextFileUpload(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="finance-mobility-auth-reject-button search ml-0">
                      <img
                        src="/assets/images/search.jpg"
                        alt="search"
                        style={{ height: 26, width: 26 }}
                      />
                    </button>
                  </div>
                </form>

                {errorMessageForFileUpload ? (
                  <h1 className="text-danger">{errorMessageForFileUpload}</h1>
                ) : null}
                {FileUploadListLength === 0 ? (
                  <h1 className="pt-4">Sorry, there is no data to act upon. </h1>
                ) : null}
                {sliceFile.map((record) => (
                  <div key={record.id} className="finance-mobility-show-auth-sub-container">
                    <div
                      role="presentation"
                      onClick={() => onShowRecordFileUploadDetails(record)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 0,
                        marginBottom: "-0.1em",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <h4> {record.referenceNo} </h4>
                        <span style={{ marginTop: "-1.26em", marginBottom: "0.5em" }}>
                          {record.pay_date}
                        </span>
                        <span style={{ marginTop: "-0.36em", marginBottom: "0.5em" }}>
                          {record.fileName}
                        </span>
                      </div>
                      <h4> Rs. {record.debit_amount} </h4>
                    </div>
                    <hr
                      width="100%"
                      style={{ marginBottom: 0, marginTop: "0.8em" }}
                    />
                    {showFileUploadRecordDetails && recordId === record.id ? (
                      <div
                        style={{
                          backgroundColor: "transparent",
                          border: "2px solid black",
                          borderRadius: 8,
                          padding: "1em",
                          cursor: "initial",
                        }}
                      >
                        {filteredFileUploadList.map((subRecord) => (
                          <div key={subRecord.id}>
                            <div style={{ display: "flex", width: "100%" }}>
                              <p style={{ width: "50%" }}>File Uploaded Date: </p>
                              <span style={{ width: "50%" }}>
                                {subRecord.createdAt
                                  ? new Date(subRecord.createdAt).toLocaleString()
                                  : ""}
                              </span>
                            </div>
                            <div style={{ display: "flex", width: "100%" }}>
                              <p style={{ width: "50%" }}>Status: </p>
                              <span style={{ width: "50%" }}>{subRecord.status}</span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginTop: "1em",
                              }}
                            >
                              <button
                                type="button"
                                className="finance-mobility-auth-reject-button mr-5"
                                onClick={() => onVerifyFileUpload(record)}
                              >
                                <img
                                  src="/assets/images/auth.webp"
                                  alt="verify"
                                  style={{ height: 36, width: 36 }}
                                />
                                <br />
                                <p style={{ color: "white", fontSize: 16 }}>Verify</p>
                              </button>
                              <button
                                type="button"
                                className="finance-mobility-auth-reject-button mr-3"
                                onClick={() => onRejectFileUpload(record)}
                              >
                                <img
                                  src="/assets/images/reject.webp"
                                  alt="reject"
                                  style={{ height: 36, width: 36 }}
                                />
                                <br />
                                <p style={{ color: "white", fontSize: 16 }}>Reject</p>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            <div style={{ display: "flex", marginTop: "2em" }}>
              <button
                type="button"
                disabled={disabledUploadPreviousButton}
                onClick={loadPreviousFileUpload}
                className="btn btn-primary mr-5"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={disabledUploadNextButton}
                onClick={loadNextFileUpload}
                className="btn btn-primary"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
