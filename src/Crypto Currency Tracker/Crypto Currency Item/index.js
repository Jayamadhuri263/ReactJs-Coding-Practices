import React from "react";
import "../index.css";

function CryptocurrencyItem(props) {
  const { itemDetails } = props;
  const { currencyLogo, currencyName, euroValue, usdValue } = itemDetails;

  return (
    <div className="crypto-currency-tracker-table-header value-container">
      <div className="currency-logo-name-container">
        <img src={currencyLogo} alt={currencyName} className="currency-logo" />
        <h1 className="header-name currency-name">{currencyName}</h1>
      </div>
      <div className="currency-containers-header">
        <h1 className="header-name"> {usdValue} </h1>
        <h1 className="header-name">{euroValue}</h1>
      </div>
    </div>
  );
}

export default CryptocurrencyItem;
