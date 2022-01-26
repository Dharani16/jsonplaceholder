import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import { deletePost, updatePost } from '../services/apiServices';
import "../styles/style.css";

function PostFooter({ data, activeToast, selectedPostItemEvent }) {
  const [isViewPost, setViewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const renderViewModal = (postItem) => {
    setViewPost(true);
    setSelectedPost(postItem);
  };

  const handleClose = () => setViewPost(false);

  const deleteEvent = (item) => {
    selectedPostItemEvent(item);
    deletePost(item).then((data) => {
      if (data && data.ok && data.status === 200) {
        activeToast(true);
      }
    });
  }

  const updateEvent = (item) => {
    console.log("update event :>>", item);
    // updatePost(item).then((data) => {
    //   console.log("Update response component :>>", data);
    // });
  }

  /* Renders modal component */
  const renderModal = () => {
    const { title, body } = selectedPost;
    return (
      <Modal show={isViewPost} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
      </Modal>
    )
  }

  return (
    <>
      <div className='footer'>
        <span onClick={() => renderViewModal(data)} className='viewStyle'>
          <p>View</p>
        </span>
        <span onClick={() => updateEvent(data)} className='viewStyle'>
          <p>Update</p>
        </span>
        <span onClick={() => deleteEvent(data)} className='viewStyle'>
          <p>Delete</p>
        </span>
        {renderModal()}
      </div>
    </>
  );
}
export default PostFooter;
