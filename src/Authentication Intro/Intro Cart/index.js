import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import "../index.css";
import AuthenticationIntroHeader from "../Anthentication Intro Header";

function IntroCart() {
  const jwtToken = Cookies.get("jwt_token");

  // console.log(jwtToken);
  if (jwtToken === undefined || jwtToken === null) {
    return <Navigate to="/authenticationLogin" replace />;
  }

  return (
    <div>
      <AuthenticationIntroHeader />
      <div>Intro Cart</div>
    </div>
  );
}

export default IntroCart;
