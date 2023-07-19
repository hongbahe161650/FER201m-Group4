import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function EditProfile({ userParams, changeAuthMode, handleToggleToast }) {
  const [user, setUser] = useState(userParams);
  const [errorMessage, setErrorMessage] = useState("");
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
  const Validate = () => {
    const REGEX_PHONE = /^\d{10}$/;
    const REGEX_NAME = /^[\p{L} ]+$/u;
    const REGEX_ADDRESS = /^[\p{L}\d\s,.#-]{5,}$/u;
    const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!REGEX_EMAIL.test(user.email)) {
      setErrorMessage("Invalid email format.");
      return false;
    }

    if (!REGEX_PHONE.test(user.phone)) {
      setErrorMessage(
        "Invalid phone number. Please enter a 10-digit phone number."
      );
      return false;
    }
    if (!REGEX_NAME.test(user.username)) {
      setErrorMessage(
        "Name must be at least 2 characters long and contain only letters and spaces."
      );
      return false;
    }
    if (!REGEX_ADDRESS.test(user.address)) {
      setErrorMessage(
        "Address must be at least 5 characters long and can contain letters, numbers, spaces, commas, dots, hashes, and hyphens."
      );
      return false;
    }
    setErrorMessage("");
    return true;
  };
  const handleSubmit = () => {
    const validator = Validate();
    if (!validator) {
      return;
    }
    let result = window.confirm("Are you sure you want to edit this profile?");
    if (result) {
      localStorage.setItem("UserID", JSON.stringify(user));
      const updatedUsers = users.map((item) => {
        if (item.id === user.id) {
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
      changeAuthMode();
      handleToggleToast();
    }
  };
  return (
    <div
      className="container bootstrap snippets bootdey border-0"
      style={{ marginTop: "10px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className="text-primary">Edit Profile</h1>
        <Button
          variant="primary"
          onClick={() => {
            changeAuthMode();
          }}
        >
          Return
        </Button>
      </div>

      <hr />
      <div className="row">
        <div className="col-md-3">
          <div className="card-body">
            <img
              src="https://img3.thuthuatphanmem.vn/uploads/2019/10/10/anh-avatar-doremon_033145784.png"
              className="avatar img-circle img-thumbnail"
              alt="avatar"
            />
          </div>
        </div>
        <div className="col-md-9 personal-info">
          <h3>Personal info</h3>
          <div className="form-group">
            <label className="col-lg-3 control-label">Name:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                defaultValue={user.username}
                name="accountname"
                onChange={(e) => {
                  setUser((currentUser) => ({
                    ...currentUser,
                    username: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Email:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                defaultValue={user.email}
                name="accountemail"
                onChange={(e) => {
                  setUser((currentUser) => ({
                    ...currentUser,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Phone:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                defaultValue={user.phone}
                name="accountphone"
                onChange={(e) => {
                  setUser((currentUser) => ({
                    ...currentUser,
                    phone: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Address:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                defaultValue={user.address}
                name="accountaddress"
                onChange={(e) => {
                  setUser((currentUser) => ({
                    ...currentUser,
                    address: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className="error-message" style={{ color: "red" }}>
          {errorMessage}
        </div>
      )}

      <div className="form-group" style={{ textAlign: "center" }}>
        <input
          onClick={() => {
            handleSubmit();
          }}
          type="submit"
          value="Update"
          className="btn btn-success"
        />
      </div>
    </div>
  );
}

export default EditProfile;
