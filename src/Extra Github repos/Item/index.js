import "../index.css";

function Item(props) {
  const { tabDetails, onSelectItem, activeItem } = props;
  const { id, language } = tabDetails;
  const isActiveClass = activeItem === id ? "active-class-tab" : "";
  const onClickTab = () => {
    onSelectItem(id);
  };
  return (
    <div>
      <button className={`${isActiveClass}`} type="button" onClick={onClickTab}>
        {language}
      </button>
    </div>
  );
}

export default Item;
