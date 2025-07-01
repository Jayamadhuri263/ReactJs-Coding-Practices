import LayoutContext from "./LayoutContext";

function Body() {
  return (
    <LayoutContext.Consumer>
      {(value) => {
        const { showContent, showLeftNavbar, showRightNavbar } = value;
        return (
          <div>
            {showContent && <h1>Content</h1>}
            {showRightNavbar && <h1>Right Navbar</h1>}
            {showLeftNavbar && <h1>Left Navbar</h1>}
          </div>
        );
      }}
    </LayoutContext.Consumer>
  );
}
export default Body;
