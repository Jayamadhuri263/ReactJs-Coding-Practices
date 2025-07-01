import "../index.css";

function ExtraEventsItem(props) {
  const { itemDetails, onTriggerEvent } = props;
  const { imageUrl, name, location, id } = itemDetails;

  const onClickEvent = () => {
    onTriggerEvent(id);
  };

  return (
    <div className="list-item-container">
      <button type="button" onClick={onClickEvent}>
        <img src={imageUrl} alt={name} />
      </button>
      <h2>{name}</h2>
      <p>{location}</p>
    </div>
  );
}
export default ExtraEventsItem;
