import React, { useState } from "react";
import DestinationItem from "./Destination Item";
import "./index.css";

const initialDestinationsList = [
  {
    id: 1,
    name: "Melaka Mosque",
    imgUrl: "https://assets.ccbp.in/frontend/react-js/melaka-mosque-img.png",
  },
  {
    id: 2,
    name: "Shrubland",
    imgUrl: "https://assets.ccbp.in/frontend/react-js/shrubland-img.png",
  },
  {
    id: 3,
    name: "New York",
    imgUrl: "https://assets.ccbp.in/frontend/react-js/new-york-img.png",
  },
  {
    id: 4,
    name: "Escarpment",
    imgUrl: "https://assets.ccbp.in/frontend/react-js/escarpment-img.png",
  },
  {
    id: 5,
    name: "Westminster Abbey",
    imgUrl:
      "https://assets.ccbp.in/frontend/react-js/westminster-abbey-img.png",
  },
  {
    id: 6,
    name: "South Downs National Park",
    imgUrl:
      "https://assets.ccbp.in/frontend/react-js/south-downs-national-park-img.png",
  },
  {
    id: 7,
    name: "National Historic Site",
    imgUrl:
      "https://assets.ccbp.in/frontend/react-js/national-historic-site-img.png",
  },
  {
    id: 8,
    name: "Tower Bridge",
    imgUrl: "https://assets.ccbp.in/frontend/react-js/tower-bridge-img.png",
  },
  {
    id: 9,
    name: "Arc Here",
    imgUrl: "https://assets.ccbp.in/frontend/react-js/arc-here-img.png",
  },
  {
    id: 10,
    name: "Steeple",
    imgUrl: "https://assets.ccbp.in/frontend/react-js/steeple-img.png",
  },
  {
    id: 11,
    name: "Glaciokarst",
    imgUrl: "https://assets.ccbp.in/frontend/react-js/glaciokarst-img.png",
  },
  {
    id: 12,
    name: "Parco Nazionale delle Cinque Terre",
    imgUrl:
      "https://assets.ccbp.in/frontend/react-js/parco-nazionale-delle-cinque-terre-img.png",
  },
];

function DestinationSearch() {
  // const [destinationsList, setDestinationList] = useState(initialDestinationsList);
  const [searchValue, setSearchValue] = useState("");

  const searchResultsList = initialDestinationsList.filter((destination) =>
    destination.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="destination-list-container">
      <h1 className="destination-list-heading">Destination Search</h1>
      <div className="destination-list-search-bar">
        <input
          placeholder="Search"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="destination-list-search"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png"
          alt="search-icon"
          className="destination-list-search-icon"
        />
      </div>
      <div className="destination-list-mini-container">
        {searchResultsList.map((item) => (
          <DestinationItem key={item.id} destinationDetails={item} />
        ))}
      </div>
    </div>
  );
}

export default DestinationSearch;
