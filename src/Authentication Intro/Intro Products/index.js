import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import "../index.css";
import AuthenticationIntroHeader from "../Anthentication Intro Header";
import PrimeDealsSection from "../PrimeDealsSection";
import AllProductsSection from "../All Products Section";

function IntroProducts() {
  const jwtToken = Cookies.get("jwt_token");

  // console.log(jwtToken);
  if (jwtToken === undefined || jwtToken === null) {
    return <Navigate to="/authenticationLogin" replace />;
  }

  return (
    <div>
      <AuthenticationIntroHeader />
      <PrimeDealsSection />
      <AllProductsSection />
    </div>
  );
}

export default IntroProducts;
