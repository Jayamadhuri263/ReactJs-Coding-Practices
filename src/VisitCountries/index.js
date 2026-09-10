import React, { useMemo, useState } from "react";
import "./VisitCountries.css";

const INITIAL_COUNTRIES = [
  {
    id: "8baa8029-fb2c-4f06-bfcc-3dc9ad12b24d",
    name: "Canada",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/visit-countries-canada-img.png",
    isVisited: false,
  },
  {
    id: "1b520f98-6548-41f3-816e-c8b887865172",
    name: "Greenland",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/visit-countries-greenland-img.png",
    isVisited: false,
  },
  {
    id: "d766f754-34f7-413e-81ec-9992821b97fa",
    name: "Switzerland",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/visit-countries-switzerland-img.png",
    isVisited: false,
  },
  {
    id: "53c9c67a-c923-4927-8a75-fdfc4bc5ec61",
    name: "Australia",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/visit-countries-australia-img.png",
    isVisited: false,
  },
  {
    id: "25841996-fbfd-4554-add4-4c94082c8ccd",
    name: "India",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/visit-countries-india-img.png",
    isVisited: false,
  },
  {
    id: "603c3568-13b0-11ec-82a8-0242ac130003",
    name: "Netherlands",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/visit-countries-netherland-img.png",
    isVisited: false,
  },
  {
    id: "3c988dec-55e1-477d-a9e2-b354fd559849",
    name: "Portugal",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/visit-countries-portugal-img.png",
    isVisited: false,
  },
  {
    id: "7ebb4e04-b124-417f-a69e-564a456d70f1",
    name: "Thailand",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/visit-countries-thailand-img.png",
    isVisited: false,
  },
  {
    id: "1e4b1dcd-6ace-4dde-ad8d-675927d5ae47",
    name: "United Kingdom",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/visit-countries-united-kingdom-img.png",
    isVisited: true,
  },
  {
    id: "e76da8ca-bc48-4981-902b-a4d2d46feb6d",
    name: "Venezuela",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/visit-countries-venezuela-img.png",
    isVisited: false,
  },
];

function VisitCountries() {
  const [countries, setCountries] = useState(() =>
    [...INITIAL_COUNTRIES].sort((a, b) => a.name.localeCompare(b.name))
  );

  const visitedCountriesList = useMemo(
    () =>
      countries
        .filter((c) => c.isVisited)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [countries]
  );

  const onVisitCountry = (index) => {
    setCountries((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        isVisited: !next[index].isVisited,
      };
      return next;
    });
  };

  const onRemoveVisitedCountry = (countryId) => {
    setCountries((prev) =>
      prev.map((c) =>
        c.id === countryId ? { ...c, isVisited: false } : c
      )
    );
  };

  return (
    <div className="visit-countries-main-container">
      <h3 style={{ color: "#fff", marginBottom: "20px" }}>Countries</h3>
      <div className="visit-countries-country-container">
        {countries.map((country, index) => (
          <div key={country.id} className="visit-countries-sub-container">
            <p>{country.name}</p>
            <button
              type="button"
              className={`visit-countries-visit-btn ${
                country.isVisited ? "visited-country-button" : ""
              }`}
              onClick={() => onVisitCountry(index)}
            >
              {country.isVisited ? "Visited" : "Visit"}
            </button>
          </div>
        ))}
      </div>
      <h3 style={{ color: "#fff", marginBottom: "0px" }}>Visited Countries</h3>
      <div className="visit-countries-visited-container">
        {visitedCountriesList.map((visitedCountry) => (
          <div
            key={visitedCountry.id}
            className="visited-countries-sub-container"
          >
            <img
              alt={visitedCountry.name}
              src={visitedCountry.imageUrl}
              className="visited-countries-image"
            />
            <div className="visited-countries-description-container">
              <p>{visitedCountry.name}</p>
              <button
                type="button"
                className="visited-countries-button"
                onClick={() => onRemoveVisitedCountry(visitedCountry.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <h3
          className={
            visitedCountriesList.length > 0
              ? "visit-countries-d-none"
              : "visit-countries-no-visited"
          }
        >
          No Visited Countries
        </h3>
      </div>
    </div>
  );
}

export default VisitCountries;
