import LayoutContext from "./LayoutContext";

function Config() {
  return (
    <LayoutContext.Consumer>
      {(value) => {
        const {
          showContent,
          showLeftNavbar,
          showRightNavbar,
          onToggleShowContent,
          onToggleShowLeftNavbar,
          onToggleShowRightNavbar,
        } = value;

        const onToggleChangeContent = (e) => {
          onToggleShowContent(e.target.value);
        };

        const onToggleChangeLeft = (e) => {
          onToggleShowLeftNavbar(e.target.value);
        };

        const onToggleChangeRight = (e) => {
          onToggleShowRightNavbar(e.target.value);
        };
        
        return (
          <div>
            <h1>Layout</h1>
            <ul>
              <li>
                <input
                  type="checkbox"
                  id="showC"
                  checked={showContent}
                  onChange={onToggleChangeContent}
                />
                <label htmlFor="showC">Show Content</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="showR"
                  checked={showRightNavbar}
                  onChange={onToggleChangeRight}
                />
                <label htmlFor="showR">Show Right Navbar</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="showL"
                  checked={showLeftNavbar}
                  onChange={onToggleChangeLeft}
                />
                <label htmlFor="showL">Show Left Navbar</label>
              </li>
            </ul>
          </div>
        );
      }}
    </LayoutContext.Consumer>
  );
}
export default Config;
