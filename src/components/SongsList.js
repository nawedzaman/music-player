import React, { useState } from "react";
import "./SongsList.css";
import { useSongsContext } from "../utils/SongsContext";
import DeletePopup from "../utils/DeletePopup";

const SongsList = () => {
  const { songs, updateSong,deleteSong } = useSongsContext();
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
      deleteSong(songIndexToDelete)
      setShowDeletePopup(false);
      setSongIndexToDelete(null);
    }
  };
  return (
    <div>
      <h2>Song List</h2>
      <ul>
        {songs.map((song, index) => (
          <li key={index} className="song-item">
            <div className="thumbnail-container">
              <img src={song?.thumbnail} alt="Thumbnail" />
            </div>
            <div className="song-details">
              <div className="song-info">
                <span className="song-title">{song?.title}</span>
                <span className="song-source">{song?.source}</span>
              </div>
              <div className="song-metadata">
                <span className="added-on">Added On: {song?.addedOn}</span>
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
  );
};

export default SongsList;
