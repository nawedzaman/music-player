import "./SongsListingPage.css";
import React from "react";
import SongsList from "./SongsList";
import Player from "./Player";
import SongHeader from "./SongHeader";
import Sidebar from "./SideBar";
import { SongsProvider } from "../utils/SongsContext";

const SongsListingPage = () => {
  return (
    <div className="page-container">
      <SongsProvider>
        <Sidebar />

        <div className="main-content">
          <SongHeader />
          <SongsList />
          <Player />
        </div>
      </SongsProvider>
    </div>
  );
};

export default SongsListingPage;
