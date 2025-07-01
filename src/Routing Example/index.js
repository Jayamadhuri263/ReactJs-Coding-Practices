import { Link } from "react-router-dom";
import "./index.css";

function RoutingExample() {
  return (
    <div className="routing-example-container">
      <div className="routing-mini-container">
        <li style={{ listStyleType: "none", textDecoration: "none" }}>
          <Link to="/routerHome" className="link-class-name">
            Home
          </Link>
        </li>
        <li style={{ listStyleType: "none", textDecoration: "none" }}>
          <Link to="/about" className="link-class-name">
            About
          </Link>
        </li>
        <li style={{ listStyleType: "none", textDecoration: "none" }}>
          <Link to="/contact" className="link-class-name">
            Contact
          </Link>
        </li>
      </div>
    </div>
  );
}

export default RoutingExample;
