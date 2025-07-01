import "../index.css";

function Item(props) {
  const { id, title, date, isFavorite, onStarButtonIcon } = props;
  const starImage = isFavorite
    ? "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
    : "https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png";

  const onStarButton = () => {
    onStarButtonIcon(id);
  };

  return (
    <div className="item-container">
      <h2>{{ title }}</h2>
      <p>{{ date }}</p>
      <button type="button" onClick={onStarButton}>
        <img src={starImage} alt={title} />
      </button>
    </div>
  );
}

export default Item;
