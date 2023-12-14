import "./SongsListingPage.css";
import React from "react";
import SongsList from "./SongsList";
import Player from "./Player";
import SongHeader from "./SongHeader";
import { SongsProvider } from "../utils/SongsContext";

const SongsListingPage = () => {
  return (
    <div>
      <SongsProvider>
        <SongHeader />
        <SongsList />
        <Player />
      </SongsProvider>
    </div>
  );
};

export default SongsListingPage;
