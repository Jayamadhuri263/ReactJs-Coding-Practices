import React from "react";
import { Component } from "react";
import Button from "./Button";
import "./index.css";
const buttonList = [
  { id: 1, name: "Top" },
  { id: 2, name: "Bottom" },
  { id: 3, name: "Left" },
  { id: 4, name: "Right" },
];
class Generator extends Component {
  state = {
    activeButton: buttonList[0].name,
    colorA: "#fb0e98",
    colorB: "#cff708",
  };
  onButton = (id) => {
    const abc = buttonList.find((each) => each.id === id);
    this.setState({
      activeButton: abc.name,
    });
  };
  onChangeColorA = (e) => {
    this.setState({ colorA: e.target.value });
  };
  onChangeColorB = (e) => {
    this.setState({ colorB: e.target.value });
  };
  render() {
    const { activeButton, colorA, colorB } = this.state;

    return (
      <div
        className="bg"
        style={{
          background: `linear-gradient(to ${activeButton},${colorA}, ${colorB})`,
        }}
      >
        <h1>Gradient Generator</h1>
        <div style={{ marginBottom: 3 + "em" }}>
          {buttonList.map((each) => (
            <Button
              key={each.id}
              details={each}
              onButton={this.onButton}
              activeButton={activeButton}
            />
          ))}
        </div>
        <div>
          <input
            style={{ backgroundColor: colorA }}
            type="color"
            value={colorA}
            onChange={this.onChangeColorA}
          />
          <input
            style={{ backgroundColor: colorB }}
            type="color"
            value={colorB}
            onChange={this.onChangeColorB}
          />
        </div>
      </div>
    );
  }
}
export default Generator;
