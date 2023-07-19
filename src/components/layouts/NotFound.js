import { Button, Col, Container, Row } from "react-bootstrap";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="container border-0" style={{ height: "90vh" }}>
      <Row className="justify-content-center align-items-center" style={{ height: "100%" }}>
        <Col
         xs="auto">
          <ExclamationCircleFill size={"5rem"} />
          <h1 style={{paddingBottom:'30px'}}>(404) Không tìm thấy trang</h1>
          <Link to="/">
            <Button variant="outline-dark">Trở lại trang chủ</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default NotFound;
