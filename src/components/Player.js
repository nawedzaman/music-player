import React, { useState, useEffect, useRef } from "react";
import { useSongsContext } from "../utils/SongsContext";
import "./Player.css";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);
  const timeRangeRef = useRef(null);
  const { songs } = useSongsContext();

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const selectedSong = songs[currentSongIndex];

    if (audio) {
      audio.src = selectedSong?.url;

      const handleTimeUpdate = () => {
        const newTime = audio.currentTime;
        timeRangeRef.current.value = newTime;
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);

      if (selectedSong?.currentlyPlaying) {
        audio
          .play()
          .then(() => {})
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }

      return () => {
        audio.pause();
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [songs, currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    const indexOfCurrentlyPlaying = songs.findIndex(
      (song) => song.currentlyPlaying
    );

    if (
      indexOfCurrentlyPlaying !== -1 &&
      indexOfCurrentlyPlaying !== currentSongIndex
    ) {
      setCurrentSongIndex(indexOfCurrentlyPlaying);
    }
  }, [songs, currentSongIndex]);

  const handlePlayButtonClick = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio
          .play()
          .then(() => {})
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handlePrev = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
  };

  const handleSeek = (newTime) => {
    setCurrentTime(newTime);
  };

  return (
    <>
      <div className="player-container">
        <div className="progress-bar">
        <input
          ref={timeRangeRef}
          type="range"
          value={currentTime}
          max={duration}
          onChange={(e) => handleSeek(parseFloat(e.target.value))}
        />
        </div>
        <div className="player-details">
          <div className="player-img">
            <img src={songs[currentSongIndex]?.thumbnail} alt="Thumbnail" />
          </div>
          <div className="player-name">
          <h2>{songs[currentSongIndex]?.title}</h2>
          </div>
          <div className="player-button-container">
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handlePlayButtonClick}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={handleNext}>Next</button>
        </div>
        </div>
        <audio ref={audioRef}>
          <source src={songs[currentSongIndex]?.url} type="audio/mp3" />
          Your browser does not support the audio tag.
        </audio>
      </div>
    </>
  );
};

export default Player;
