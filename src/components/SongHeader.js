import React, { useState } from "react";
import "./SongHeader.css";
import AddSong from "./AddSong";

const SongHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="song-header">
        <div className="title">
          <h1>Songs</h1>
        </div>
        <div className="add-song-parent">
          <div className="add-song-button">
            <button onClick={() => setIsDialogOpen(true)}>Add Songs</button>
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <AddSong
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </>
  );
};

export default SongHeader;
