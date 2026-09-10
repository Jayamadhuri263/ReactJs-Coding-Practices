import "./finance-mobility-common.css";

/** Wraps Finance Mobility UI so scoped CSS does not leak to the rest of the app. */
export default function FinanceMobilityRoot({ children }) {
  return <div className="finance-mobility-root">{children}</div>;
}
