import Popup from "reactjs-popup";
import ReactPlayer from "react-player";
import { IoMdClose } from "react-icons/io";
import "../index.css";

function PrimeVideoCard(props) {
  const { movieDetails } = props;
  const { thumbnailUrl, videoUrl } = movieDetails;

  return (
    <div className="prime-video-card-container">
      <Popup
        modal
        trigger={
          <img
            src={thumbnailUrl}
            alt="video"
            className="prime-video-card-image"
          />
        }
        className="popup-container"
        overlayStyle={{
          height: "60vh",
          width: "100%",
          marginTop: "10%",
          backgroundColor: "transparent",
        }}
      >
        {(close) => (
          <>
            <div className="prime-video-card-mini">
              <button
                type="button"
                className="prime-video-card-button"
                onClick={() => close()}
              >
                <IoMdClose size={30} />
              </button>
            </div>
            <div>
              <ReactPlayer url={videoUrl} className="react-player" />
            </div>
          </>
        )}
      </Popup>
    </div>
  );
}

export default PrimeVideoCard;
