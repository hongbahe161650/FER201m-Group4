import { useEffect, useState } from "react";
import NotFound from "../layouts/NotFound";
import { Button, Card, Col, Form, Modal, Row, Table } from "react-bootstrap";
import Loader from "../layouts/Loader";
import Pagination from "../Custom/Pagination";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [clickedUser, setClickedUser] = useState({});
  const [userUpdated, setUserUpdated] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("UserID"))
      ? JSON.parse(localStorage.getItem("UserID")).isAdmin
      : false
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:9999/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setTotalPages(Math.ceil(data.length / 5));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    fetch(`http://localhost:9999/api/users?_page=${currentPage}&_limit=5`)
      .then((response) => {
        const totalCount = parseInt(response.headers.get("X-Total-Count"));
        setTotalPages(Math.ceil(totalCount / 5));
        return response.json();
      })
      .then((json) => {
        setUsers(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (page) => {
    fetchData();
    setCurrentPage(page);
  };


  const UserInfoRow = ({ user, index }) => {
    const { id, username, email, phone, address, isActive } = user;
    const rowClass = isActive ? "active-row" : "deactive-row";
    return (
      <tr
        id={`activeStatus${id}`}
        key={index}
        className={rowClass}
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          if (e.target.tagName !== "BUTTON") {
            handleChangeUserInfo(id);
          }
        }}
      >
        <td>{id}</td>
        <td>{username}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{address}</td>
        <td>{isActive ? "Active" : "De Active"}</td>
        <td>
          <Button
            variant={isActive ? "warning" : "success"}
            onClick={() => handleStatusChange(id)}
          >
            {isActive ? "De Active" : "Active"}
          </Button>
        </td>
      </tr>
    );
  };
  const handleChangeUserInfo = (id) => {
    handleShow();
    setClickedUser(users.find((user) => user.id == id));
    setUserUpdated(users.find((user) => user.id == id));
  };
  const submitHandleChangeUser = () => {
    fetch(`http://localhost:9999/api/users/${clickedUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userUpdated),
    })
      .then((response) => response.json())
      .then((data) => {
        handlePageChange(currentPage);
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleStatusChange = (accountID) => {
    const updateUsers = users.map((user) =>
      user.id == accountID ? { ...user, isActive: !user.isActive } : user
    );
    setUsers(updateUsers);
    fetch("http://localhost:9999/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUsers),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : isAdmin ? (
        <div className="container border-0" style={{ marginTop: "15px" }}>
          <div className="table-wrapper" style={{ paddingTop: "12px" }}>
            <Card className="text-center">
              <Card.Header>
                {" "}
                <Row>
                  <Col sm={6}>
                    <h2>Manager Users </h2>
                  </Col>
                  <Col sm={6}>
                    <Button
                      variant="dark"
                      onClick={() => {
                        window.history.back(-1);
                      }}
                      style={{ marginLeft: "70%" }}
                    >
                      Quay lại
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <div
                  className="scrollable-area"
                  style={{ overflow: "auto", paddingTop: "11px" }}
                >
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Change Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter(
                          (user) =>
                            user.id !=
                            JSON.parse(localStorage.getItem("UserID")).id
                        )
                        .map((user, index) => (
                          <UserInfoRow key={index} user={user} index={index} />
                        ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Pagination
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </Card.Footer>
            </Card>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User ID : {clickedUser.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={clickedUser.username}
                    onChange={(e) => {
                      setUserUpdated((prevProduct) => ({
                        ...prevProduct,
                        username: e.target.value,
                      }));
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={clickedUser.email}
                    onChange={(e) => {
                      setUserUpdated((prevProduct) => ({
                        ...prevProduct,
                        email: e.target.value,
                      }));
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={clickedUser.address}
                    onChange={(e) => {
                      setUserUpdated((prevProduct) => ({
                        ...prevProduct,
                        address: e.target.value,
                      }));
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput4"
                >
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={clickedUser.phone}
                    onChange={(e) => {
                      setUserUpdated((prevProduct) => ({
                        ...prevProduct,
                        phone: e.target.value,
                      }));
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => submitHandleChangeUser()}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default UserManager;
