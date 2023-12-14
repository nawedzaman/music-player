import React, { createContext, useContext, useState } from 'react';

const SongsContext = createContext();

export const useSongsContext = () => {
  return useContext(SongsContext);
};

export const SongsProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);

  const addSong = (newSong) => {
    setSongs([...songs, newSong]);
  };
  const updateSong = (updatedSongs) => {
    console.log(updatedSongs);
    setSongs(updatedSongs);
  };
  const deleteSong = (index) => {
    const updatedSongs = [...songs];
    updatedSongs.splice(index, 1);
    setSongs(updatedSongs);
  };

  return (
    <SongsContext.Provider value={{ songs, addSong,updateSong,deleteSong }}>
      {children}
    </SongsContext.Provider>
  );
};
