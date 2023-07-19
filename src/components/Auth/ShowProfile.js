import { Image } from "react-bootstrap";
import Top from "../layouts/Top";
import { useState } from "react";
import NotFound from "../layouts/NotFound";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import ToastComponent from "../Custom/Toast";

const ShowProfile = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("UserID"))
      ? JSON.parse(localStorage.getItem("UserID"))
      : []
  );
  const [authMode, setAuthMode] = useState("profile");
  const [passMode, setPassMode] = useState("profile");
  const [showToast, setShowToast] = useState(false);

  const handleToggleToast = () => {
    setShowToast(!showToast);
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "profile" ? "edit" : "profile");
    setUser(JSON.parse(localStorage.getItem("UserID")));
  };
  const changePassMode = () => {
    setPassMode(passMode === "profile" ? "changePass" : "profile");
    setUser(JSON.parse(localStorage.getItem("UserID")));
  };
  if (authMode === "edit") {
    return user.length !== 0 ? (
      <div>
        <Top />
        <EditProfile
          userParams={user}
          changeAuthMode={() => {
            changeAuthMode();
          }}
          handleToggleToast={() => {
            handleToggleToast();
          }}
        />
      </div>
    ) : (
      <NotFound />
    );
  }
  if (passMode === "changePass") {
    return user.length !== 0 ? (
      <div>
        <Top />
        <ChangePassword
          userParams={user}
          changePassMode={() => {
            changePassMode();
          }}
          handleToggleToast1={() => {
            handleToggleToast();
          }}
        />
      </div>
    ) : (
      <NotFound />
    );
  }
  return user.length !== 0 ? (
    <div>
      <Top />
      <ToastComponent
        message="Successfully"
        showToast={showToast}
        handleCloseToast={handleToggleToast}
      />

      <section className="vh-50 " style={{ backgroundColor: "#f4f5f7" }}>
        <div className="container py-5 h-100 border-0">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <Image
                      src="https://img3.thuthuatphanmem.vn/uploads/2019/10/10/anh-avatar-doremon_033145784.png"
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: "80px" }}
                    />
                    <div>
                      <i className="far fa-edit" aria-hidden="true"></i>
                      <a
                        href="#"
                        onClick={() => {
                          changeAuthMode();
                        }}
                      >
                        Edit
                      </a>
                      <br />
                    </div>
                    <div>
                      <i className="far fa-edit" aria-hidden="true"></i>
                      <a
                        href="#"
                        onClick={() => {
                          changePassMode();
                        }}
                      >
                        Change Password
                      </a>
                      <br />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <h5 style={{ color: "red" }}>{user.username}</h5>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Phone</h6>
                          <p className="text-muted">{user.phone}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Address</h6>
                          <p className="text-muted">{user.address} </p>
                        </div>
                      </div>
                      <h6>Email</h6>
                      <div className="row pt-1">
                        <div className="col-12 mb-3">
                          <p className="text-muted">{user.email} </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : (
    <NotFound />
  );
};
export default ShowProfile;
