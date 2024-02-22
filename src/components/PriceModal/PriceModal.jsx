import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PriceModal = ({ show, handleClose, submitPrice, row }) => {
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    if(isNaN(parseFloat(price))){
        alert("Enter correct price")
        return
    }
    submitPrice(price)
    handleClose()
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Recharge Price for user <strong>{row.name}</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PriceModal;
