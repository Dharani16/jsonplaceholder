import React, { useEffect, useState } from 'react';
import { getAllPosts, deletePost } from '../services/apiServices';
import { Card, Modal, Toast, Button, ToastContainer } from "react-bootstrap";
import "../styles/style.css";
import PostFooter from './PostFooter';

export default function GetPosts() {

  const [posts, setPosts] = useState([]);
  const [isToast, setToast] = useState(false);
  const [selectedPostItem, setSelectedPostItem] = useState({});

  useEffect(() => {
    getAllPosts().then((postsData) => setPosts(postsData));
  }, [])

  const activeToastEvent = (isActive) => setToast(isActive);
  const selectedPostItemEvent = (item) => setSelectedPostItem(item);

  /* Renders post item */
  const renderPostsItem = (item, idx) => {
    return (
      <Card key={idx} style={{ width: '18rem', }} className="box">
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.body}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <PostFooter
            data={item}
            activeToast={activeToastEvent}
            selectedPostItemEvent={selectedPostItemEvent} />
        </Card.Footer>
      </Card>
    )
  }

  /* Renders toast component */
  const renderToast = () => {
    return (
      <div className='toastContainer'>
        <ToastContainer position='top-end'>
          <Toast
            onClose={() => setToast(false)}
            show={isToast} delay={3000} autohide
            bg='success'>
            <Toast.Body className='text-white'>
              {`Deleted "${selectedPostItem.title}" post!`}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    )
  }

  return (
    <div>
      {isToast ? renderToast() : null}
      <div className='grid'>
        {posts && Array.isArray(posts) && posts.length ?
          posts.map((item, idx) => renderPostsItem(item, idx)) :
          <h3>No data available</h3>}
      </div>
    </div>
  );
}
