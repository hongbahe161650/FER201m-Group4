import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Dropdown from 'react-bootstrap/Dropdown';
import "../styles/Top.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMagnifyingGlass,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/DefaultLayoutStyle.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Blue Organic Fashion Brand Logo.png"
export default function Top() {
  const navigate = useNavigate()
  return (
    <div className="container top">
      <div className="row">
        <Nav className="me-auto">
          <Link to="/home">
            <img src={logo} />
          </Link>
          <Nav.Link >
            <ul>
              <li >
                <button className="ao"> Áo </button>
                <ul className="aoMenu">
                  <li ><Link to="/Áo Sơ Mi">
                     Áo sơ mi
                  </Link></li>
                  <li>Áo Polo</li>
                  <li>Áo T-Shirt</li>
                  <li>Áo Khoác</li>

                </ul>
              </li>



            </ul>
            <ul>
              <li>
                <button className="quan"> Quần </button>
                <ul className="aoMenu">
                  <li>Quần dài</li>
                  <li>Quần đùi</li>
                  <li>Quần Kaki</li>
                  <li>Quần thể thao</li>

                </ul>
              </li>
            </ul>
            <ul>
              <li>
                <button className="phukien"> Phụ Kiện</button>
                <ul className="aoMenu">
                  <li>Giày</li>
                  <li>Ví</li>
                  <li>Cặp</li>
                  <li>Da</li>

                </ul>
              </li>
            </ul>
            <ul>
              <li>
                <button className="quan">Bộ sưu tập </button>
                <ul className="aoMenu">
                  <li>Boxer </li>
                  <li>Brief </li>


                </ul>
              </li>
            </ul>
            <ul>
              <li>
                <button className="outletStore" > Outlet store</button>
                <ul className="aoMenu">
                  <li>Áo sơ mi</li>
                  <li>Tank Top</li>
                  <li>T-Shirt</li>


                </ul>
              </li>
            </ul>








          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />


          </Nav.Link>
          <Nav.Link onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faShoppingCart} />


          </Nav.Link>
          <Nav.Link onClick={() => navigate("/login")}>
            <FontAwesomeIcon icon={faUser} />
            <span className="nav-link-text">Đăng nhập</span>
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
}
