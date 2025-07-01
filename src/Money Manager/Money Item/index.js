import React from "react";
import "../index.css";

function MoneyItem(props) {
  const { moneyItemDetails, deleteMoneyItem } = props;
  const { title, amount, type, id } = moneyItemDetails;

  const onClickDelete = () => {
    deleteMoneyItem(id);
  };

  return (
    <div className="money-item-main-container">
      <div className="money-item-container">
        <p className="money-manager-history-mini-headings amount-type">
          {title}
        </p>
        <p className="money-manager-history-mini-headings amount-type">
          {amount}
        </p>
        <p className="money-manager-history-mini-headings amount-type">
          {type}
        </p>
        <button
          type="button"
          className="money-item-delete-button"
          onClick={onClickDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="money-item-delete-image"
          />
        </button>
      </div>
      <hr className="hr-line" />
    </div>
  );
}

export default MoneyItem;
