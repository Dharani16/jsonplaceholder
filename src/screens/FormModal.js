import React, { useState } from 'react';
import { Button, Container, Row, Col, Modal, Form } from "react-bootstrap";
import "../styles/style.css";
import { addNewPost } from '../services/apiServices';

function FormModal({ isModalVisible, hideModal }) {

  const [form, setForm] = useState({})

  const handleSubmit = event => {
    console.log("Event submtt :>>", form);
    event.preventDefault();
    addNewPost(form).then((data) => {
      console.log("After response :>>", data);
      if (data) {
        alert("Successfully, added data !!")
      } else {
        alert("Failed to add data !!")
      }
    });
    hideModal();
  };

  /* Dynamically create state variable for form field */
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
  }

  /* Render Form component */
  const renderForm = () => {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Control
            type="text"
            placeholder="Enter the title"
            onChange={e => setField('title', e.target.value)}
            required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBody">
          <Form.Control
            type="text"
            placeholder="Enter the body"
            onChange={e => setField('body', e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUserId">
          <Form.Control
            type="number"
            placeholder="Enter the user id"
            onChange={e => setField('userId', e.target.value)} />
        </Form.Group>
      </Form>
    )
  }

  return (
    <>
      <Modal show={isModalVisible} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>{`Create new post`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderForm()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default FormModal;