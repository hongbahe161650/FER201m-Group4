import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import ToastComponent from "../Custom/Toast";
const CryptoJS = require("crypto-js");

function ChangePassword({ userParams, changePassMode, handleToggleToast1 }) {
  const [user, setUser] = useState(userParams);
  const [matching, setMatching] = useState(false);
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch("http://localhost:9999/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handleToggleToast = () => {
    setShowToast(!showToast);
  };
  const Validate = () => {
    const REGEX_PASSWORD = /^.{8,}$/;

    if (!REGEX_PASSWORD.test(password2)) {
      setMessage("Password must be at least 8 characters long");
      return false;
    }

    return true;
  };
  const handleButtonClick = () => {
    if (matching) {
      const result = window.confirm(
        "Are you sure you want to change your password"
      );
      const current_password =
        document.getElementById("current_password").value;
      if (
        result &&
        matching &&
        CryptoJS.MD5(current_password).toString() === user.password
      ) {
        if (!Validate()) {
          handleToggleToast();
          return;
        }
        user.password = CryptoJS.MD5(password).toString();
        const updatedUsers = users.map((item) => {
          if (item.id == user.id) {
            return user;
          }
          return item;
        });
        fetch("http://localhost:9999/api/users", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUsers),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
        localStorage.setItem("UserID", JSON.stringify(user));
        changePassMode();
        handleToggleToast1();
      } else {
        setMessage("Please try again");
        handleToggleToast();
      }
    } else {
      setMessage("Not matching can't change password");
      handleToggleToast();
    }
  };

  const handleConfirmPasswordChange = () => {
    if (password2 === password) {
      document.getElementById("message").style.color = "green";
      document.getElementById("message").innerHTML = "Matching";
      setMatching(true);
    } else {
      document.getElementById("message").style.color = "red";
      document.getElementById("message").innerHTML = "Not matching";
      setMatching(false);
    }
  };

  return (
    <Container
      className="bootstrap snippets bootdey border-0"
      style={{ marginTop: "20px" }}
    >
      <ToastComponent
        message={message}
        showToast={showToast}
        handleCloseToast={handleToggleToast}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className="text-primary">Change Password</h1>
        <Button
          variant="primary"
          onClick={() => {
            changePassMode();
          }}
        >
          Return
        </Button>
      </div>
      <hr />
      <Row>
        <Col md={3}>
          <Card.Body>
            <img
              src="https://img3.thuthuatphanmem.vn/uploads/2019/10/10/anh-avatar-doremon_033145784.png"
              className="avatar img-circle img-thumbnail"
              alt="avatar"
            />
          </Card.Body>
        </Col>
        <Col md={9} className="personal-info ">
          <h3>Change Password</h3>
          <Form>
            <Form.Group as={Row} className="change-pass-input">
              <Form.Label column lg={3} className="control-label">
                Password:
              </Form.Label>
              <Col lg={8}>
                <Form.Control
                  required
                  placeholder="Password(*)"
                  type="password"
                  name="password"
                  id="current_password"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="change-pass-input">
              <Form.Label column lg={3} className="control-label">
                New Password:
              </Form.Label>
              <Col lg={8}>
                <Form.Control
                  id="newpass"
                  required
                  placeholder="Enter New Password(*)"
                  type="password"
                  name="newpass"
                  onKeyUp={handleConfirmPasswordChange}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="change-pass-input">
              <Form.Label column lg={3} className="control-label">
                Confirm Password:
              </Form.Label>
              <Col lg={8}>
                <Form.Control
                  id="newpass2"
                  onKeyUp={handleConfirmPasswordChange}
                  required
                  placeholder="Confirm New Password(*)"
                  type="password"
                  name="newpass2"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <div>
        <p style={{ marginLeft: "300px" }} id="message"></p>
      </div>
      <div style={{ marginLeft: "300px", color: "red" }}></div>
      <div className="form-group" style={{ textAlign: "center" }}>
        <Button onClick={() => handleButtonClick()} variant="success">
          Save
        </Button>
      </div>
    </Container>
  );
}

export default ChangePassword;
