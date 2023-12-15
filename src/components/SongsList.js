import React, { useState } from "react";
import "./SongsList.css";
import { useSongsContext } from "../utils/SongsContext";
import DeletePopup from "../utils/DeletePopup";

const SongsList = () => {
  const { songs, updateSong, deleteSong } = useSongsContext();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [songIndexToDelete, setSongIndexToDelete] = useState(null);

  const onPlayButtonClick = (index) => {
    const updatedSongs = songs.map((song, i) =>
      i === index
        ? { ...song, currentlyPlaying: true }
        : { ...song, currentlyPlaying: false }
    );
    updateSong(updatedSongs);
  };

  const onPauseButtonClick = (index) => {
    const updatedSongs = songs.map((song, i) =>
      i === index ? { ...song, currentlyPlaying: false } : song
    );
    updateSong(updatedSongs);
  };
  const handleDelete = (index) => {
    setShowDeletePopup(true);
    setSongIndexToDelete(index);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setSongIndexToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (songIndexToDelete !== null) {
      deleteSong(songIndexToDelete);
      setShowDeletePopup(false);
      setSongIndexToDelete(null);
    }
  };
  if (songs.length === 0) {
    return (
      <div className="no-songs-message">
        <p>No songs available. Add some songs to your playlist.</p>
      </div>
    );
  }
  return (
    <>
      <div className="heading-container">
        <div className="heading1">
          <h2>SONG NAME </h2>
        </div>
        <div className="heading2">
          <h2>SOURCE</h2>
        </div>
        <div className="heading3">
          <h2>ADDED ON</h2>
        </div>
        <div className="heading3">
          {/* <h2>Actions</h2> */}
        </div>
      </div>
      <div className="song-container">
        <ul>
          {songs.map((song, index) => (
            <li key={index} className="song-item">
              <div className="song-details">
                <div className="song-info">
                  <span className="thumbnail-container">
                    <img src={song?.thumbnail} alt="Thumbnail" />
                  </span>
                  <span className="song-title">{song?.title}</span>
                </div>
                <div className="song-info2">
                  <span className="song-source">{song?.source}</span>
                </div>
                <div className="song-metadata">
                  <span className="added-on">{song?.addedOn}</span>
                </div>
                <div className="song-actions">
                  {song.currentlyPlaying ? (
                    <button
                      className="pause-button"
                      onClick={() => onPauseButtonClick(index)}
                    >
                      Stop
                    </button>
                  ) : (
                    <button
                      className="play-button"
                      onClick={() => onPlayButtonClick(index)}
                    >
                      Play
                    </button>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                  {showDeletePopup && (
                    <DeletePopup
                      onCancel={handleCancelDelete}
                      onConfirm={handleConfirmDelete}
                    />
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SongsList;
