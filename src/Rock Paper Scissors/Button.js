import "./index.css";

const Button = (props) => {
  const { details, onClickButton } = props;
  const { id, image } = details;

  const onSelectIcon = () => {
    onClickButton(id);
  };

  return (
    <button type="button" onClick={onSelectIcon} className="button-container button-container1">
      <img src={image} alt="icon" />
    </button>
  );
};
export default Button;
