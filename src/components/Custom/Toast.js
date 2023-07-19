import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

const ToastComponent = ({ showToast, handleCloseToast ,message}) => {

  return (
    <div>
    <ToastContainer position="middle-end">
      <Toast show={showToast} onClose={handleCloseToast}  delay={2000} autohide bg="dark">
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body className='text-white'>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  </div>
  );
};

export default ToastComponent;
