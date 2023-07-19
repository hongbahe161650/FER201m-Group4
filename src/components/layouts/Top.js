import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBarsProgress,
  faFilePen,
  faHome,
  faLineChart,
  faListSquares,
  faPeopleRoof,
  faSearch,
  faShoppingBag,
  faShoppingCart,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/DefaultLayoutStyle.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./LayoutsStyle.css";
import ToastComponent from "../Custom/Toast";

export default function Top() {
  const [user, setUser] = useState();
  const [searchParams, setSearchParams] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const handleToggleToast = () => {
    setShowToast(!showToast);
  };
  useEffect(() => {
    fetch("http://localhost:9999/api/products")
      .then((res) => res.json())

      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setUser(JSON.parse(localStorage.getItem("UserID")));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("UserID");
    setUser();
    redirect("/home");
  };
  const handleSearch = () => {
    function filterProductsByName(searchName) {
      if (searchName) {
        return products.filter((product) =>
          product.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              searchName
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
        );
      }
      return products;
    }
    if (!searchParams) {
      handleToggleToast();
      return;
    }
    const searchResult = filterProductsByName(searchParams);
    
    navigate("/search", { state: { searchResult, searchParams } });
  };


  return (
    <div>
      <ToastComponent
        message="Từ khóa phải nhiều hơn 1 ký tự"
        showToast={showToast}
        handleCloseToast={handleToggleToast}
      />

      <Nav
        className="bg-body-tertiary sticky-nav"
        justify="true"
        fill="true"
        style={{
          justifyContent: "space-around",
          padding: "10px 0 10px",
          backgroundColor: "white !important",
          borderBottom: "1px solid black",
        }}
        expand="lg"
      >
        <Container style={{ display: "contents" }}>
          <Link to="/home" style={{ color: "black" }}>
            <FontAwesomeIcon icon={faHome} />
            <span className="nav-link-text product-list-header">Home</span>
          </Link>
          <Link to="/ao" style={{ color: "black" }}>
            <span className="nav-link-text product-list-header">ÁO</span>
          </Link>
          <Link to="/quan" style={{ color: "black" }}>
            <span className="nav-link-text product-list-header">QUẦN</span>
          </Link>
          <Link to="/phukien" style={{ color: "black" }}>
            <span className="nav-link-text product-list-header">PHỤ KIỆN</span>
          </Link>
          <div className="searchTop">
            <div className="input-width-button" style={{ display: "flex" }}>
              <input
                type="text"
                id="keyword"
                className="form-control toggle-search"
                placeholder="Tìm kiếm"
                style={{ height: "32px" }}
                onChange={(e) => {
                  setSearchParams(e.target.value);
                }}
              />
              <button
                style={{
                  border: "none",
                  backgroundColor: "#F8F9FA",
                  marginLeft: "4px",
                }}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ cursor: "pointer", width: "20", height: "auto" }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = 0.5;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = 1;
                  }}
                  onClick={() => {
                    handleSearch();
                  }}
                />
              </button>
            </div>
          </div>

          {user ? (
            user.isAdmin ? (
              <div style={{ display: "flex" }}>
                <div className="dropdown">
                  <div
                    className="dropdown-toggle"
                    id="dropdownMenuButton"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                    style={{ fontWeight: "500", fontSize: "large" }}
                  >
                    {user.username}
                  </div>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                    style={{
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                      textAlign: "center",
                      borderColor: "white",
                      width: "181px",
                    }}
                  >
                    <li>
                      <FontAwesomeIcon icon={faLineChart} />
                      <Link to="/dashboard" style={{ color: "black" }}>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faFilePen} />
                      <Link to="/product-manage" style={{ color: "black" }}>
                        Quản lí sản phẩm
                      </Link>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faBarsProgress} />
                      <Link to="/order-manage" style={{ color: "black" }}>
                        Quản lí đơn hàng
                      </Link>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faPeopleRoof} />
                      <Link to="/user-manage" style={{ color: "black" }}>
                        Quản lí người dùng
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        onClick={() => {
                          handleLogout();
                        }}
                        style={{ color: "black" }}
                      >
                        <FontAwesomeIcon icon={faSignOut} />
                        <span className="nav-link-text">Đăng xuất</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <div className="dropdown">
                  <div
                    className="dropdown-toggle"
                    id="dropdownMenuButton"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                    style={{ fontWeight: "500", fontSize: "large" }}
                  >
                    {user.username}
                  </div>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                    style={{
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                      textAlign: "center",
                      borderColor: "white",
                    }}
                  >
                    <li>
                      <Link to="/cart" style={{ color: "black" }}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span className="nav-link-text"> Giỏ hàng</span>
                      </Link>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faShoppingBag} />
                      <Link to="/order" style={{ color: "black" }}>
                        {" "}
                        Order
                      </Link>
                    </li>
                    <li style={{ color: "black" }}>
                      <Link to="/view-order" style={{ color: "black" }}>
                        <FontAwesomeIcon icon={faListSquares} />
                        <span className="nav-link-text"> View Order</span>
                      </Link>
                    </li>
                    <li style={{ color: "black" }}>
                      <Link to="/profile" style={{ color: "black" }}>
                        <FontAwesomeIcon icon={faUser} />
                        <span className="nav-link-text"> Người dùng</span>
                      </Link>
                    </li>
                    <li style={{ color: "black" }}>
                      <Link
                        to="/"
                        onClick={() => {
                          handleLogout();
                        }}
                        style={{ color: "black" }}
                      >
                        <FontAwesomeIcon icon={faSignOut} />
                        <span className="nav-link-text"> Đăng xuất</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )
          ) : (
            <div style={{ display: "flex" }}>
              <Link to="/cart" style={{ color: "black", marginRight: "15px" }}>
                <FontAwesomeIcon icon={faShoppingCart} />
                <span className="nav-link-text">Giỏ hàng</span>
              </Link>
              <Link to="/login" style={{ color: "black" }}>
                <span className="nav-link-text">Đăng nhập</span>
              </Link>
            </div>
          )}
        </Container>
      </Nav>
    </div>
  );
}
