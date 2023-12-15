import React, { useState } from 'react';
import "./AddSong.css";
import { useSongsContext } from '../utils/SongsContext';
const AddSong = ({ isDialogOpen, setIsDialogOpen }) => {
    const [newSong, setNewSong] = useState('');
    const [songLink, setSongLink] = useState('');
    const [songSource, setSongSource] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const { addSong } = useSongsContext()
  
    const handleAddClick = () => {
      if (newSong.trim() !== '' && songLink.trim() !== '' && songSource.trim() !== '') {
        const timestamp = new Date().toISOString();
        addSong({ title: newSong, url: songLink, source: songSource, thumbnail:thumbnail, addedOn:timestamp,currentlyPlaying:false });
        setNewSong('');
        setSongLink('');
        setSongSource('');
        setThumbnail('');
        setIsDialogOpen(false);
      }
    };
  
    const handleThumbnailUpload = (event) => {
      const uploadedThumbnail = event.target.files[0];
    
      if (uploadedThumbnail) {
        const reader = new FileReader();
    
        reader.onloadend = () => {
          setThumbnail(reader.result);
        };
    
        reader.readAsDataURL(uploadedThumbnail);
      }
    };
  
    return (
      <>
      {isDialogOpen && (
          <div className="add-song-overlay">
            <div className="add-song">
              <div className="dialog-header">
                <span className="dialog-heading">Add Song</span>
                <button className="close-button" onClick={() => setIsDialogOpen(false)}>
                  X
                </button>
              </div>
              <div className="dialog-body">
                <div className="form-field">
                  <label>Song Name</label>
                  <input
                    type="text"
                    placeholder="Song Name"
                    value={newSong}
                    onChange={(e) => setNewSong(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Song Link</label>
                  <input
                    type="text"
                    placeholder="URL"
                    value={songLink}
                    onChange={(e) => setSongLink(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Song Source</label>
                  <input
                    type="text"
                    placeholder="Source Name"
                    value={songSource}
                    onChange={(e) => setSongSource(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Click to Upload Profile Thumbnail:</label>
                  <input type="file" onChange={handleThumbnailUpload} />
                </div>
                {thumbnail && (
                  <div className="thumbnail-preview">
                    <img src={thumbnail} alt="Thumbnail Preview" />
                  </div>
                )}
                <div className="thumbnail-message">
                  <p>Image has to be of aspect ratio 1:1 with a size of 3000 pixels x 3000 pixels</p>
                </div>
              </div>
              <div className="dialog-footer">
              <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
              <button onClick={handleAddClick}>Add</button>
              </div>
            </div>
          </div>
        )}
      </>
    )}
  
  export default AddSong;
  