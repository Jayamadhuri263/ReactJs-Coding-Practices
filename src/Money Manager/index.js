import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./index.css";
import MoneyDetails from "./Money Details";
import MoneyItem from "./Money Item";

const transactionTypeOptions = [
  {
    optionId: "INCOME",
    displayText: "Income",
  },
  {
    optionId: "EXPENSES",
    displayText: "Expenses",
  },
];

const initialList = [
  {
    id: uuid(),
    title: "Salary",
    amount: 100000,
    type: "Income",
  },
];

function MoneyManager() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedValue, setSelectedValue] = useState(
    transactionTypeOptions[0].optionId
  );
  const [moneyManagerList, setMoneyManagerList] = useState(initialList);

  const onSubmitForm = (e) => {
    e.preventDefault();

    const typeOption = transactionTypeOptions.find(
      (each) => each.optionId === selectedValue
    );
    const { displayText } = typeOption;

    const newTransaction = {
      id: uuid(),
      title: title,
      amount: parseInt(amount),
      type: displayText,
    };

    setMoneyManagerList([...moneyManagerList, newTransaction]);
    setTitle("");
    setAmount("");
    setSelectedValue(transactionTypeOptions[0].optionId);

    // console.log(moneyManagerList);
  };

  const calculateIncome = () => {
    let incomeAmount = 0;
    moneyManagerList.forEach((incomeItem) => {
      if (incomeItem.type === "Income") {
        // console.log("Type is: ", incomeItem.type);
        incomeAmount += incomeItem.amount;
      }
    });
    return incomeAmount;
  };

  const calculateExpenses = () => {
    let expenseAmount = 0;
    moneyManagerList.forEach((expenseItem) => {
      if (expenseItem.type === "Expenses") {
        expenseAmount += expenseItem.amount;
      }
    });
    return expenseAmount;
  };

  const calculateBalance = () => {
    let balanceAmount = 0;
    moneyManagerList.forEach((balance) => {
      if (balance.type === "Income") {
        balanceAmount += balance.amount;
      } else {
        balanceAmount -= balance.amount;
      }
    });
    return balanceAmount;
  };

  const deleteMoneyItem = (id) => {
    setMoneyManagerList(
      moneyManagerList.filter((eachComment) => eachComment.id !== id)
    );
  };

  const incomeAmount = calculateIncome();
  const expenseAmount = calculateExpenses();
  const balanceAmount = calculateBalance();
  //   console.log("balance = ", balanceAmount);

  return (
    <div className="money-manager-main-container">
      <div className="money-manager-profile-container">
        <h1 className="money-manager-profile-name">Hi, Jaya madhuri Ganjikunta</h1>
        <p className="money-manager-profile-message">
          Welcome back to your
          <span className="money-manager-profile-message-special">
            Money Manager
          </span>
        </p>
      </div>

      <div className="money-details-container-main">
        {
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expenseAmount={expenseAmount}
          />
        }
      </div>

      <div className="money-manager-form-and-list-container">
        <form className="money-manager-form-container" onSubmit={onSubmitForm}>
          <h1 className="money-manager-form-heading">Add Transaction</h1>
          <label htmlFor="formTitle" className="money-manager-form-title-label">
            TITLE
          </label>
          <input
            type="text"
            value={title}
            placeholder="Title"
            id="formTitle"
            onChange={(e) => setTitle(e.target.value)}
            className="money-manager-form-title-input"
          />
          <label
            htmlFor="formAmount"
            className="money-manager-form-title-label"
          >
            AMOUNT
          </label>
          <input
            type="number"
            value={amount}
            id="formAmount"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
            className="money-manager-form-title-input"
          />
          <label htmlFor="formType" className="money-manager-form-title-label">
            TYPE
          </label>
          <select
            value={selectedValue}
            id="formType"
            onChange={(e) => setSelectedValue(e.target.value)}
            className="money-manager-form-title-input select-input"
          >
            {transactionTypeOptions.map((eachTrans) => (
              <option
                key={eachTrans.optionId}
                value={eachTrans.optionId}
                className="money-manager-select-option"
              >
                {eachTrans.displayText}
              </option>
            ))}
          </select>
          <button type="submit" className="money-manager-form-submit-button">
            Add
          </button>
        </form>

        <div className="money-manager-history-main-container">
          <h1 className="money-manager-form-heading">History</h1>
          <div className="money-manager-history-container">
            <div className="money-manager-history-heading-container">
              <p className="money-manager-history-mini-headings">Title</p>
              <p className="money-manager-history-mini-headings">Amount</p>
              <p className="money-manager-history-mini-headings">Type</p>
            </div>
            <hr className="hr-line" />
            {moneyManagerList.map((item) => (
              <MoneyItem
                key={item.id}
                moneyItemDetails={item}
                deleteMoneyItem={deleteMoneyItem}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoneyManager;
