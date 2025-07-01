import "../index.css";

function MatchGameThumbnailItem(props) {
  const { thumbnailDetails, onSelectAnswer } = props;
  const { id, thumbnailUrl } = thumbnailDetails;

  const onSelectThumbnail = () => {
    onSelectAnswer(id);
  };

  return (
    <div className="match-game-thumbnail-item-container">
      <button
        type="button"
        className="match-game-thumbnail-button"
        onClick={onSelectThumbnail}
      >
        <img
          src={thumbnailUrl}
          alt="thumbnail"
          className="match-game-thumbnail-image"
        />
      </button>
    </div>
  );
}

export default MatchGameThumbnailItem;
