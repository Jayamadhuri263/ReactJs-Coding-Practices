import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ColorRing } from "react-loader-spinner";
import "../index.css";
import PrimeDealsProductCard from "../Prime Deals Product Card";

const apiTStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  failure: "FAILURE",
};

function PrimeDealsSection() {
  const [apiStatus, setApiStatus] = useState(apiTStatusConstants.loading);
  const [primeDealsList, setPrimeDealsList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // setApiStatus(apiTStatusConstants.loading);
      const jwtToken = Cookies.get("jwt_token");
      // console.log(jwtToken);
      const apiUrl = "https://apis.ccbp.in/prime-deals";
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: "GET",
      };
      const response = await fetch(apiUrl, options);
      if (response.ok === true) {
        const fetchedData = await response.json();
        // console.log(fetchedData);

        const updatedData = fetchedData.prime_deals.map((eachData) => ({
          id: eachData.id,
          availability: eachData.availability,
          brand: eachData.brand,
          description: eachData.description,
          imageUrl: eachData.image_url,
          price: eachData.price,
          rating: eachData.rating,
          style: eachData.style,
          title: eachData.title,
          totalReviews: eachData.total_reviews,
        }));

        setPrimeDealsList(updatedData);
        setApiStatus(apiTStatusConstants.success);
      }
      if (response.status === 401) {
        setApiStatus(apiTStatusConstants.failure);
      }
    }
    fetchData();
  }, [primeDealsList]);

  const renderFailureView = () => {
    return (
      <div className="prime-deals-section-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
          className="failure-view-prime-deals-section"
          alt="failure view"
        />
      </div>
    );
  };

  const renderSuccessView = () => {
    return (
      <div className="prime-deals-section-failure-container">
        <h1 className="exclusive-prime-deals-heading">Exclusive Prime Deals</h1>
        <div className="exclusive-prime-deals-list-container">
          {primeDealsList.map((eachItem) => (
            <PrimeDealsProductCard
              primeDealsProductCard={eachItem}
              key={eachItem.id}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderLoadingView = () => {
    <div className="products-loader-container">
      <ColorRing height={100} width={100} />
    </div>;
  };

  // console.log(primeDealsList);

  function renderSwitch() {
    switch (apiStatus) {
      case apiTStatusConstants.failure:
        return renderFailureView();
      case apiTStatusConstants.success:
        return renderSuccessView();
      case apiTStatusConstants.loading:
        return renderLoadingView();
      default:
        return null;
    }
  }

  return renderSwitch();
}

export default PrimeDealsSection;
