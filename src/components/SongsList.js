// SongsList.js
import React, { useState } from 'react';

const SongsList = ({ songs, onAddSong }) => {
  const [newSong, setNewSong] = useState('');

  const handleInputChange = (e) => {
    setNewSong(e.target.value);
  };

  const handleAddClick = () => {
    if (newSong.trim() !== '') {
      onAddSong(newSong);
      setNewSong('');
    }
  };

  return (
    <div>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>{song.title}</li>
        ))}
      </ul>
      <input type="text" value={newSong} onChange={handleInputChange} />
      <button onClick={handleAddClick}>Add Song</button>
    </div>
  );
};

export default SongsList;
