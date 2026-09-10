import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname || "/";

  return (
    <div className="not-found-page">
      <div className="not-found-orb" aria-hidden />
      <div className="not-found-inner">
        <p className="not-found-eyebrow">Lost in routing</p>

        <h1 className="not-found-code" aria-label="404">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </h1>

        <h2 className="not-found-title">This page doesn&apos;t exist (yet)</h2>
        <p className="not-found-desc">
          The URL might be mistyped, or the demo was moved. Head back to the hub
          and pick another project.
        </p>
        <p className="not-found-path" title="Requested path">
          {path}
        </p>

        <div className="not-found-actions">
          <Link className="not-found-btn" to="/">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to home
          </Link>
          <button
            type="button"
            className="not-found-btn not-found-btn-ghost"
            onClick={() => navigate(-1)}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
