import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";

function ReactPopup() {
  return (
    <div className="popup-container">
      <h3>To get, message like content</h3>
      <Popup
        trigger={
          <button type="button" className="trigger-button">
            {" "}
            Trigger
          </button>
        }
      >
        <div>
          <p>React is a popular and widely used programming language</p>
        </div>
      </Popup>
      <br />
      <h3>To get, as popup</h3>
      <br />
      <Popup
        modal
        trigger={
          <button type="button" className="trigger-button">
            {" "}
            Popup
          </button>
        }
        position="top right"
        overlayStyle={{ backgroundColor: "#456467" }}
      >
        {(close) => (
          <>
            <div>
              <p>React is a popular and widely used programming language</p>
            </div>
            <button
              type="button"
              className="trigger-button"
              onClick={() => close()}
            >
              Close
            </button>
          </>
        )}
      </Popup>
    </div>
  );
}

export default ReactPopup;
