import React, { useState, useEffect, useRef } from 'react';

const Player = ({ currentSong, onNextSong, onPrevSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());
  const timeRangeRef = useRef(null);
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  useEffect(() => {
    const audio = audioRef.current;

    audio.src = currentSong?.url;
    const handleTimeUpdate = () => {
        const newTime = audio.currentTime;
        timeRangeRef.current.value = newTime;
      };
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    if (isPlaying) {
      audio.play().then(() => {}).catch((error) => {
        console.error('Error playing audio:', error);
      });
    } else {
      audio.pause();
    }

    return () => {
        audio.pause();
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.currentTime = currentTime;
  }, [currentTime]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    onNextSong();
  };

  const handlePrev = () => {
    onPrevSong();
  };

  const handleSeek = (newTime) => {
    setCurrentTime(newTime);
  };
  return (
    <div>
      <h2>Now Playing: {currentSong?.title}</h2>
      <audio>
        <source src={currentSong?.url} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
      <div>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <input
        ref={timeRangeRef}
        type="range"
        value={currentTime}
        max={duration}
        onChange={(e) => handleSeek(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default Player;
