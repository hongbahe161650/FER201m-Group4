import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./AuthStyle.css";
import Top from "../layouts/Top";

const CryptoJS = require("crypto-js");
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let flag = false;
  const navigation = useNavigate();
  const [userData, setUserData] = useState();

  useEffect(() => {
    fetch('http://localhost:9999/api/users')
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
  }, []);
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      flag = true;
      const messusername = document.getElementById("mess-username");
      messusername.innerText = email === "" ? "Email không được để trống" : "";
      messusername.style.color = "red";

      const messpassword = document.getElementById("mess-password");
      messpassword.innerText =
        password === "" ? "Mật khẩu không được để trống" : "";
      messpassword.style.color = "red";
    } else {
      const user = userData.find(
        (u) =>
          u.email == email && u.password == CryptoJS.MD5(password).toString()
      );
      if (user) {
        if(user.isActive == true){
          localStorage.setItem("UserID", JSON.stringify(user));
          if(user.isAdmin == true){
            navigation('/dashboard');
            return;
          }
          navigation("/home");
          return;
        }
        const mess = document.getElementById("mess");
        mess.innerText =  "Tài khoản không có hiệu lực";
        mess.style.color = "red";
      } else {
        const a = !user && !flag;
        const mess = document.getElementById("mess");
        mess.innerText = a ? "Email hoặc mật khẩu không đúng" : "";
        mess.style.color = "red";
      }
    }
  };

  return (
    <div>
      <Top />
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleLogin}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?
              <Link to="/register" style={{ fontWeight: "600" }}>
                <span> Sign Up</span>
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p id="mess"></p>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              <Link to="/forgot-password">
                <span style={{ fontWeight: "600" }}>Forgot password?</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
