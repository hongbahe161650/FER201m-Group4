import React from "react";
<<<<<<< HEAD
import { Container, Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
=======
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
>>>>>>> 1da8130ca209d89722ac281df640106058d92e8b
import "../styles/DefaultLayoutStyle.css";

export default function Top() {
  return (
<<<<<<< HEAD
    <div className="custom-header">
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">
                <FontAwesomeIcon icon={faHome} />
                <span className="nav-link-text">Home</span>
              </Nav.Link>
              <Nav.Link href="/ao">
                <span className="nav-link-text">Áo</span>
              </Nav.Link>
              <Nav.Link href="/quan">
                <span className="nav-link-text">Quần</span>
              </Nav.Link>
              <Nav.Link href="/phukien">
                <span className="nav-link-text">Phụ Kiện</span>
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link href="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
                <span className="nav-link-text">Giỏ hàng</span>
              </Nav.Link>
              <Nav.Link href="/login">
                <FontAwesomeIcon icon={faUser} />
                <span className="nav-link-text">Đăng nhập</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
=======
    <div className="container top">
      <div className="row">
        <Nav className="me-auto">
          <Nav.Link href="/home">
            <FontAwesomeIcon icon={faHome} />
            <span className="nav-link-text">Home</span>
          </Nav.Link>
          <Nav.Link href="/ao">
            <span className="nav-link-text">Áo</span>
          </Nav.Link>
          <Nav.Link href="/quan">
            <span className="nav-link-text">Quần</span>
          </Nav.Link>
          <Nav.Link href="/phukien">
            <span className="nav-link-text">Phụ Kiện</span>
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link href="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="nav-link-text">Giỏ hàng</span>
          </Nav.Link>
          <Nav.Link href="/login">
            <FontAwesomeIcon icon={faUser} />
            <span className="nav-link-text">Đăng nhập</span>
          </Nav.Link>
        </Nav>
      </div>
>>>>>>> 1da8130ca209d89722ac281df640106058d92e8b
    </div>
  );
}
