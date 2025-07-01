import React from "react";
import Popup from "reactjs-popup";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import "./index.css";

function HamburgerMenu() {
  return (
    <div className="hamburger-menu-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/hamburger-menu-website-logo.png"
        alt="logo"
        className="hamburger-menu-logo"
      />
      <Popup
        modal
        trigger={<GiHamburgerMenu size={30} />}
        position="top right"
        overlayStyle={{ backgroundColor: "#456467" }}
      >
        {(close) => (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "end",
                paddingRight: "20px",
                paddingTop: "10px",
              }}
            >
              <button
                type="button"
                onClick={() => close()}
                className="hamburger-menu-close"
              >
                <IoMdClose size={30} />
              </button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1>Home</h1>
              <h1>About</h1>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}

export default HamburgerMenu;
