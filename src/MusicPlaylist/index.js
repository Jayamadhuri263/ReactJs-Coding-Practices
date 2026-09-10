import React, { useEffect, useMemo, useState } from "react";
import "./MusicPlaylist.css";

const INITIAL_TRACKS = [
  {
    id: "3b22e3fd-3d12-4ad1-9e38-90314219c4f4",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-perfect-img.png",
    name: "Perfect",
    genre: "Pop",
    duration: "4:04",
  },
  {
    id: "40f97965-ff45-469e-a635-b2ef9f1642ed",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-shape-of-you-img.png",
    name: "Shape of You",
    genre: "Divide",
    duration: "4:24",
  },
  {
    id: "782f916b-4056-44ec-a95f-5115c3f84904",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-visiting-hours.png",
    name: "Visiting Hours",
    genre: "Folk-Pop",
    duration: "3:49",
  },
  {
    id: "fcf0dc77-3427-457c-9ee0-91b1dc39fece",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-shivers-img.png",
    name: "Shivers",
    genre: "Dance-Pop",
    duration: "3:58",
  },
  {
    id: "9c1bb890-d4d5-4edf-9d95-6959d716b442",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-bad-habits-img.png",
    name: "Bad Habits",
    genre: "Dance-Pop",
    duration: "4:01",
  },
  {
    id: "2216db9c-647f-4814-b880-179740e4d748",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-castle-on-the-hill-img.png",
    name: "Castle on the Hill",
    genre: "Pop&Rock",
    duration: "4:48",
  },
  {
    id: "a5e30966-b760-4660-bf08-073135f7d010",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-happier-img.png",
    name: "Happier",
    genre: "Pop",
    duration: "3:36",
  },
  {
    id: "2d5c9bc0-b8b0-41c6-aa55-cb3b659d8604",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-photograph-img.png",
    name: "Photograph",
    genre: "Folk music",
    duration: "4:26",
  },
  {
    id: "efd3d621-2c05-4941-acdc-0a1a0786bc53",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-galway-girl-img.png",
    name: "Galway Girl",
    genre: "Pop",
    duration: "3:20",
  },
  {
    id: "e4b8e3b8-7776-4c09-8abc-ba328a8babe9",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-i-dont-care-img.png",
    name: "I Don't Care",
    genre: "Pop",
    duration: "3:38",
  },
];

function MusicPlaylist() {
  const [tracks, setTracks] = useState(() => [...INITIAL_TRACKS]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const filteredTracks = useMemo(
    () =>
      tracks.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [tracks, searchQuery]
  );

  const onSearch = () => {
    setSearchQuery(searchInput);
  };

  const onDelete = (id) => {
    setTracks((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const ids = ["music-playlist-bs", "music-playlist-fa"];
    const hrefs = [
      "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
    ];
    ids.forEach((id, i) => {
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = hrefs[i];
        document.head.appendChild(link);
      }
    });
  }, []);

  return (
    <div className="music-playlist-main-container">
      <div className="music-playlist-first-container">
        <h1>Ed Sheeran</h1>
        <h3>Singer</h3>
      </div>
      <div className="music-playlist-second-container">
        <div className="music-playlist-heading-search-container">
          <h2>Songs Playlist</h2>
          <div className="input-group" style={{ width: "38%" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              style={{
                backgroundColor: "transparent",
                color: "#fff",
              }}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className="input-group-append" style={{ width: "37%" }}>
              <button
                className="btn btn-secondary"
                type="button"
                style={{ height: "5.9vh", backgroundColor: "#aaa" }}
                onClick={onSearch}
              >
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </div>
        {filteredTracks.length === 0 ? (
          <div className="music-playlist-no-songs-container">
            <h1>No songs found</h1>
          </div>
        ) : (
          filteredTracks.map((track) => (
            <div
              key={track.id}
              className="music-playlist-list-view-container"
            >
              <div className="music-playlist-list-view">
                <div style={{ display: "flex" }}>
                  <img
                    src={track.imageUrl}
                    alt=""
                    style={{
                      height: "14.5vh",
                      width: "150px",
                      marginRight: "15px",
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h4 style={{ marginTop: "14px" }}>{track.name}</h4>
                    <h6 style={{ color: "#3b82f6" }}>{track.genre}</h6>
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <div style={{ display: "flex" }}>
                    <h6 style={{ marginRight: "40px" }}>{track.duration}</h6>
                    <button
                      type="button"
                      className="music-playlist-delete-btn"
                      onClick={() => onDelete(track.id)}
                    >
                      <i
                        className="fa fa-trash"
                        style={{
                          color: "#aaa",
                          marginTop: "0px",
                          fontSize: "20px",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MusicPlaylist;
