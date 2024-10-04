import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface GenericModalProps {
  show: boolean;
  title: string;
  handleClose: () => void;
  handleSave: () => void;
  children: React.ReactNode;
  btnFormId?: string;
  btnType?: 'button' | 'submit' | 'reset';
}

function GenericModal({
  show,
  title,
  handleClose,
  handleSave,
  children,
  btnFormId,
  btnType,
}: GenericModalProps) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        minHeight: 'calc(100vh - 60px)',
      }}>
      <Modal.Dialog
        style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            form={btnFormId}
            type={btnType}
            variant='primary'
            onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}

export default GenericModal;
