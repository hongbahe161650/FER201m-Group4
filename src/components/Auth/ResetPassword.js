import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotFound from "../layouts/NotFound";
import "./AuthStyle.css";
import Loader from "../layouts/Loader";

const ResetPassword = () => {
  const [users, setUsers] = useState();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const CryptoJS = require("crypto-js");
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:9999/api/users").then((res) => res.json()),
      fetch("http://localhost:9999/api/forgot_password").then((res) =>
        res.json()
      ),
    ])
      .then(([usersData, forgotPasswordData]) => {
        setUsers(usersData);
        //tim xem dia chi href cua ng dung hien tai co turng voi href forgot password luwu trong db khong
        forgotPasswordData.map((item) => {
          if (item.forgotPasswordLink == window.location.href) {
            setUser(item);
          }
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);
  const Validate = () => {
    const REGEX_PASSWORD = /^.{8,}$/;

    if (!REGEX_PASSWORD.test(password1)) {
      setErrorMessage("Password must be at least 8 characters long");
      return false;
    }
    setErrorMessage("");
    return true;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const validator = Validate();
    if (!validator) {
      return;
    }
    if (password1 == password2 && password1 != "") {
      setUsers(
        users.map((item) => {
          if (item.email == user.email) {
            item.password = CryptoJS.MD5(password2).toString();
            return item;
          }
          return item;
        })
      );
      fetch("http://localhost:9999/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
      navigation("/login");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : user ? (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={submitHandler}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Reset password</h3>
              <p style={{ color: "red" }} id="messageError"></p>
              <div className="form-group mt-3">
                <label>Nhập mật khẩu mới</label>
                <input
                  className="form-control mt-1"
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Nhập lại mật khẩu</label>
                <input
                  className="form-control mt-1"
                  type="password"
                  value={password2}
                  onChange={(e) => {
                    if (password1 != e.target.value) {
                      document.getElementById("messageError").innerText =
                        "passwords do not match";
                    } else {
                      document.getElementById("messageError").innerText = "";
                    }
                    setPassword2(e.target.value);
                  }}
                  required
                />
              </div>
              {errorMessage && (
                <div className="error-message" style={{ color: "red" }}>
                  {errorMessage}
                </div>
              )}
              <div className="d-grid gap-2 mt-5">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ResetPassword;
