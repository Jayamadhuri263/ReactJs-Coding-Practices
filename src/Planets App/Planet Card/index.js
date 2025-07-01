import React from "react";
import "../index.css";

function PlanetCard(props) {
  const { planetDetails } = props;
  const { name, imageUrl, description } = planetDetails;

  return (
    <div className="planet-card-container">
      <img src={imageUrl} alt={name} className="planet-image" />
      <h1 className="planet-name">{name}</h1>
      <p className="planet-description">{description}</p>
    </div>
  );
}

export default PlanetCard;
