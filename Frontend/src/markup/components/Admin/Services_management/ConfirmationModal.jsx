// src/components/ConfirmationModal.js
import React from "react";
import Modal from "react-modal";
import "./ConfirmationModal.css";

Modal.setAppElement("#root"); // Ensure proper accessibility

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      className="confirmation-modal"
      overlayClassName="confirmation-overlay"
    >
      <h2>Confirmation</h2>
      <p>{message}</p>
      <div className="modal-buttons">
        <button onClick={onConfirm} className="confirm-button">
          Confirm
        </button>
        <button onClick={onRequestClose} className="cancel-button">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
