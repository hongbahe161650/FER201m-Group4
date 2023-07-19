import { Button, Offcanvas } from "bootstrap";
import { useState } from "react";
import '../styles/DefaultLayoutStyle.css'

const OffCanvasCart = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2"></Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll="false"
        backdrop="true"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default OffCanvasCart;
