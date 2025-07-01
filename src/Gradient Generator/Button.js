import "./index.css";

function Button(props) {
  const { details, onButton, activeButton } = props;
  const { name, id } = details;
  const onClickButton = () => {
    onButton(id);
  };
  const activeBtnStyle = activeButton === name ? "btn-active-style" : "";
  return (
    <button
      className={`${activeBtnStyle}`}
      type="button"
      onClick={onClickButton}
    >
      {name}
    </button>
  );
}
export default Button;
