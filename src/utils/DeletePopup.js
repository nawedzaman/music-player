import React from "react";

const DeleteConfirmationPopup = ({  onCancel, onConfirm }) => {
  const handleCancelDelete = () => {
    onCancel();
  };

  const handleConfirmDelete = () => {
    onConfirm();
  };

  return (
    <div className="delete-popup">
      <p>Are you sure you want to delete this song?</p>
      <button onClick={handleCancelDelete}>Cancel</button>
      <button onClick={handleConfirmDelete}>Confirm</button>
    </div>
  );
};

export default DeleteConfirmationPopup;