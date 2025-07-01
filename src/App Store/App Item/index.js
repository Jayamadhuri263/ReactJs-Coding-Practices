import React from "react";
import "../index.css";

function AppItem(props) {
  const { appDetails } = props;
  const { appName, imageUrl } = appDetails;

  return (
    <div className="app-item-container">
      <img src={imageUrl} alt={appName} className="app-item-app-icon" />
      <p className="app-item-app-name">{appName}</p>
    </div>
  );
}

export default AppItem;
