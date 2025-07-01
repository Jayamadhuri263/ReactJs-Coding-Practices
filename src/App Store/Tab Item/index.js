import React from "react";
import "../index.css";

function TabItem(props) {
  const { tabDetails, onTabSelect, tabActiveItem } = props;
  const { displayText, tabId } = tabDetails;
  const appStoreTabActive = tabActiveItem
    ? "tab-item-active"
    : "tab-item-non-active";

  const onTabItemClicked = () => {
    onTabSelect(tabId);
  };

  return (
    <div className="tab-item-container">
      <button
        type="button"
        className={`tab-item-button ${appStoreTabActive}`}
        onClick={onTabItemClicked}
      >
        <h1 className="tab-item-heading">{displayText}</h1>
      </button>
    </div>
  );
}

export default TabItem;
