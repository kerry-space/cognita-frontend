import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface GenericModalProps {
  show: boolean;
  title: string;
  handleClose: () => void;
  handleSave: () => void;
  children: React.ReactNode;
}

function GenericModal({ show, title, handleClose, handleSave, children }: GenericModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GenericModal;