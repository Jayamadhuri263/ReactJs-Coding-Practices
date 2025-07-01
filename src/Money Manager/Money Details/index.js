import React from "react";
import "../index.css";

function MoneyDetails(props) {
  const { incomeAmount, expenseAmount, balanceAmount } = props;

  return (
    <div className="money-details-main-container">
      <div className="money-details-container balance-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
          alt="income"
          className="income-image"
        />
        <div className="income-container-name-amount">
          <h1 className="income-heading">Your Balance</h1>
          <h1 className="income-count">Rs {balanceAmount}</h1>
        </div>
      </div>

      <div className="money-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
          alt="income"
          className="income-image"
        />
        <div className="income-container-name-amount">
          <h1 className="income-heading">Your Income</h1>
          <h1 className="income-count">Rs {incomeAmount}</h1>
        </div>
      </div>

      <div className="money-details-container expenses-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png "
          alt="income"
          className="income-image"
        />
        <div className="income-container-name-amount">
          <h1 className="income-heading">Your Expenses</h1>
          <h1 className="income-count">Rs {expenseAmount}</h1>
        </div>
      </div>
    </div>
  );
}

export default MoneyDetails;
