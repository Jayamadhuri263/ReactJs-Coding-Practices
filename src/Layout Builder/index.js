import { Component } from "react";
import "./index.css";
import Config from "./Config";
import LayoutContext from "./LayoutContext";
import Body from "./Body";

class LayoutBuilder extends Component {
  state = {
    showContent: true,
    showLeftNavbar: true,
    showRightNavbar: true,
  };
  onToggleShowContent = () => {
    this.setState((prevState) => ({
      showContent: !prevState.showContent,
    }));
  };
  onToggleShowRightNavbar = () => {
    this.setState((prevState) => ({
      showRightNavbar: !prevState.showRightNavbar,
    }));
  };
  onToggleShowLeftNavbar = () => {
    this.setState((prevState) => ({
      showLeftNavbar: !prevState.showLeftNavbar,
    }));
  };

  render() {
    const { showContent, showLeftNavbar, showRightNavbar } = this.state;
    return (
      <LayoutContext.Provider
        value={{
          showContent,
          showLeftNavbar,
          showRightNavbar,
          onToggleShowContent: this.onToggleShowContent,
          onToggleShowLeftNavbar: this.onToggleShowLeftNavbar,
          onToggleShowRightNavbar: this.onToggleShowRightNavbar,
        }}
      >
        <div>
          <Config />
          <Body />
        </div>
      </LayoutContext.Provider>
    );
  }
}
export default LayoutBuilder;
