import React from "react";
import "./SongsList.css";
import { useSongsContext } from "../utils/SongsContext";

import { Table, Popconfirm } from "antd";

const SongsList = () => {
  const { songs, updateSong, deleteSong } = useSongsContext();

  const columns = [
    {
      title: "SONG NAME",
      dataIndex: "title",
      key: "title",
      render: (_, song) => (
        <div className="song-container">
          <img
            src={
              song.thumbnail
                ? song.thumbnail
                : require("../assests/default-thumbnail.png")
            }
            alt="Thumbnail"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <span className="song-title">{song?.title}</span>
        </div>
      ),
    },
    {
      title: "SOURCE",
      dataIndex: "source",
      key: "source",
    },
    {
      title: "ADDED ON",
      dataIndex: "addedOn",
      key: "addedOn",
    },
    {
      title: "",
      key: "actions",
      render: (_, song) => (
        <div className="button-container">
          {song.currentlyPlaying ? (
            <button
              className="pause-button"
              onClick={() => onPauseButtonClick(song.id)}
            ></button>
          ) : (
            <button
              className="play-button"
              onClick={() => onPlayButtonClick(song.id)}
            ></button>
          )}
          <Popconfirm
            title="Are you sure you want to delete this vendor?"
            onConfirm={() => handleDelete(song.id)}
            okText="Yes"
            cancelText="No"
          >
            <button className="delete-button" />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const onPlayButtonClick = (id) => {
    const updatedSongs = songs.map((song) =>
      song.id === id
        ? { ...song, currentlyPlaying: true }
        : { ...song, currentlyPlaying: false }
    );
    updateSong(updatedSongs);
  };

  const onPauseButtonClick = (id) => {
    const updatedSongs = songs.map((song) =>
      song.id === id ? { ...song, currentlyPlaying: false } : song
    );
    updateSong(updatedSongs);
  };
  const handleDelete = (id) => {
    deleteSong(id);
  };


  return (
    <>

      <Table dataSource={songs} columns={columns}  pagination={{ defaultPageSize: 5}}/>
    
    </>
  );
};

export default SongsList;
