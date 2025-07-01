import "../index.css";

function EmojiItem(props) {
  const { emojiDetails, selectedEmoji } = props;
  const { id, emojiUrl, emojiName } = emojiDetails;

  const onCLickEmoji = () => {
    selectedEmoji(id);
  };

  return (
    <div className="emoji-item-container">
      <button
        type="button"
        className="emoji-item-button"
        onClick={onCLickEmoji}
      >
        <img src={emojiUrl} alt={emojiName} className="emoji-item-image" />
      </button>
    </div>
  );
}

export default EmojiItem;
