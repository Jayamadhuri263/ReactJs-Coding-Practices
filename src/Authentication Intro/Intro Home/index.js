import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

import AuthenticationIntroHeader from "../Anthentication Intro Header";

function IntroHome() {
  const jwtToken = Cookies.get("jwt_token");

  // console.log(jwtToken);
  if (jwtToken === undefined || jwtToken === null) {
    return <Navigate to="/authenticationLogin" replace />;
  }

  return (
    <div>
      <AuthenticationIntroHeader />
      <div className="home-content-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          className="home-logo-image"
          alt="home logo"
        />
        <div className="intro-content-container">
          <h1 className="home-concent-heading">Clothes That Get YOU Noticed</h1>
          <p className="home-content-description">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
          </p>
          <Link to="/authenticationProducts">
            <button
              type="button"
              className="submit-button header-logout-button shop-now-button"
            >
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IntroHome;
