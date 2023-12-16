import React, { createContext, useContext, useState,useEffect } from 'react';
import dummySongsData from '../assests/dummySongs.json';
const SongsContext = createContext();

export const useSongsContext = () => {
  return useContext(SongsContext);
};

export const SongsProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Load dummy songs from the JSON file
    setSongs(dummySongsData);
  }, []);

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
