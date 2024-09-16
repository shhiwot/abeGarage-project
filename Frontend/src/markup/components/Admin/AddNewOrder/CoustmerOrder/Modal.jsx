// Modal.js
import React from 'react';
import './Modal.css'; // Make sure to update or create this CSS file

export default function Modal({ show, onClose, onConfirm, message }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Confirmation</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="modal-button cancel" onClick={onClose}>Cancel</button>
          <button className="modal-button confirm" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
