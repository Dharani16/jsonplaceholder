import React, { useState } from 'react';
import { Button, Container, Row, Col, Modal, Form } from "react-bootstrap";
import "../styles/style.css";
import { addNewPost } from '../services/apiServices';

function NewPosts() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({})

  const newPostEvent = () => {
    console.log("Add new posts");
    setModalVisible(true);
  }

  const handleSubmit = event => {
    // console.log("Event submtt :>>", form);
    event.preventDefault();
    addNewPost(form).then((data) => {
      if (data && Object.keys(data).length) {
        alert("Successfully, added data !!")
      } else {
        alert("Failed to add data !!")
      }
    });
    hideModal();
  };

  const hideModal = () => setModalVisible(false);

  /* Dynamically create state variable for form field */
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
  }
  const renderForm = () => {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Control
            type="text"
            placeholder="Enter the title"
            onChange={e => setField('title', e.target.value)} />
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
  /* Render modal component */
  const renderModal = () => {
    return (
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
    )
  }
  return (
    <Container>
      {isModalVisible ? renderModal() : null}
      <Row>
        <Col sm={8}></Col>
        <Col sm={4}>
          <div className='newPostBtnContainer'>
            <Button
              variant="primary"
              onClick={newPostEvent}>
              Add New post
            </Button>{' '}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default NewPosts;
