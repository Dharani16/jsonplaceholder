import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import "../styles/style.css";
import { addNewPost, updatePost } from '../services/apiServices';

function FormModal({ isModalVisible, hideModal, isNewForm, data = {} }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (!isNewForm) {
      setTitle(data.title);
      setBody(data.body);
      setUserId(data.userId);
    }
  }, [])

  const handleSubmit = event => {
    let formObj = {
      title: title,
      body: body,
      userId: userId
    }
    event.preventDefault();
    if (isNewForm) {
      addNewPost(formObj).then((data) => {
        data ? alert("Successfully, added data !!") : alert("Failed to add data !!");
      });
    } else {
      updatePost(formObj).then((data) => {
        data ? alert("Updated data !!") : alert("Failed to update data !!");
      });
    }
    hideModal();
  };

  /* Render Form component */
  const renderForm = () => {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Control
            type="text"
            placeholder="Enter the title"
            onChange={e => setTitle(e.target.value)}
            value={title} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBody">
          <Form.Control
            type="text"
            placeholder="Enter the body"
            onChange={e => setBody(e.target.value)}
            value={body} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUserId">
          <Form.Control
            type="number"
            placeholder="Enter the user id"
            onChange={e => setUserId(e.target.value)}
            value={userId} />
        </Form.Group>
      </Form>
    )
  }

  return (
    <>
      <Modal show={isModalVisible} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>
            {isNewForm ? `Create new post` : `Update the post`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderForm()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isNewForm ? 'Submit' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default FormModal;