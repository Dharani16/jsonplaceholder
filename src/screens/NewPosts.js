import React, { useState } from 'react';
import { Button, Container, Row, Col } from "react-bootstrap";
import "../styles/style.css";
import FormModal from './FormModal';

function NewPosts() {
  const [isModalVisible, setModalVisible] = useState(false);

  const hideModal = () => setModalVisible(false);
  const newPostEvent = () => setModalVisible(true);

  return (
    <Container>
      {isModalVisible ?
        <FormModal
          isModalVisible={isModalVisible}
          hideModal={hideModal}
          isNewForm={true} /> : null}
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
