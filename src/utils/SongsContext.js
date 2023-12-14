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
  // Add any other functions or states related to songs data

  return (
    <SongsContext.Provider value={{ songs, addSong,updateSong }}>
      {children}
    </SongsContext.Provider>
  );
};
