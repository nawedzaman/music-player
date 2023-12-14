import "./SongsListingPage.css";
import React, { useState, useEffect } from "react";
import SongsList from "./SongsList";
import Player from "./Player";

const SongsListingPage = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    const fakeSongs = [
      { title: 'Song 1', url: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3' },
      { title: 'Song 2', url: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3' },
      // Add more fake songs as needed
    ];

    setSongs((prevSongs) => [...prevSongs, ...fakeSongs]);
  }, []);

  const handleAddSong = (newSong) => {
    setSongs([...songs, newSong]);
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handlePrevSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
  };

  return (
    <div>
      <SongsList songs={songs} onAddSong={handleAddSong} />
      <Player
        currentSong={songs[currentSongIndex]}
        onNextSong={handleNextSong}
        onPrevSong={handlePrevSong}
      />
    </div>
  );
};

export default SongsListingPage;
