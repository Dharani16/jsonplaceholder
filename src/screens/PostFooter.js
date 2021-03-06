import React, { useState } from 'react';
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { deletePost, updatePost } from '../services/apiServices';
import "../styles/style.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import FormModal from './FormModal';

function PostFooter({ data, activeToast, selectedPostItemEvent }) {
  const [isViewPost, setViewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);

  const renderViewModal = (postItem) => {
    setViewPost(true);
    setSelectedPost(postItem);
  };

  const handleClose = () => setViewPost(false);
  const hideModal = () => setModalVisible(false);

  const deleteEvent = (item) => {
    selectedPostItemEvent(item);
    deletePost(item).then((data) => {
      if (data && data.ok && data.status === 200) {
        activeToast(true);
      }
    });
  }

  const updateEvent = (item) => {
    setModalVisible(true);
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
      {isModalVisible ?
        <FormModal
          isModalVisible={isModalVisible}
          hideModal={hideModal}
          isNewForm={false}
          data={data} /> : null}

      <div className='footer'>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-top`}>View the post</Tooltip>}>
          <span onClick={() => renderViewModal(data)} className='viewStyle'>
            <FaEye />
          </span>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-top`}>Edit the post</Tooltip>}>
          <span onClick={() => updateEvent(data)} className='viewStyle'>
            <FaEdit />
          </span>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-top`}>Delete the post</Tooltip>}>
          <span onClick={() => deleteEvent(data)} className='viewStyle'>
            <FaTrash />
          </span>
        </OverlayTrigger>
        {renderModal()}
      </div>
    </>
  );
}
export default PostFooter;
