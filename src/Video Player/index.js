import React, { Component } from "react";
import ReactPlayer from "react-player/youtube";
import "./index.css";

const videoURL = "https://www.youtube.com/watch?v=OsU0CGZoV8E";

export class VideoPlayer extends Component {
  state = {
    isPlaying: false,
  };

  onClickPlay = () => {
    this.setState((prevState) => ({ isPlaying: !prevState.isPlaying }));
  };

  render() {
    const { isPlaying } = this.state;
    const btnText = isPlaying ? "Pause" : "Play";

    return (
      <div className="video-player-container">
        <h1 className="video-player-heading">Video Player</h1>
        <div className="video-player-responsive-container">
          <ReactPlayer url={videoURL} playing={isPlaying} />
        </div>
        <button
          type="button"
          className="video-player-button"
          onClick={this.onClickPlay}
        >
          {btnText}
        </button>
      </div>
    );
  }
}

export default VideoPlayer;
