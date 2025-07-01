import React, { Component } from "react";
import { Rings } from "react-loader-spinner";
import CryptocurrencyItem from "./Crypto Currency Item";
import "./index.css";

export class CryptoCurrencyTracker extends Component {
  state = {
    isLoading: true,
    currencyList: [],
  };

  componentDidMount() {
    this.getCurrenciesData();
  }

  getCurrenciesData = async () => {
    const response = await fetch(
      "https://apis.ccbp.in/crypto-currency-converter"
    );
    const data = await response.json();
    const formattedData = data.map((each) => ({
      id: each.id,
      currencyLogo: each.currency_logo,
      currencyName: each.currency_name,
      euroValue: each.euro_value,
      usdValue: each.usd_value,
    }));

    this.setState({ currencyList: formattedData, isLoading: false });
  };

  render() {
    const { isLoading, currencyList } = this.state;
    return (
      <div className="crypto-currency-tracker-container">
        <h1 className="crypto-currency-tracker-heading">
          Cryptocurrency Tracker
        </h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
          alt="cryptocurrency"
          className="crypto-currency-tracker-image"
        />
        {isLoading ? (
          <Rings color="#345456" type="Rings" height={110} width={110} />
        ) : (
          <div className="crypto-currency-tracker-list-container">
            <div className="crypto-currency-tracker-table-header">
              <h1 className="header-name bold-heading">Coin Type</h1>
              <div className="currency-containers-header">
                <h1 className="header-name bold-heading">USD</h1>
                <h1 className="header-name bold-heading">EURO</h1>
              </div>
            </div>
            {currencyList.map((item) => (
              <CryptocurrencyItem key={item.id} itemDetails={item} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default CryptoCurrencyTracker;
