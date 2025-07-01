import React, { Component } from "react";
import { Chrono } from "react-chrono";
import "./index.css";

const items = [{ title: "2018" }, { title: "2019" }];

export class ReactChrono extends Component {
  render() {
    return (
      <div className="chrono-main-container">
        <Chrono mode="VERTICAL" items={items}>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/csk-logo-img.png"
              className="chennai-super-kings"
              alt="chennai-super-kings"
            />
          </div>
          <div>
            <h1>Mumbai Indians</h1>
            <p>IPL Team winner for the year 2019 is Mumbai Indians.</p>
          </div>
        </Chrono>
      </div>
    );
  }
}

export default ReactChrono;
