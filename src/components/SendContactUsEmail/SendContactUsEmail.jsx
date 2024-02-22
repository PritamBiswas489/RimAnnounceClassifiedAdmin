import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { sendContactUsEmailProcess } from "services/admin.service";

const SendContactUsEmail = ({ show, handleClose, row }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if(!row?.contactUsUser?.email){
        alert("Email address not available")
        return;
    }
    let response = await sendContactUsEmailProcess({
      name : row?.contactUsUser?.name,
      email:row?.contactUsUser?.email,
      subject,
      message,
    });
    if (response?.data?.status === 200) {
      alert('Message successfully send');
      handleClose();
    } else {
      alert(response?.data.error?.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Message reply</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Subject:</strong>&nbsp;{row.subject}</p>
        <p><strong>Message:</strong>&nbsp;{row.message}</p>
        <p><strong>From:</strong>&nbsp;{row?.contactUsUser?.name}</p>
        <p><strong>Email:</strong>&nbsp;{row?.contactUsUser?.email}</p>
        <p><strong>Phone:</strong>&nbsp;{row?.contactUsUser?.phoneCountryCode+row?.contactUsUser?.phone}</p>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <label>Message</label>
            <Form.Control
              cols="80"
              defaultValue={message}
              onInput={(e) => setMessage(e.target.value)}
              rows="4"
              as="textarea"
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Send message
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SendContactUsEmail;
