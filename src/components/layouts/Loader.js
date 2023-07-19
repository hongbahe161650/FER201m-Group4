import { Spinner } from 'react-bootstrap';
import React from 'react';

const Loader = ({ color = 'blue' }) => {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Spinner animation="border" variant={color} />
    </div>
  );
};

export default Loader;
