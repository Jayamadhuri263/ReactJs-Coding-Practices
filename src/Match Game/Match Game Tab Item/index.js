import "../index.css";

function MatchGameTabItem(props) {
  const { tabDetails, activeTab, onSelectActiveTab } = props;
  const { displayText, tabId } = tabDetails;

  const activeTabButton = activeTab ? "active-button" : "non-active-button";

  const onClickTabItem = () => {
    onSelectActiveTab(tabId);
  };

  return (
    <div className="match-game-tab-item-container">
      <button
        type="button"
        className={`match-game-tab-item-heading ${activeTabButton}`}
        onClick={onClickTabItem}
      >
        {displayText}
      </button>
    </div>
  );
}

export default MatchGameTabItem;
