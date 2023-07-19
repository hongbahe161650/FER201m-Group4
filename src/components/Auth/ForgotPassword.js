import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import emailjs from "@emailjs/browser";
import "./AuthStyle.css";
import { Link } from "react-router-dom";
import Top from "../layouts/Top";
import ToastComponent from "../Custom/Toast";
const ForgotPassword =  () => {
  const [users, setUsers] = useState();
  const [email, setEmail] = useState("");
  const [forgotPasswordLink, setForgotPasswordLink] = useState("");
  const [forgot_password,setForgot_password] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const handleToggleToast = () => {
    setShowToast(!showToast);
  };
  
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:9999/api/users").then((res) => res.json()),
      fetch("http://localhost:9999/api/forgot_password").then((res) => res.json()),
    ])
      .then(([usersData, forgotPasswordData]) => {
        setForgot_password(forgotPasswordData)
        setUsers(usersData);
      })
      .catch((err) => {
        console.log(err.message);
      });

      //Tạo API Token
    const currentPort = window.location.origin;
    const apiToken = uuidv4();
    let AT = `${currentPort}/reset-password?AT=${apiToken}`;
    setForgotPasswordLink(AT);
  }, []);


  const submitForgotPasswordHandler = async (e) => {
    e.preventDefault();
    let flag = true;
    users.map((user) => {
      //kiem tra email co ton tai khong
      if (user.email == email) {
        //take time
        const currentTime = new Date();
        const futureTime = new Date(currentTime.getTime() + 5 * 60000);
        //get fotgotpassword DB
        const forgotpassDb = [...forgot_password];
        if (!forgotpassDb) {
          const array = [];
          array.push({ forgotPasswordLink, email, expireTime: futureTime });
          fetch('http://localhost:9999/api/forgot_password', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(array)
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          let flag = true;
          //neu da co email trong he thong
          forgotpassDb.map((item) => {
            if (item.email == email) {
              item.forgotPasswordLink = forgotPasswordLink;
              item.futureTime = futureTime;
              flag = false;
            }
          });

          //neu chua co email trong he thong forgot password link
          if (flag) {
            forgotpassDb.push({
              forgotPasswordLink,
              email,
              expireTime: futureTime,
            });
          }

          fetch('http://localhost:9999/api/forgot_password', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(forgotpassDb)
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.error(error);
            });
        }
        flag = false;
        document.getElementById("messageError").innerText = `PROCESSING`;
        console.log(e.target);
        emailjs
          .send(
            "service_6hf9oen",
            "template_mfaah4i",
            {
              user_email: email,
              forgot_pass_link: forgotPasswordLink,
            },
            "dlvwrhueyphVOHUf6"
          )
          .then(
            (result) => {
              handleToggleToast();
              document.getElementById("messageError").innerText = `Successfully`;
              setTimeout(() => {
                return;
              }, 3000);
            },
            (error) => {
              document.getElementById("messageError").innerText = "Email Error";
              console.log(error.text);
            }
          );
      }
    });
    if (flag) {
      document.getElementById(
        "messageError"
      ).innerText = `Email doesn't exists`;
    }
  };

  return (
    <div>
      <Top />
      <ToastComponent
        message="Successfully,please check your email address"
        showToast={showToast}
        handleCloseToast={handleToggleToast}
      />
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={submitForgotPasswordHandler}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Forgot password</h3>
            <div className="text-center">
              Already registered?
              <Link to="/login" style={{paddingLeft:'6px'}}>
                <span className="link-primary">Sign In</span>
              </Link>
            </div>
            <p style={{ color: "red" }} id="messageError"></p>
            <div className="form-group mt-3">
              <label>Email address </label>
              <input
                type="email"
                value={email}
                className="form-control mt-1"
                onChange={(e) => setEmail(e.target.value)}
                name="user_email"
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
