import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./AuthStyle.css";
import Top from "../layouts/Top";
const CryptoJS = require("crypto-js");

const Register = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch('http://localhost:9999/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigate();

  const Validate = () => {
    const REGEX_PHONE = /^\d{10}$/;
    const REGEX_PASSWORD = /^.{8,}$/;
    const REGEX_NAME = /^[\p{L} ]+$/u;
    const REGEX_ADDRESS = /^[\p{L}\d\s,.#-]{5,}$/u;

    if (!REGEX_PASSWORD.test(password)) {
      setErrorMessage("Password must be at least 8 characters long");
      return false;
    }
    if(!REGEX_NAME.test(username)) {
      setErrorMessage(
        "Name must be at least 2 characters long and contain only letters and spaces."
      );
      return false;
    }
    if(!REGEX_ADDRESS.test(address)) {
      setErrorMessage(
        "Address must be at least 5 characters long and can contain letters, numbers, spaces, commas, dots, hashes, and hyphens."
      );
      return false;
    }
    if (!REGEX_PHONE.test(phone)) {
      setErrorMessage(
        "Invalid phone number. Please enter a 10-digit phone number."
      );
      return false;
    }
    setErrorMessage("");
    return true;
  };
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const validator = Validate();

    const newUser = {
      id: users.length + 1,
      username: username,
      password: CryptoJS.MD5(password).toString(),
      email: email,
      address: address,
      phone: phone,
      isAdmin: false,
      isActive: true
    };
    const userExists = users.find((user) => user.email === newUser.email);
    if (email === "" || password === "") {
      setErrorMessage("Email field or password is required");
      return;
    } else if (userExists) {
      setErrorMessage("Email exists");
      return navigation("/register");
    } else if(!validator){
      return;
    } else {
      users.push(newUser);
      //POST
      fetch('http://localhost:9999/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(users)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
      return navigation("/login");
    }
  };

  return (
    <div>
      <Top />
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmitRegister}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Register</h3>
            <div className="text-center">
              Already registered?
              <Link to="/login">
                <span className="link-primary">Sign In</span>
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Email address </label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email address "
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Fullname"
                className="form-control mt-1"
                name="fullName"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Address</label>
              <input
                type="text"
                placeholder="Address"
                className="form-control mt-1"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Phone"
                className="form-control mt-1"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {errorMessage && (
        <div className="error-message" style={{color:'red'}}>
          {errorMessage}
        </div>
      )}

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              <Link to="/forgot-password">
                <span>Forgot password?</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
