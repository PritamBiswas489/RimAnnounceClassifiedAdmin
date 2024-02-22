import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateSubLocation } from 'services/admin.service';

const EditSubLocationModal = ({reload, show, handleClose, row }) => {   
  const [name, setName] = useState(row?.name); 
  const [frName, setFrName] = useState(row?.frName);   
  const [arName, setArName] = useState(row?.arName);   
  
  const handleSubmit = async () => {
    let response = await updateSubLocation({
      id:row?.id,  name, frName, arName
    });
    if (response?.data?.status === 200) {
        reload()
        handleClose()
    } else {
      alert(response?.data.error?.message);
    }

    
  };
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit category <strong>"{row.name}"</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group controlId="name">
            <Form.Label>English name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter english name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="frname">
            <Form.Label>French name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter french name"
              value={frName}
              onChange={(e) => setFrName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="arname">
            <Form.Label>Arabic name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter arabic name"
              value={arName}
              onChange={(e) => setArName(e.target.value)}
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

export default EditSubLocationModal;
